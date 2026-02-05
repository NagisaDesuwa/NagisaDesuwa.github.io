#!/bin/bash
# 自动修复音频文件名中的问题字符
# - 双空格 -> 单空格
# - 其他可能导致 URL 问题的字符

AUDIO_DIR="$(dirname "$0")/../audio"
FIXED_COUNT=0

echo "🔍 检查音频文件名..."

# 遍历音频目录中的所有文件
for file in "$AUDIO_DIR"/*; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        dir=$(dirname "$file")

        # 修复双空格（或更多连续空格）为单空格
        newname=$(echo "$filename" | sed 's/  */ /g')

        if [ "$filename" != "$newname" ]; then
            echo "📝 修复: '$filename' -> '$newname'"
            mv "$file" "$dir/$newname"
            FIXED_COUNT=$((FIXED_COUNT + 1))
        fi
    fi
done

if [ $FIXED_COUNT -gt 0 ]; then
    echo "✅ 已修复 $FIXED_COUNT 个文件名"
    # 如果在 git hook 中运行，需要重新 add 修改后的文件
    if [ -n "$GIT_DIR" ]; then
        git add "$AUDIO_DIR"/*
    fi
else
    echo "✅ 所有文件名正常"
fi

exit 0
