#!/bin/sh
# 安装 Git hooks

SCRIPT_DIR=$(dirname "$0")
REPO_ROOT=$(cd "$SCRIPT_DIR/.." && pwd)
HOOKS_SRC="$SCRIPT_DIR/hooks"
HOOKS_DST="$REPO_ROOT/.git/hooks"

echo "📦 安装 Git hooks..."

# 复制所有 hook 文件
for hook in "$HOOKS_SRC"/*; do
    if [ -f "$hook" ]; then
        hookname=$(basename "$hook")
        cp "$hook" "$HOOKS_DST/$hookname"
        chmod +x "$HOOKS_DST/$hookname"
        echo "✅ 已安装: $hookname"
    fi
done

echo "🎉 Git hooks 安装完成！"
