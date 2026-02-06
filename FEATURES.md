# Nagisa的小屋 - 功能性文档

> 本文档描述网站所有功能模块、文件结构与实现细节，供维护参考。

---

## 目录

1. [项目概览](#项目概览)
2. [目录结构](#目录结构)
3. [站点配置](#站点配置)
4. [布局系统](#布局系统)
5. [交互功能](#交互功能)
6. [样式系统](#样式系统)
7. [JavaScript 模块](#javascript-模块)
8. [PWA 与离线支持](#pwa-与离线支持)
9. [SEO 与元数据](#seo-与元数据)
10. [数据文件](#数据文件)
11. [内容系统](#内容系统)
12. [响应式设计](#响应式设计)
13. [构建与部署](#构建与部署)

---

## 项目概览

- **站点名称**: Nagisa的小屋
- **技术栈**: Jekyll 静态站点生成器
- **站点 URL**: https://nagisadesuwa.github.io
- **作者**: Nagisa（游戏设计师，杭州，Pandada Studio）
- **主题**: Air（支持 Light/Dark 切换）
- **主色调**: #4169E1（Royal Blue）

---

## 目录结构

```
d:\PersonalWebsite/
├── _config.yml              # 主站点配置
├── _config_docker.yml       # Docker 环境配置
├── service-worker.js        # PWA Service Worker
├── manifest.json            # PWA Manifest
├── offline.html             # 离线回退页面
├── package.json             # NPM 依赖
├── Gemfile                  # Ruby 依赖
│
├── _layouts/                # 布局模板（9 个）
├── _includes/               # 可复用模板片段（40+ 个）
├── _data/                   # 数据文件（导航、UI 文本、作者、光标配置等）
├── _pages/                  # 页面文件（11 个）
├── _posts/                  # 博客文章
│
├── _sass/                   # SCSS 样式源文件
│   ├── _themes.scss         # 主题变量
│   ├── layout/              # 布局样式（13 个文件）
│   ├── theme/               # 主题样式（6 套主题 × Light/Dark）
│   ├── include/             # Mixin 和工具类
│   └── vendor/              # 第三方样式
│
├── assets/
│   ├── js/                  # JavaScript 文件
│   ├── css/                 # CSS 文件（main.scss, custom.css）
│   ├── fonts/               # 字体文件
│   └── webfonts/            # Web 字体
│
├── audio/                   # 音乐播放器音频文件
├── images/                  # 图片资源（头像、Banner、Favicon 等）
└── _site/                   # 构建输出（生成目录）
```

---

## 站点配置

**文件**: `_config.yml`

### 核心配置

| 配置项 | 值 | 说明 |
|--------|-----|------|
| theme | air | 可选：default, air, sunrise, mint, dirt, contrast |
| locale | en-US | 站点语言 |
| title | Nagisa的小屋 | 站点标题 |
| markdown | kramdown | Markdown 解析器，启用 GFM |
| highlighter | rouge | 代码高亮引擎 |
| compress_html | 启用 | HTML 压缩（通过 compress.html 布局） |

### 启用的插件

- `jekyll-feed` - RSS/Atom 订阅
- `jekyll-gist` - GitHub Gist 嵌入
- `jekyll-paginate` - 文章分页
- `jekyll-sitemap` - 站点地图生成
- `jekyll-redirect-from` - URL 重定向
- `jemoji` - Emoji 表情支持

### 集合（Collections）

- **portfolio** - 作品集（游戏设计作品），输出到 `/:collection/:path/`

---

## 布局系统

**目录**: `_layouts/`

| 布局文件 | 用途 | 继承关系 |
|----------|------|----------|
| `compress.html` | HTML 压缩包装器 | 最外层 |
| `default.html` | 基础布局 | 继承 compress |
| `single.html` | 文章/页面详情 | 继承 default |
| `archive.html` | 归档列表 | 继承 default |
| `archive-taxonomy.html` | 分类/标签归档 | 继承 default |
| `splash.html` | 全屏闪屏页 | 继承 default |
| `parallax.html` | 视差滚动效果页 | 继承 default |
| `cv-layout.html` | 简历展示页 | 继承 default |
| `talk.html` | 演讲/演示页 | 继承 default |

### default.html 加载顺序

1. `entrance-gate.html` - 入场门
2. `masthead.html` - 导航栏
3. `hero-banner.html` - 页面头图
4. 主内容区域
5. Footer
6. `music-player.html` - 音乐播放器
7. `cursor-effects.html` - 光标特效
8. `scripts.html` - 脚本加载

---

## 交互功能

### 1. 入场门（Entrance Gate）

**文件**: `_includes/entrance-gate.html`

全屏欢迎动画，首次访问时显示：

- 全屏背景图 + 标题叠加层
- 基于 `sessionStorage` 的访客追踪（每次会话仅显示一次）
- 响应式图片（桌面端/移动端不同图片，768px 断点切换）
- 10 秒安全超时自动隐藏
- 点击后：淡出动画 + 页面内容淡入
- 自动触发音乐播放器开始播放
- 包含弹跳动画和发光效果的视觉提示

### 2. 音乐播放器（Music Player）

**文件**: `_includes/music-player.html`

可拖拽的浮动音乐播放器：

- **UI 特性**: 可拖拽窗口（位置通过 localStorage 持久化）、可折叠界面
- **播放功能**: 播放/暂停、上一曲/下一曲、进度条拖拽、音量控制、静音
- **播放模式**: 顺序播放、随机播放（Shuffle）、单曲循环
- **歌单管理**: 自动扫描 `/audio/` 目录的音频文件、可展开的歌单列表
- **元数据提取**: 从文件名解析 "歌手 - 歌名" 格式
- **默认歌曲**: "あの頃のように" 排在歌单首位
- **响应式**: 桌面 300px 宽、平板 280px、移动端全屏宽
- **玻璃拟态设计**: 背景模糊 + 半透明效果

### 3. 光标特效（Cursor Effects）

**文件**: `_includes/cursor-effects.html`
**配置**: `_data/cursor-config.yml`

服务端可配置的自定义光标系统：

- **光标样式**: 3 种样式 - default、dot（增强圆点）、arrow-enhanced
- **光标组件**: 光标圆点（8px）+ 光标轮廓（32px），跟随鼠标移动
- **拖尾效果**: 鼠标移动时产生粒子拖尾（间隔 30ms、生命周期 600ms）
- **点击涟漪**: 点击时产生涟漪波动效果（尺寸 100px、时长 800ms）
- **悬停检测**: 可点击元素上光标放大 1.5 倍
- **点击反馈**: 点击时光标缩小至 0.8 倍
- **触屏适配**: 触摸设备上自动禁用

### 4. 主题切换（Theme Toggle）

**文件**: `assets/js/theme.js`

深色/浅色模式切换：

- 检测系统偏好设置
- 通过 `localStorage` 持久化用户选择
- 三种模式: dark / light / system
- 实时切换，通过 `data-theme` 属性应用
- 导航栏中的太阳/月亮图标切换按钮
- 支持 Plotly 图表的主题同步切换

### 5. 站内搜索（Search）

**文件**: `assets/js/custom.js`

实时站内搜索功能：

- 搜索范围：标题（h1-h6）、段落、链接、归档项
- 最少 2 个字符触发搜索
- 300ms 防抖优化性能
- 最多显示 10 条结果
- 结果去重
- 点击外部或 ESC 键关闭
- HTML 转义防 XSS

### 6. 滚动效果（Scroll Effects）

**文件**: `assets/js/custom.js`

多种基于滚动的视觉效果：

- **视差滚动**: `data-parallax` 属性的元素以不同速率移动
- **粒子背景**: 50 个浮动粒子动画
- **平滑滚动**: 锚点链接平滑导航
- **滚动显现**: 元素进入视口时淡入动画（IntersectionObserver）
- **动态背景**: 基于滚动位置的 HSL 色相旋转

### 7. 导航系统（Navigation）

**文件**: `_includes/masthead.html`
**数据**: `_data/navigation.yml`

动态响应式导航栏：

- **贪婪导航**: 小屏幕自动折叠为"更多"按钮
- **导航项**: 作品集 → 博客 → 关于我
- **当前页高亮**
- **集成组件**: 主题切换按钮 + 搜索栏
- **移动端**: 汉堡菜单
- **固定定位**: 始终可见

### 8. 侧边栏（Sidebar）

**文件**: `_includes/sidebar.html`, `_includes/author-profile.html`, `_includes/tag-menu.html`

右侧栏包含多个区块：

- **作者信息**: 头像、姓名、简介、位置、公司、社交链接
- **标签云**: 按使用次数降序排列的标签菜单
- **归档菜单**: 按年份/分类/页面的归档链接
- **自定义侧栏**: 页面特定内容（图片和文字）

---

## 样式系统

**目录**: `_sass/`

### 主题系统

6 套主题 × Light/Dark 共 12 种变体：

| 主题 | 文件 |
|------|------|
| Default | `_default_light.scss` / `_default_dark.scss` |
| Air（当前使用） | `_air_light.scss` / `_air_dark.scss` |
| Sunrise | `_sunrise_light.scss` / `_sunrise_dark.scss` |
| Mint | `_mint_light.scss` / `_mint_dark.scss` |
| Dirt | `_dirt_light.scss` / `_dirt_dark.scss` |
| Contrast | `_contrast_light.scss` / `_contrast_dark.scss` |

### 自定义样式

**文件**: `assets/css/custom.css`（53KB）

重要自定义样式：

- **入场门**: 固定全屏覆盖层、淡出动画、弹跳动画、发光效果
- **音乐播放器**: 玻璃拟态、渐变头部（#4169E1 → #87CEFA）、触控友好按钮
- **光标特效**: 多层光标、涟漪动画、拖尾粒子
- **导航**: 贪婪导航、搜索下拉、标签按钮样式

### 布局样式文件

| 文件 | 用途 |
|------|------|
| `_base.scss` | 基础排版 |
| `_reset.scss` | CSS 重置 |
| `_archive.scss` | 归档页样式 |
| `_sidebar.scss` | 侧边栏样式 |
| `_navigation.scss` | 导航样式 |
| `_page.scss` | 页面样式 |
| `_footer.scss` | 页脚样式 |
| `_masthead.scss` | 顶部栏样式 |
| `_buttons.scss` | 按钮样式 |
| `_forms.scss` | 表单样式 |
| `_notices.scss` | 通知样式 |
| `_tables.scss` | 表格样式 |
| `_json_cv.scss` | 简历页样式 |

---

## JavaScript 模块

### 文件清单

| 文件 | 说明 |
|------|------|
| `assets/js/theme.js` | 主题切换 + Plotly 图表主题同步 |
| `assets/js/custom.js` | 视差、粒子、平滑滚动、滚动显现、搜索、鼠标跟随、动态背景 |
| `assets/js/_main.js` | jQuery 插件集成、工具函数 |
| `assets/js/collapse.js` | jQuery 折叠元素切换 |
| `assets/js/plugins/jquery.greedy-navigation.js` | 响应式贪婪导航 |
| `assets/js/main.min.js` | 打包压缩文件（含 jQuery、FitVids、Smooth Scroll、Plotly） |

### 内联脚本

以下 `_includes` 文件包含内联 JavaScript：

- `entrance-gate.html` - 入场门逻辑
- `music-player.html` - 音乐播放器全部逻辑
- `cursor-effects.html` - 光标特效全部逻辑
- `masthead.html` - 导航栏交互（搜索、主题切换）

> **注意**: 由于 `compress_html` 会移除换行符，内联 JS 中必须使用 `/* */` 块注释，禁止使用 `//` 单行注释。

---

## PWA 与离线支持

### Service Worker

**文件**: `service-worker.js`

- 缓存名称: `nagisa-cache-v1`
- 策略: Cache-first + 后台网络更新
- 网络请求超时: 10 秒
- 离线回退: `/offline.html`

**预缓存资源**:
- `/`（首页）
- `/offline.html`
- `/assets/css/main.css`, `/assets/css/custom.css`
- `/images/profile.png`, `/images/banner.jpg`, `/images/banner-mobile.jpg`

### PWA Manifest

**文件**: `manifest.json`

- 应用名称: "Nagisa的小屋"
- 显示模式: standalone
- 主题色: #4169E1
- 图标: 32px / 192px（maskable）/ 512px（maskable）

### 离线页面

**文件**: `offline.html`

- 紫色渐变背景
- 离线提示信息（中文）
- 重试按钮

---

## SEO 与元数据

**文件**: `_includes/seo.html`

- 动态页面标题和描述
- Canonical URL
- XML Sitemap 自动生成
- Open Graph（OG）标签
- Twitter Card 支持
- JSON-LD 结构化数据（Person Schema）
- 搜索引擎验证（Google、Bing、Alexa、Yandex）
- RSS Feed 订阅

---

## 数据文件

**目录**: `_data/`

| 文件 | 说明 |
|------|------|
| `navigation.yml` | 导航菜单结构（作品集、博客、关于我） |
| `ui-text.yml` | 多语言 UI 文本常量 |
| `authors.yml` | 作者信息配置 |
| `cursor-config.yml` | 光标特效参数配置 |
| `cv.json` | 简历数据（JSON Resume 格式） |
| `comments/` | 静态评论存储（Staticman） |

---

## 内容系统

### 博客文章

**目录**: `_posts/`

- YAML Front Matter 元数据
- 标签和分类支持
- 阅读时间估算
- 相关文章推荐
- 文章分页

### 作品集

**目录**: `_portfolio/`

- 自定义集合（Collection）
- 独立作品页面
- 分享按钮和评论

### 页面

**目录**: `_pages/`

| 页面 | 路径 | 说明 |
|------|------|------|
| `about.md` | `/` | 首页（关于页） |
| `cv.md` | `/cv/` | 简历页 |
| `portfolio.html` | `/portfolio/` | 作品集 |
| `category-archive.html` | `/categories/` | 分类归档 |
| `tag-archive.html` | `/tags/` | 标签归档 |
| `year-archive.html` | `/year-archive/` | 年份归档 |
| `404.md` | `/404` | 404 错误页 |

### 评论系统

- Staticman 集成
- 静态评论存储在 `_data/comments/`
- 支持评论审核

---

## 响应式设计

### 断点

| 断点 | 场景 |
|------|------|
| 480px | 手机竖屏 |
| 640px | 手机横屏 |
| 768px | 平板竖屏（入场门图片切换点） |
| 900px | 小屏设备 |
| 925px | 标准分界 |
| 1024px | 平板横屏 |
| 1280px | 大屏桌面（max-width） |

### 移动端优化

- 触控目标最小 44×44px
- 字体缩放防止文字过小
- 响应式图片（srcset 支持）
- 侧边栏粘性定位 + 响应式宽度
- 音乐播放器移动端全屏宽
- 贪婪导航小屏折叠
- 刘海屏安全区域支持
- 滚动事件防抖优化

---

## 构建与部署

### 构建工具

- **Jekyll** - 静态站点生成
- **SCSS 编译** - 样式编译压缩
- **uglify-js** - JS 打包压缩（通过 npm script）
- **Docker** - 支持 Docker 构建（`_config_docker.yml`）

### JS 打包命令

```bash
npm run uglify
```

打包 jQuery、FitVids、Smooth Scroll、Plotly 等到 `assets/js/main.min.js`。

### 输出

- 生成目录: `_site/`
- 包含 HTML 压缩、CSS/JS 压缩、Sitemap 生成

### 社交链接

- QQ: 564399671
- Bilibili: https://space.bilibili.com/5506729
