# 智能超链接识别 - 开发指南

## 项目概述

本项目是一个 Chrome 浏览器扩展，用于自动将网页中的纯文本 URL 转换为可点击的超链
接。

## 技术栈

-   **Manifest Version:** V3
-   **核心技术:** Vanilla JavaScript (ES6+)
-   **API 使用:**
    -   Chrome Extension APIs
    -   DOM TreeWalker API
    -   MutationObserver API
    -   Chrome Storage API
    -   Chrome Runtime Messaging

## 核心模块说明

### 1. manifest.json

插件的配置文件，定义了：

-   基本信息（名称、版本、描述）
-   权限声明
-   内容脚本配置
-   后台服务配置
-   图标和界面文件

### 2. content.js

**核心转换逻辑**

主要功能：

-   扫描页面文本节点
-   使用正则表达式匹配 URL 和邮箱
-   创建 `<a>` 标签替换纯文本
-   监听 DOM 变化处理动态内容
-   智能排除特定标签

关键函数：

```javascript
processNode(node) // 处理单个节点
convertTextToLinks() // 转换文本为链接
observeDOMChanges() // 监听 DOM 变化
```

### 3. background.js

**后台服务脚本**

主要功能：

-   插件安装/更新处理
-   配置初始化
-   徽章状态管理
-   消息中转

### 4. popup.html/js/css

**弹出窗口**

功能：

-   快速启用/禁用插件
-   显示当前状态
-   快捷访问设置页面
-   刷新当前页面

### 5. options.html/js/css

**设置页面**

功能：

-   配置是否在新标签页打开链接
-   管理网站黑名单
-   自定义排除的 HTML 标签
-   显示统计信息

## 数据流

```
用户操作 → Popup/Options
    ↓
Chrome Storage (配置保存)
    ↓
Content Script (读取配置)
    ↓
页面处理 (转换链接)
```

## 配置结构

```javascript
{
  enabled: true,              // 是否启用
  openInNewTab: true,         // 新标签页打开
  excludedTags: [...],        // 排除的标签
  blacklist: [...]            // 黑名单域名
}
```

## 正则表达式说明

### URL 匹配

```javascript
;/(?:(?:https?|ftp):\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/gi
```

匹配：

-   `https://example.com`
-   `www.example.com`
-   `example.com/path`

### 邮箱匹配

```javascript
;/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g
```

匹配：

-   `user@example.com`
-   `name.surname@domain.co.uk`

## 性能优化

1. **节点标记:** 使用 `data-link-converted` 属性避免重复处理
2. **批量处理:** 收集所有文本节点后统一处理
3. **智能过滤:** TreeWalker 配置过滤器减少遍历
4. **防抖处理:** MutationObserver 避免频繁触发

## 调试技巧

### 1. 查看日志

```javascript
// 在 content.js 中添加
console.log('[Link Converter]', message)
```

### 2. 检查存储

```javascript
// 在控制台执行
chrome.storage.sync.get(['config'], console.log)
```

### 3. 测试正则

```javascript
const text = 'Visit www.example.com'
const regex = /your-regex/gi
console.log(text.match(regex))
```

### 4. 性能分析

```javascript
console.time('processNode')
processNode(document.body)
console.timeEnd('processNode')
```

## 常见问题

### Q: 为什么某些网站不工作？

A: 可能原因：

1. 网站使用 Shadow DOM
2. 内容在 iframe 中
3. 网站在黑名单中
4. 与其他扩展冲突

### Q: 如何提高匹配准确度？

A:

1. 优化正则表达式
2. 添加更多排除规则
3. 检查上下文（避免误匹配）

### Q: 性能影响如何？

A:

-   小型页面：几乎无影响
-   大型页面：<100ms 处理时间
-   动态内容：实时处理，延迟<50ms

## 测试建议

### 测试场景

1. 静态页面（博客、文档）
2. 动态页面（社交媒体、论坛）
3. 单页应用（SPA）
4. 代码展示网站（GitHub、Stack Overflow）

### 测试用例

```
测试文本：
- https://www.google.com
- www.example.com
- example.com/path?query=value
- user@example.com
- 192.168.1.1
- localhost:3000
```

## 发布流程

1. 更新版本号（manifest.json）
2. 更新 CHANGELOG.md
3. 测试所有功能
4. 打包扩展程序
5. 提交到 Chrome Web Store
6. 创建 GitHub Release

## 代码规范

-   使用 ES6+ 语法
-   函数命名：驼峰命名法
-   常量命名：全大写下划线分隔
-   添加必要注释
-   保持代码简洁

## 资源链接

-   [Chrome Extension 官方文档](https://developer.chrome.com/docs/extensions/)
-   [Manifest V3 迁移指南](https://developer.chrome.com/docs/extensions/mv3/intro/)
-   [正则表达式测试](https://regex101.com/)

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交代码
4. 发起 Pull Request
5. 等待审核

欢迎贡献代码、报告问题、提出建议！
