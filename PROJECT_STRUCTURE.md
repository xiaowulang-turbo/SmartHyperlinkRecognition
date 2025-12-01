# 项目结构说明

```
SmartHyperlinkRecognition/
│
├── manifest.json              # Chrome 扩展配置文件（必需）
│   └── 定义插件的基本信息、权限、脚本等
│
├── 核心功能文件
│   ├── content.js            # 内容脚本（核心转换逻辑）
│   ├── background.js         # 后台服务脚本
│   └── 实现 URL 识别和转换的主要逻辑
│
├── 用户界面文件
│   ├── popup.html            # 弹出窗口界面
│   ├── popup.css             # 弹出窗口样式
│   ├── popup.js              # 弹出窗口逻辑
│   ├── options.html          # 设置页面界面
│   ├── options.css           # 设置页面样式
│   ├── options.js            # 设置页面逻辑
│   └── welcome.html          # 首次安装欢迎页面
│
├── 资源文件
│   └── icons/                # 图标文件夹
│       ├── icon16.png        # 16x16 工具栏图标（需创建）
│       ├── icon48.png        # 48x48 扩展管理图标（需创建）
│       ├── icon128.png       # 128x128 商店图标（需创建）
│       └── README.md         # 图标创建说明
│
├── 文档文件
│   ├── README.md             # 项目主文档
│   ├── INSTALL.md            # 安装指南
│   ├── QUICKSTART.md         # 快速开始指南
│   ├── DEVELOPMENT.md        # 开发者文档
│   ├── CHANGELOG.md          # 更新日志
│   └── LICENSE               # MIT 许可证
│
├── 测试文件
│   └── test.html             # 功能测试页面
│
└── 配置文件
    └── .gitignore            # Git 忽略文件配置
```

## 文件说明

### 核心文件（必需）

#### manifest.json

-   **作用：** Chrome 扩展的配置文件
-   **内容：** 插件元数据、权限声明、脚本配置
-   **重要性：** ⭐⭐⭐⭐⭐ 必需文件

#### content.js

-   **作用：** 在网页中运行的脚本
-   **功能：**
    -   扫描页面文本节点
    -   识别 URL 和邮箱
    -   创建超链接
    -   监听动态内容
-   **重要性：** ⭐⭐⭐⭐⭐ 核心逻辑

#### background.js

-   **作用：** 后台服务脚本
-   **功能：**
    -   处理插件安装/更新
    -   管理配置
    -   更新徽章状态
-   **重要性：** ⭐⭐⭐⭐ 重要支持

### 界面文件

#### popup.html/css/js

-   **作用：** 点击工具栏图标显示的弹出窗口
-   **功能：** 快速开关、状态显示、快捷操作
-   **重要性：** ⭐⭐⭐⭐ 用户交互

#### options.html/css/js

-   **作用：** 详细设置页面
-   **功能：** 配置选项、黑名单管理、统计信息
-   **重要性：** ⭐⭐⭐⭐ 高级配置

#### welcome.html

-   **作用：** 首次安装欢迎页面
-   **功能：** 介绍功能、使用指南
-   **重要性：** ⭐⭐⭐ 用户引导

### 资源文件

#### icons/

-   **作用：** 存放插件图标
-   **需要：** 三个尺寸的 PNG 图标
-   **状态：** ⚠️ 待创建
-   **重要性：** ⭐⭐⭐ 视觉识别

### 文档文件

#### README.md

-   **作用：** 项目主文档
-   **内容：** 功能介绍、安装方法、使用说明
-   **重要性：** ⭐⭐⭐⭐⭐ 项目门面

#### INSTALL.md

-   **作用：** 详细安装指南
-   **内容：** 安装步骤、故障排除
-   **重要性：** ⭐⭐⭐⭐ 用户帮助

#### QUICKSTART.md

-   **作用：** 快速入门指南
-   **内容：** 5 分钟快速上手
-   **重要性：** ⭐⭐⭐⭐ 新手友好

#### DEVELOPMENT.md

-   **作用：** 开发者文档
-   **内容：** 技术细节、开发指南
-   **重要性：** ⭐⭐⭐⭐ 开发参考

#### CHANGELOG.md

-   **作用：** 版本更新记录
-   **内容：** 各版本的新增功能和修复
-   **重要性：** ⭐⭐⭐ 版本追踪

#### LICENSE

-   **作用：** 开源许可证
-   **内容：** MIT 许可证文本
-   **重要性：** ⭐⭐⭐⭐ 法律保护

### 测试文件

#### test.html

-   **作用：** 功能测试页面
-   **内容：** 各种测试场景
-   **重要性：** ⭐⭐⭐⭐ 质量保证

### 配置文件

#### .gitignore

-   **作用：** Git 版本控制忽略规则
-   **内容：** 排除临时文件、构建产物等
-   **重要性：** ⭐⭐⭐ 版本管理

## 文件依赖关系

```
manifest.json
    ├── → content.js (内容脚本)
    ├── → background.js (后台脚本)
    ├── → popup.html (弹出窗口)
    │       ├── → popup.css
    │       └── → popup.js
    ├── → options.html (设置页面)
    │       ├── → options.css
    │       └── → options.js
    └── → icons/ (图标资源)

background.js
    ├── → welcome.html (首次安装)
    └── ↔ content.js (消息通信)

popup.js
    └── ↔ content.js (消息通信)

options.js
    └── ↔ Chrome Storage (配置存储)

content.js
    └── ← Chrome Storage (读取配置)
```

## 数据流向

```
用户操作
    ↓
Popup/Options (界面)
    ↓
Chrome Storage (存储)
    ↓
Content Script (读取)
    ↓
页面处理 (转换)
```

## 开发优先级

### 第一阶段（已完成）✅

-   [x] manifest.json
-   [x] content.js
-   [x] background.js
-   [x] popup 界面
-   [x] options 界面
-   [x] 文档文件

### 第二阶段（待完成）⚠️

-   [ ] 创建图标文件
-   [ ] 测试和优化
-   [ ] 性能调优

### 第三阶段（未来）📋

-   [ ] 国际化支持
-   [ ] 高级功能
-   [ ] 发布到 Chrome Web Store

## 文件大小统计

| 文件类型   | 数量   | 总大小     |
| ---------- | ------ | ---------- |
| JavaScript | 4      | ~12 KB     |
| HTML       | 4      | ~10 KB     |
| CSS        | 2      | ~6 KB      |
| Markdown   | 7      | ~25 KB     |
| 其他       | 2      | ~2 KB      |
| **总计**   | **19** | **~55 KB** |

## 注意事项

1. **图标文件：** 需要手动创建三个尺寸的 PNG 图标
2. **测试：** 使用 test.html 进行功能测试
3. **配置：** manifest.json 是核心配置文件，修改需谨慎
4. **权限：** 已声明必要的最小权限集
5. **兼容性：** 使用 Manifest V3，兼容最新 Chrome

## 快速导航

-   🚀 [快速开始](QUICKSTART.md)
-   📖 [完整文档](README.md)
-   🔧 [开发指南](DEVELOPMENT.md)
-   📦 [安装说明](INSTALL.md)
-   🧪 [功能测试](test.html)
