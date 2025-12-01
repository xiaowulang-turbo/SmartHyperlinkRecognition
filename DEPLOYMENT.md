# 🚀 部署指南

本文档介绍如何部署智能超链接识别项目的各个部分。

## 📦 项目组成

1. **Chrome 扩展程序** (`extension/`) - 需要发布到 Chrome Web Store
2. **项目官网** (`website/`) - 需要部署到 Web 服务器

---

## 🔧 Chrome 扩展部署

### 准备工作

1. **创建图标文件**

    - 在 `extension/icons/` 目录创建三个尺寸的图标
    - icon16.png (16×16)
    - icon48.png (48×48)
    - icon128.png (128×128)
    - 参考 `extension/icons/README.md` 获取创建指南

2. **测试扩展**

    ```bash
    # 在 Chrome 中加载扩展
    # 1. 打开 chrome://extensions
    # 2. 启用"开发者模式"
    # 3. 加载 extension 文件夹
    # 4. 全面测试所有功能
    ```

3. **更新版本信息**
    - 检查 `extension/manifest.json` 中的版本号
    - 更新 `CHANGELOG.md` 添加版本说明

### 打包扩展

#### 方法 1: 使用 Chrome 打包

1. 打开 `chrome://extensions`
2. 启用"开发者模式"
3. 点击"打包扩展程序"
4. 选择 `extension` 文件夹
5. 生成 `.crx` 和 `.pem` 文件

⚠️ **重要：** 妥善保管 `.pem` 私钥文件！

#### 方法 2: 手动打包

```bash
# 创建 ZIP 文件
cd extension
zip -r ../smart-hyperlink-recognition-v1.0.0.zip . -x "*.DS_Store" -x "__MACOSX"
```

### 发布到 Chrome Web Store

