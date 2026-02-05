Add-Type -AssemblyName System.Drawing

$sourcePath = 'd:\PersonalWebsite\images\banner.jpg'
$destPath = 'd:\PersonalWebsite\images\banner-mobile.jpg'
$targetWidth = 800

$image = [System.Drawing.Image]::FromFile($sourcePath)
$ratio = $image.Height / $image.Width
$targetHeight = [int]($targetWidth * $ratio)

$bitmap = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.DrawImage($image, 0, 0, $targetWidth, $targetHeight)

$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 75L)

$bitmap.Save($destPath, $jpegEncoder, $encoderParams)

$graphics.Dispose()
$bitmap.Dispose()
$image.Dispose()

Write-Host "Mobile banner created: $destPath"
$fileInfo = Get-Item $destPath
Write-Host "File size: $($fileInfo.Length) bytes"
