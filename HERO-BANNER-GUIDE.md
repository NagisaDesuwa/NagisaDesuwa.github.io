# 🖼️ Hero Banner 使用指南

Hero Banner（顶部大图展示区）已成功添加到你的网站！

## 📖 如何使用

### 方法 1: 在页面中添加简单背景图

在任何页面的 front matter 中添加：

```yaml
---
title: "页面标题"
header:
  image: /images/banner.jpg  # 你的图片路径
---
```

### 方法 2: 添加带遮罩层和文字的 Banner

```yaml
---
title: "关于我"
header:
  overlay_image: /images/banner.jpg
  overlay_color: "#000"  # 可选：添加颜色遮罩
  show_overlay_title: true  # 显示标题
  show_overlay_excerpt: true  # 显示摘要
  cta_label: "查看作品"  # 按钮文字
  cta_url: "/portfolio/"  # 按钮链接
excerpt: "欢迎来到我的游戏设计世界"
---
```

### 方法 3: 全局默认 Banner（仅首页）

在 `_config.yml` 中添加：

```yaml
header:
  image: /images/default-banner.jpg
```

这样首页会自动显示这个 Banner。

## 🎨 完整示例

### 示例 1: 简单图片背景

**_pages/about.md:**
```yaml
---
permalink: /
title: "关于我"
header:
  image: /images/my-banner.jpg
---

## 你好！

我是 Nagisa，一名游戏设计师...
```

### 示例 2: 带文字和按钮的 Hero Banner

**_pages/about.md:**
```yaml
---
permalink: /
title: "Nagisa - 游戏设计师"
header:
  overlay_image: /images/game-design-banner.jpg
  show_overlay_title: true
  show_overlay_excerpt: true
  cta_label: "查看我的作品"
  cta_url: "/portfolio/"
excerpt: "创造有趣的游戏体验 | Unity & Unreal"
---

## 关于我

我热衷于游戏设计与开发...
```

### 示例 3: 使用纯色背景

```yaml
---
title: "联系我"
header:
  overlay_color: "#667eea"
  show_overlay_title: true
  show_overlay_excerpt: true
excerpt: "让我们一起创造精彩的游戏！"
---
```

## 📁 图片放置位置

将你的 Banner 图片放在以下位置：

```
images/
├── banner.jpg          # 主 Banner
├── portfolio-banner.jpg  # 作品集 Banner
├── blog-banner.jpg     # 博客 Banner
└── ...
```

## 🎯 推荐图片尺寸

- **宽度**: 1920px - 2560px
- **高度**: 400px - 600px
- **格式**: JPG, PNG, WebP
- **文件大小**: < 500KB（优化后）

## 🔧 自定义样式

### 修改 Banner 高度

编辑 `assets/css/custom.css`:

```css
.page__hero {
    height: 500px;  /* 改成你想要的高度 */
}

.page__hero--overlay {
    height: 600px;  /* 带文字的 Banner 高度 */
}
```

### 修改遮罩层透明度

编辑 `_includes/hero-banner.html`:

```html
background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(...)
                                          ^^^           ^^^
                                    改成 0.3 更透明，0.7 更暗
```

### 修改文字颜色

编辑 `assets/css/custom.css`:

```css
.page__hero .page__title {
    color: white;  /* 改成你想要的颜色 */
}
```

## 💡 配置选项详解

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `header.image` | 简单背景图片 | 无 |
| `header.overlay_image` | 带遮罩的背景图 | 无 |
| `header.overlay_color` | 背景颜色（纯色或遮罩） | 无 |
| `header.show_overlay_title` | 显示标题 | true |
| `header.show_overlay_excerpt` | 显示摘要 | true |
| `header.cta_label` | 按钮文字 | "了解更多" |
| `header.cta_url` | 按钮链接 | 无 |

## 🚀 快速开始

### 1. 准备图片

将一张游戏相关的图片保存为 `banner.jpg`，放到 `images/` 文件夹。

### 2. 修改首页

编辑 `_pages/about.md`，添加：

```yaml
---
permalink: /
title: "Nagisa的小屋"
header:
  overlay_image: /images/banner.jpg
  show_overlay_title: true
  show_overlay_excerpt: false
  cta_label: "查看作品集"
  cta_url: "/portfolio/"
excerpt: "游戏设计师 | 记录开发心得"
author_profile: true
---
```

### 3. 刷新浏览器

保存文件后，刷新 http://localhost:4000/ 即可看到效果！

## 📱 响应式设计

Banner 会自动适配不同屏幕：

- **桌面**: 500px 高
- **平板**: 350px 高
- **手机**: 300px 高

## 🎨 推荐配色方案

### 游戏设计师风格

```css
/* 科技蓝 */
overlay_color: "#1e3c72"

/* 创意紫 */
overlay_color: "#667eea"

/* 电竞红 */
overlay_color: "#ff0844"

/* 独立游戏黄 */
overlay_color: "#f5af19"
```

## ❓ 常见问题

### Q: 图片显示不出来？
A: 检查图片路径是否正确，确保图片在 `images/` 文件夹中。

### Q: 文字看不清？
A: 增加遮罩层透明度，将 `rgba(0, 0, 0, 0.5)` 改成 `rgba(0, 0, 0, 0.7)`。

### Q: 想要全屏 Banner？
A: 修改 CSS 将 `height: 500px` 改成 `height: 100vh`。

### Q: 不想要 Banner？
A: 不在 front matter 中添加 `header` 配置即可。

## 🌟 进阶技巧

### 添加动画效果

在 `assets/css/custom.css` 中添加：

```css
.page__hero {
    animation: slideDown 0.8s ease-out;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

### 视差滚动效果

使用 `data-parallax` 属性（已在 `custom.js` 中实现）：

```html
<div data-parallax="0.5">
  Hero Banner 内容
</div>
```

有问题或需要更多帮助？随时咨询！