1. **注册开发者账号**

    - 访问
      [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
    - 支付一次性注册费用（$5）

2. **准备商店素材**

    **必需：**

    - 扩展 ZIP 包
    - 128×128 图标
    - 440×280 宣传图（至少 1 张）
    - 1280×800 或 640×400 截图（至少 1 张）
    - 详细描述（中英文）

    **可选：**

    - 920×680 宣传图
    - 演示视频链接

3. **填写商店信息**

    **基本信息：**

    ```
    名称：智能超链接识别
    简短描述：自动将网页中的纯文本 URL 转换为可点击的超链接
    详细描述：[参考 README.md 的介绍部分]
    类别：生产力工具
    语言：中文（简体）、English
    ```

    **隐私政策：**

    ```
    本扩展不收集任何用户数据，所有操作在本地完成。
    ```

4. **上传并提交审核**

    - 上传 ZIP 文件
    - 填写所有必需信息
    - 提交审核（通常需要 1-3 个工作日）

5. **发布**
    - 审核通过后点击"发布"
    - 扩展将在几小时内上架

### 更新扩展

1. 修改代码
2. 更新 `manifest.json` 版本号
3. 更新 `CHANGELOG.md`
4. 重新打包
5. 在开发者控制台上传新版本
6. 提交审核

---

## 🌐 官网部署

### 准备工作

1. **优化资源**

    ```bash
    # 压缩 CSS（可选）
    # 使用在线工具或 cssnano

    # 压缩 JS（可选）
    # 使用 UglifyJS 或 Terser

    # 优化图片
    # 使用 TinyPNG 或 ImageOptim
    ```

2. **添加 SEO 标签**

    在 `website/index.html` 的 `<head>` 中添加：

    ```html
    <!-- Open Graph -->
    <meta property="og:title" content="智能超链接识别" />
    <meta
    	property="og:description"
    	content="自动将网页中的纯文本 URL 转换为可点击的超链接"
    />
    <meta
    	property="og:image"
    	content="https://yourwebsite.com/images/og-image.png"
    />
    <meta property="og:url" content="https://yourwebsite.com" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="智能超链接识别" />
    <meta
    	name="twitter:description"
    	content="自动将网页中的纯文本 URL 转换为可点击的超链接"
    />
    ```

### 部署选项

#### 选项 1: GitHub Pages（推荐，免费）

1. **配置仓库**

    ```bash
    git add .
    git commit -m "Add website"
    git push origin main
    ```

2. **启用 GitHub Pages**

    - 进入仓库设置 → Pages
    - Source: 选择分支（main）
    - Folder: 选择 `/website`
    - 保存

3. **访问网站**

    - URL: `https://yourusername.github.io/SmartHyperlinkRecognition/`
    - 通常几分钟内生效

4. **自定义域名（可选）**
    - 在域名提供商添加 CNAME 记录
    - 在 GitHub Pages 设置中添加自定义域名
    - 启用 HTTPS

#### 选项 2: Netlify（推荐，免费）

1. **连接仓库**

    - 访问 [Netlify](https://www.netlify.com)
    - 点击 "New site from Git"
    - 连接 GitHub 仓库

2. **配置构建**

    ```
    Base directory: website
    Build command: (留空)
    Publish directory: .
    ```

3. **部署**

    - 点击 "Deploy site"
    - 自动部署完成

4. **自定义域名**
    - Domain settings → Add custom domain
    - 按照提示配置 DNS

#### 选项 3: Vercel（推荐，免费）

1. **安装 Vercel CLI**

    ```bash
    npm install -g vercel
    ```

2. **部署**

    ```bash
    cd website
    vercel
    ```

3. **配置**

    - 按照提示完成配置
    - 自动部署并获得 URL

4. **生产部署**
    ```bash
    vercel --prod
    ```

#### 选项 4: 传统 Web 服务器

1. **上传文件**

    ```bash
    # 使用 FTP/SFTP 上传 website 目录
    # 或使用 rsync
    rsync -avz website/ user@server:/var/www/html/
    ```

2. **配置服务器**

    **Nginx 配置示例：**

    ```nginx
    server {
        listen 80;
        server_name yourwebsite.com;
        root /var/www/html;
        index index.html;

        location / {
            try_files $uri $uri/ =404;
        }

        # 启用 gzip 压缩
        gzip on;
        gzip_types text/css application/javascript;
    }
    ```

    **Apache 配置示例：**

    ```apache
    <VirtualHost *:80>
        ServerName yourwebsite.com
        DocumentRoot /var/www/html

        <Directory /var/www/html>
            Options Indexes FollowSymLinks
            AllowOverride All
            Require all granted
        </Directory>
    </VirtualHost>
    ```

3. **启用 HTTPS**
    ```bash
    # 使用 Let's Encrypt
    sudo certbot --nginx -d yourwebsite.com
    ```

### 部署后检查

-   [ ] 所有页面正常加载
-   [ ] 所有链接正常工作
-   [ ] 响应式布局正常
-   [ ] 图片和资源加载正常
-   [ ] SEO 标签正确
-   [ ] HTTPS 正常工作
-   [ ] 性能测试通过

---

## 📊 监控和分析

### Google Analytics（可选）

1. **创建 GA 账号**

    - 访问 [Google Analytics](https://analytics.google.com)
    - 创建新属性

2. **添加跟踪代码**

    在 `website/index.html` 的 `</head>` 前添加：

    ```html
    <!-- Google Analytics -->
    <script
    	async
    	src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
    ></script>
    <script>
    	window.dataLayer = window.dataLayer || []
    	function gtag() {
    		dataLayer.push(arguments)
    	}
    	gtag('js', new Date())
    	gtag('config', 'GA_MEASUREMENT_ID')
    </script>
    ```

### 性能监控

使用以下工具检查网站性能：

-   [Google PageSpeed Insights](https://pagespeed.web.dev/)
-   [GTmetrix](https://gtmetrix.com/)
-   [WebPageTest](https://www.webpagetest.org/)

---

## 🔄 持续部署（CI/CD）

### GitHub Actions 示例

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy Website

on:
    push:
        branches: [main]
        paths:
            - 'website/**'

jobs:
    deploy:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2

            - name: Deploy to GitHub Pages
              uses: peaceiris/actions-gh-pages@v3
              with:
                  github_token: ${{ secrets.GITHUB_TOKEN }}
                  publish_dir: ./website
```

---

## 📝 部署清单

### Chrome 扩展

-   [ ] 创建所有尺寸的图标
-   [ ] 更新版本号
-   [ ] 全面测试功能
-   [ ] 准备商店素材（截图、描述等）
-   [ ] 打包扩展
-   [ ] 提交到 Chrome Web Store
-   [ ] 等待审核通过
-   [ ] 发布

### 官网

-   [ ] 优化资源文件
-   [ ] 添加 SEO 标签
-   [ ] 测试所有功能
-   [ ] 选择部署平台
-   [ ] 配置域名（可选）
-   [ ] 部署网站
-   [ ] 启用 HTTPS
-   [ ] 添加分析工具（可选）
-   [ ] 性能测试

---

## 🆘 常见问题

### Q: 扩展审核被拒怎么办？

A: 仔细阅读拒绝原因，修改后重新提交。常见原因：

-   权限过多
-   描述不清晰
-   隐私政策缺失
-   功能与描述不符

### Q: 官网部署后无法访问？

A: 检查：

-   DNS 配置是否正确
-   服务器是否正常运行
-   防火墙设置
-   文件权限

### Q: 如何回滚到旧版本？

A:

-   **扩展：** 在开发者控制台上传旧版本
-   **官网：** 使用 Git 回滚并重新部署

---

## 📞 获取帮助

如有部署问题，请：

1. 查看相关平台的官方文档
2. 在 GitHub Issues 提问
3. 联系项目维护者

---

**祝部署顺利！** 🎉
