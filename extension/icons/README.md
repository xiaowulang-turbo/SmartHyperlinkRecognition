# 图标说明

本插件需要以下三个尺寸的图标：

-   **icon16.png** - 16x16 像素（浏览器工具栏小图标）
-   **icon48.png** - 48x48 像素（扩展管理页面）
-   **icon128.png** - 128x128 像素（Chrome Web Store 和安装时显示）

## 设计建议

### 主题

-   使用 ✍️ 笔或链接符号作为主要元素
-   配色方案：蓝色渐变（#2563eb 到 #1e40af）
-   简洁现代的设计风格

### 在线工具推荐

如果您需要创建图标，可以使用以下在线工具：

1. **Canva** (https://www.canva.com)

    - 选择自定义尺寸
    - 使用图标库中的链接或笔图标
    - 应用渐变色

2. **Figma** (https://www.figma.com)

    - 专业的设计工具
    - 支持导出多种尺寸

3. **IconScout** (https://iconscout.com)

    - 搜索 "link" 或 "hyperlink" 图标
    - 下载并调整尺寸

4. **Favicon Generator** (https://realfavicongenerator.net)
    - 上传一个大图标
    - 自动生成多个尺寸

## 临时解决方案

在开发阶段，您可以：

1. 使用纯色占位图标
2. 使用 Emoji 转换为图标（✍️ 或 🔗）
3. 从开源图标库下载（如 Font Awesome, Material Icons）

## 创建步骤

### 使用 Canva 快速创建：

1. 访问 Canva.com
2. 创建自定义尺寸：128x128 px
3. 添加背景渐变（蓝色）
4. 添加白色的链接图标或笔图标
5. 下载为 PNG
6. 使用在线工具调整为 16x16 和 48x48

### 使用命令行工具（需要 ImageMagick）：

```bash
# 从 128x128 生成其他尺寸
convert icon128.png -resize 48x48 icon48.png
convert icon128.png -resize 16x16 icon16.png
```

## 注意事项

-   确保图标背景透明或使用纯色
-   保持图标在不同尺寸下的清晰度
-   测试图标在浅色和深色主题下的显示效果
-   PNG 格式，支持透明背景

## 当前状态

⚠️ **图标文件尚未创建**

请按照上述说明创建图标文件，并将它们放置在 `icons/` 目录下。

在图标创建完成之前，插件仍然可以正常工作，只是会显示默认的 Chrome 扩展图标。
