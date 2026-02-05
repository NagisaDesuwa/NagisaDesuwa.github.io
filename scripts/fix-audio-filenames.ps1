# 自动修复音频文件名中的问题字符
# - 双空格 -> 单空格
# - 其他可能导致 URL 问题的字符

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$audioDir = Join-Path $scriptPath "..\audio"
$fixedCount = 0

Write-Host "🔍 检查音频文件名..." -ForegroundColor Cyan

# 遍历音频目录中的所有文件
Get-ChildItem -Path $audioDir -File | ForEach-Object {
    $file = $_
    $filename = $file.Name

    # 修复双空格（或更多连续空格）为单空格
    $newname = $filename -replace '\s{2,}', ' '

    if ($filename -ne $newname) {
        $newPath = Join-Path $file.DirectoryName $newname
        Write-Host "📝 修复: '$filename' -> '$newname'" -ForegroundColor Yellow
        Rename-Item -Path $file.FullName -NewName $newname
        $script:fixedCount++
    }
}

if ($fixedCount -gt 0) {
    Write-Host "✅ 已修复 $fixedCount 个文件名" -ForegroundColor Green
} else {
    Write-Host "✅ 所有文件名正常" -ForegroundColor Green
}
