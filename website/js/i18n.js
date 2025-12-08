// 国际化 (i18n) 模块

const i18n = {
	// 翻译词典
	translations: {
		'zh-CN': {
			// 导航栏
			'nav.brand': '智能超链接识别',
			'nav.home': '首页',
			'nav.features': '功能',
			'nav.demo': '演示',
			'nav.download': '下载',
			'nav.docs': '文档',

			// Hero 区域
			'hero.title': '智能超链接识别',
			'hero.subtitle': 'Smart Text-to-Link Converter',
			'hero.description':
				'自动将网页中的纯文本 URL 转换为可点击的超链接<br>让您的浏览体验更加顺畅，告别复制粘贴！',
			'hero.download': '立即下载',
			'hero.demo': '查看演示',
			'hero.version': '当前版本',
			'hero.free': '免费',
			'hero.opensource': '开源项目',
			'hero.license': '许可证',
			'hero.extension.name': '智能超链接识别',
			'hero.extension.desc': '自动转换纯文本 URL 为可点击链接',
			'hero.extension.enabled': '已启用',

			// 功能特性
			'features.title': '核心功能',
			'features.subtitle': '强大而智能的链接识别与转换能力',
			'features.smart.title': '智能识别',
			'features.smart.desc':
				'自动识别网页中的 URL、邮箱地址等文本链接，支持多种格式',
			'features.realtime.title': '实时转换',
			'features.realtime.desc':
				'不仅处理页面加载时的内容，还能实时处理动态加载的新内容',
			'features.exclude.title': '智能排除',
			'features.exclude.desc':
				'自动跳过代码块、已有链接等特殊区域，避免破坏页面结构',
			'features.config.title': '高度可配置',
			'features.config.desc':
				'支持自定义排除规则、黑名单、链接打开方式等多项配置',
			'features.privacy.title': '安全隐私',
			'features.privacy.desc':
				'所有操作在本地完成，不收集任何数据，保护您的隐私安全',
			'features.performance.title': '高性能',
			'features.performance.desc':
				'经过优化的算法，对页面性能影响极小，流畅的使用体验',

			// 演示区域
			'demo.title': '实时演示',
			'demo.subtitle': '看看插件是如何工作的',
			'demo.before': '转换前',
			'demo.after': '转换后',
			'demo.text1': '访问我们的网站 www.example.com 获取更多信息',
			'demo.text2': '或发送邮件到 contact@example.com',
			'demo.text3': '查看项目 https://github.com/example/project',
			'demo.after.text1':
				'访问我们的网站 <a href="http://www.example.com" target="_blank">www.example.com</a> 获取更多信息',
			'demo.after.text2':
				'或发送邮件到 <a href="mailto:contact@example.com">contact@example.com</a>',
			'demo.after.text3':
				'查看项目 <a href="https://github.com/example/project" target="_blank">https://github.com/example/project</a>',

			// 使用场景
			'usecases.title': '使用场景',
			'usecases.subtitle': '适用于各种网页浏览场景',
			'usecases.forum.title': '论坛和社区',
			'usecases.forum.desc':
				'在 Reddit、知乎等社区，用户分享的纯文本链接自动可点击',
			'usecases.docs.title': '技术文档',
			'usecases.docs.desc':
				'阅读技术文档时，文档中的 URL 引用自动变成超链接',
			'usecases.work.title': '工作协作',
			'usecases.work.desc': '在线协作工具中的链接分享更加便捷高效',
			'usecases.email.title': '邮件和联系',
			'usecases.email.desc': '网页上的邮箱地址自动变成 mailto 链接',

			// 下载安装
			'download.title': '下载安装',
			'download.subtitle': '快速开始使用智能超链接识别',
			'download.chrome.title': 'Chrome Web Store',
			'download.chrome.desc': '推荐方式，一键安装，自动更新',
			'download.chrome.btn': '从商店安装',
			'download.chrome.soon': '即将上架',
			'download.github.title': 'GitHub Release',
			'download.github.desc': '下载最新版本，手动安装',
			'download.github.btn': '前往 GitHub',
			'download.steps.title': '安装步骤',
			'download.step1.title': '下载扩展',
			'download.step1.desc': '从 Chrome Web Store 或 GitHub 下载',
			'download.step2.title': '加载扩展',
			'download.step2.desc': '打开 chrome://extensions 加载',
			'download.step3.title': '开始使用',
			'download.step3.desc': '访问任何网页，自动转换链接',

			// 文档资源
			'docs.title': '文档资源',
			'docs.subtitle': '详细的使用指南和开发文档',
			'docs.quickstart.title': '快速开始',
			'docs.quickstart.desc': '5 分钟快速上手指南',
			'docs.install.title': '安装指南',
			'docs.install.desc': '详细的安装步骤说明',
			'docs.full.title': '完整文档',
			'docs.full.desc': '项目完整说明文档',
			'docs.dev.title': '开发指南',
			'docs.dev.desc': '开发者技术文档',

			// FAQ
			'faq.title': '常见问题',
			'faq.subtitle': 'FAQ',
			'faq.q1': '插件是否免费？',
			'faq.a1':
				'是的，本插件完全免费且开源，采用 MIT 许可证。您可以自由使用、修改和分发。',
			'faq.q2': '插件会收集我的数据吗？',
			'faq.a2':
				'不会。所有操作都在本地完成，不会收集、存储或传输任何用户数据，完全保护您的隐私。',
			'faq.q3': '插件会影响浏览速度吗？',
			'faq.a3':
				'不会。插件经过性能优化，使用高效的算法，对页面加载和浏览速度的影响微乎其微。',
			'faq.q4': '如何禁用特定网站的转换？',
			'faq.a4':
				'在插件设置页面中，可以添加网站到黑名单。黑名单中的网站将不会进行链接转换。',
			'faq.q5': '支持哪些浏览器？',
			'faq.a5':
				'目前支持 Chrome 88 及以上版本。未来计划支持 Edge、Firefox 等其他浏览器。',

			// 页脚
			'footer.tagline': '让网页浏览更加便捷',
			'footer.quicklinks': '快速链接',
			'footer.resources': '资源',
			'footer.about': '关于',
			'footer.docs': '项目文档',
			'footer.changelog': '更新日志',
			'footer.issues': '问题反馈',
			'footer.license': '开源许可',
			'footer.privacy': '隐私政策',
			'footer.github': 'GitHub 仓库',
			'footer.contribute': '贡献指南',
			'footer.conduct': '行为准则',
			'footer.copyright':
				'© 2024 Smart Text-to-Link Converter. 保留所有权利。',
			'footer.mit': '基于 MIT 许可证发布',

			// 隐私政策页面
			'privacy.page.title': '隐私政策 - 智能超链接识别',
			'privacy.title': '🔒 隐私政策',
			'privacy.lastUpdated': '最后更新：2024年12月',
			'privacy.summary':
				'<strong>简要说明：</strong>智能超链接识别扩展不会收集、存储或传输任何用户数据。所有功能完全在您的浏览器本地运行。',
			'privacy.intro.title': '📋 概述',
			'privacy.intro.content':
				'智能超链接识别（"本扩展"）是一款开源的 Chrome 浏览器扩展，旨在帮助用户自动将网页中的纯文本 URL 转换为可点击的超链接。我们非常重视用户隐私，本隐私政策将详细说明我们如何处理您的信息。',
			'privacy.collect.title': '📊 信息收集',
			'privacy.collect.content':
				'本扩展不收集任何个人信息或使用数据。具体来说：',
			'privacy.collect.item1': '不收集您的浏览历史',
			'privacy.collect.item2': '不收集您访问的网站信息',
			'privacy.collect.item3': '不收集任何个人身份信息',
			'privacy.collect.item4': '不收集设备信息或位置数据',
			'privacy.collect.item5': '不使用任何分析或追踪服务',
			'privacy.storage.title': '💾 本地存储',
			'privacy.storage.content':
				'本扩展仅在您的浏览器本地存储以下设置信息：',
			'privacy.storage.item1': '扩展启用/禁用状态',
			'privacy.storage.item2': '用户自定义的排除规则',
			'privacy.storage.item3': '网站黑名单设置',
			'privacy.storage.item4': '界面主题和语言偏好',
			'privacy.storage.note':
				'这些数据仅存储在您的本地设备上，不会被传输到任何外部服务器。您可以随时通过浏览器的扩展管理功能清除这些数据。',
			'privacy.permissions.title': '🔐 权限说明',
			'privacy.permissions.content': '本扩展请求以下权限：',
			'privacy.permissions.item1':
				'<strong>activeTab</strong>：允许扩展在当前活动标签页上运行，用于检测和转换文本链接',
			'privacy.permissions.item2':
				'<strong>storage</strong>：允许扩展在本地存储您的设置偏好',
			'privacy.permissions.item3':
				'<strong>所有网址访问权限</strong>：允许扩展在所有网页上运行链接转换功能',
			'privacy.permissions.note':
				'这些权限仅用于实现扩展的核心功能，不会被用于收集或传输任何数据。',
			'privacy.thirdparty.title': '🌐 第三方服务',
			'privacy.thirdparty.content':
				'本扩展不使用任何第三方分析、广告或追踪服务。扩展的所有功能完全在本地运行，不与任何外部服务器通信。',
			'privacy.opensource.title': '📖 开源透明',
			'privacy.opensource.content':
				'本扩展是完全开源的，源代码托管在 GitHub 上。您可以随时审查我们的代码，验证我们的隐私承诺。',
			'privacy.opensource.link': '查看源代码',
			'privacy.changes.title': '📝 政策更新',
			'privacy.changes.content':
				'如果我们对本隐私政策进行重大更改，我们将在此页面上发布更新后的政策，并更新"最后更新"日期。建议您定期查看本页面以了解任何变化。',
			'privacy.contact.title': '📧 联系我们',
			'privacy.contact.content':
				'如果您对本隐私政策有任何疑问或建议，请通过以下方式联系我们：',
			'privacy.contact.github': 'GitHub Issues：',
			'privacy.contact.githubLink': '提交问题反馈',
			'privacy.contact.email': '电子邮件：',
		},
		en: {
			// 导航栏
			'nav.brand': 'Smart Hyperlink',
			'nav.home': 'Home',
			'nav.features': 'Features',
			'nav.demo': 'Demo',
			'nav.download': 'Download',
			'nav.docs': 'Docs',

			// Hero 区域
			'hero.title': 'Smart Hyperlink Recognition',
			'hero.subtitle': 'Smart Text-to-Link Converter',
			'hero.description':
				'Automatically convert plain text URLs into clickable hyperlinks<br>Make your browsing experience smoother, say goodbye to copy-paste!',
			'hero.download': 'Download Now',
			'hero.demo': 'View Demo',
			'hero.version': 'Version',
			'hero.free': 'Free',
			'hero.opensource': 'Open Source',
			'hero.license': 'License',
			'hero.extension.name': 'Smart Hyperlink Recognition',
			'hero.extension.desc':
				'Auto-convert plain text URLs to clickable links',
			'hero.extension.enabled': 'Enabled',

			// 功能特性
			'features.title': 'Core Features',
			'features.subtitle': 'Powerful and intelligent link recognition',
			'features.smart.title': 'Smart Detection',
			'features.smart.desc':
				'Automatically detect URLs, email addresses and other text links on web pages',
			'features.realtime.title': 'Real-time Conversion',
			'features.realtime.desc':
				'Process not only page load content, but also dynamically loaded content',
			'features.exclude.title': 'Smart Exclusion',
			'features.exclude.desc':
				'Automatically skip code blocks, existing links to avoid breaking page structure',
			'features.config.title': 'Highly Configurable',
			'features.config.desc':
				'Support custom exclusion rules, blacklist, link opening methods and more',
			'features.privacy.title': 'Privacy & Security',
			'features.privacy.desc':
				'All operations are done locally, no data collection, protecting your privacy',
			'features.performance.title': 'High Performance',
			'features.performance.desc':
				'Optimized algorithms with minimal impact on page performance',

			// 演示区域
			'demo.title': 'Live Demo',
			'demo.subtitle': 'See how the extension works',
			'demo.before': 'Before',
			'demo.after': 'After',
			'demo.text1': 'Visit our website www.example.com for more info',
			'demo.text2': 'Or send email to contact@example.com',
			'demo.text3': 'Check out https://github.com/example/project',
			'demo.after.text1':
				'Visit our website <a href="http://www.example.com" target="_blank">www.example.com</a> for more info',
			'demo.after.text2':
				'Or send email to <a href="mailto:contact@example.com">contact@example.com</a>',
			'demo.after.text3':
				'Check out <a href="https://github.com/example/project" target="_blank">https://github.com/example/project</a>',

			// 使用场景
			'usecases.title': 'Use Cases',
			'usecases.subtitle': 'Suitable for various web browsing scenarios',
			'usecases.forum.title': 'Forums & Communities',
			'usecases.forum.desc':
				'Plain text links shared on Reddit, Stack Overflow become clickable',
			'usecases.docs.title': 'Technical Docs',
			'usecases.docs.desc':
				'URL references in documentation automatically become hyperlinks',
			'usecases.work.title': 'Work Collaboration',
			'usecases.work.desc':
				'Link sharing in online collaboration tools becomes more convenient',
			'usecases.email.title': 'Email & Contact',
			'usecases.email.desc':
				'Email addresses on web pages automatically become mailto links',

			// 下载安装
			'download.title': 'Download',
			'download.subtitle': 'Get started with Smart Hyperlink Recognition',
			'download.chrome.title': 'Chrome Web Store',
			'download.chrome.desc':
				'Recommended, one-click install, auto update',
			'download.chrome.btn': 'Install from Store',
			'download.chrome.soon': 'Coming Soon',
			'download.github.title': 'GitHub Release',
			'download.github.desc': 'Download latest version, manual install',
			'download.github.btn': 'Go to GitHub',
			'download.steps.title': 'Installation Steps',
			'download.step1.title': 'Download',
			'download.step1.desc': 'From Chrome Web Store or GitHub',
			'download.step2.title': 'Load Extension',
			'download.step2.desc': 'Open chrome://extensions to load',
			'download.step3.title': 'Start Using',
			'download.step3.desc': 'Visit any webpage, links auto-convert',

			// 文档资源
			'docs.title': 'Documentation',
			'docs.subtitle': 'Detailed guides and developer docs',
			'docs.quickstart.title': 'Quick Start',
			'docs.quickstart.desc': '5-minute getting started guide',
			'docs.install.title': 'Installation',
			'docs.install.desc': 'Detailed installation instructions',
			'docs.full.title': 'Full Docs',
			'docs.full.desc': 'Complete project documentation',
			'docs.dev.title': 'Developer Guide',
			'docs.dev.desc': 'Technical documentation for developers',

			// FAQ
			'faq.title': 'FAQ',
			'faq.subtitle': 'Frequently Asked Questions',
			'faq.q1': 'Is the extension free?',
			'faq.a1':
				'Yes, this extension is completely free and open source under MIT license. You can freely use, modify and distribute it.',
			'faq.q2': 'Does the extension collect my data?',
			'faq.a2':
				'No. All operations are done locally, no data is collected, stored or transmitted. Your privacy is fully protected.',
			'faq.q3': 'Will the extension slow down my browser?',
			'faq.a3':
				'No. The extension is optimized with efficient algorithms, with minimal impact on page loading and browsing speed.',
			'faq.q4': 'How to disable conversion for specific websites?',
			'faq.a4':
				'In extension settings, you can add websites to blacklist. Websites in blacklist will not have link conversion.',
			'faq.q5': 'Which browsers are supported?',
			'faq.a5':
				'Currently supports Chrome 88 and above. Future support for Edge, Firefox and other browsers is planned.',

			// 页脚
			'footer.tagline': 'Making web browsing more convenient',
			'footer.quicklinks': 'Quick Links',
			'footer.resources': 'Resources',
			'footer.about': 'About',
			'footer.docs': 'Documentation',
			'footer.changelog': 'Changelog',
			'footer.issues': 'Report Issues',
			'footer.license': 'License',
			'footer.privacy': 'Privacy Policy',
			'footer.github': 'GitHub Repo',
			'footer.contribute': 'Contributing',
			'footer.conduct': 'Code of Conduct',
			'footer.copyright':
				'© 2024 Smart Text-to-Link Converter. All rights reserved.',
			'footer.mit': 'Released under the MIT License',

			// Privacy Policy Page
			'privacy.page.title':
				'Privacy Policy - Smart Hyperlink Recognition',
			'privacy.title': '🔒 Privacy Policy',
			'privacy.lastUpdated': 'Last Updated: December 2024',
			'privacy.summary':
				'<strong>Summary:</strong> The Smart Hyperlink Recognition extension does not collect, store, or transmit any user data. All features run entirely locally in your browser.',
			'privacy.intro.title': '📋 Overview',
			'privacy.intro.content':
				'Smart Hyperlink Recognition ("the Extension") is an open-source Chrome browser extension designed to help users automatically convert plain text URLs into clickable hyperlinks. We take user privacy very seriously, and this privacy policy details how we handle your information.',
			'privacy.collect.title': '📊 Information Collection',
			'privacy.collect.content':
				'This extension does not collect any personal information or usage data. Specifically:',
			'privacy.collect.item1': 'We do not collect your browsing history',
			'privacy.collect.item2':
				'We do not collect information about websites you visit',
			'privacy.collect.item3':
				'We do not collect any personally identifiable information',
			'privacy.collect.item4':
				'We do not collect device information or location data',
			'privacy.collect.item5':
				'We do not use any analytics or tracking services',
			'privacy.storage.title': '💾 Local Storage',
			'privacy.storage.content':
				'This extension only stores the following settings locally in your browser:',
			'privacy.storage.item1': 'Extension enabled/disabled status',
			'privacy.storage.item2': 'User-defined exclusion rules',
			'privacy.storage.item3': 'Website blacklist settings',
			'privacy.storage.item4': 'Interface theme and language preferences',
			'privacy.storage.note':
				"This data is only stored on your local device and is never transmitted to any external servers. You can clear this data at any time through your browser's extension management.",
			'privacy.permissions.title': '🔐 Permissions',
			'privacy.permissions.content':
				'This extension requests the following permissions:',
			'privacy.permissions.item1':
				'<strong>activeTab</strong>: Allows the extension to run on the current active tab for detecting and converting text links',
			'privacy.permissions.item2':
				'<strong>storage</strong>: Allows the extension to store your settings preferences locally',
			'privacy.permissions.item3':
				'<strong>All URLs access</strong>: Allows the extension to run link conversion on all web pages',
			'privacy.permissions.note':
				'These permissions are only used to implement core extension functionality and will not be used to collect or transmit any data.',
			'privacy.thirdparty.title': '🌐 Third-Party Services',
			'privacy.thirdparty.content':
				'This extension does not use any third-party analytics, advertising, or tracking services. All extension features run entirely locally and do not communicate with any external servers.',
			'privacy.opensource.title': '📖 Open Source Transparency',
			'privacy.opensource.content':
				'This extension is completely open source, with source code hosted on GitHub. You can review our code at any time to verify our privacy commitments.',
			'privacy.opensource.link': 'View Source Code',
			'privacy.changes.title': '📝 Policy Updates',
			'privacy.changes.content':
				'If we make significant changes to this privacy policy, we will post the updated policy on this page and update the "Last Updated" date. We recommend checking this page periodically for any changes.',
			'privacy.contact.title': '📧 Contact Us',
			'privacy.contact.content':
				'If you have any questions or suggestions about this privacy policy, please contact us through:',
			'privacy.contact.github': 'GitHub Issues: ',
			'privacy.contact.githubLink': 'Submit Feedback',
			'privacy.contact.email': 'Email: ',
		},
	},

	// 当前语言
	currentLang: 'zh-CN',

	// 初始化
	init() {
		// 从 localStorage 读取语言设置
		const savedLang = localStorage.getItem('lang')
		if (savedLang && this.translations[savedLang]) {
			this.currentLang = savedLang
		} else {
			// 检测浏览器语言
			const browserLang = navigator.language || navigator.userLanguage
			this.currentLang = browserLang.startsWith('zh') ? 'zh-CN' : 'en'
		}

		// 设置 HTML lang 属性
		document.documentElement.setAttribute(
			'lang',
			this.currentLang === 'zh-CN' ? 'zh-CN' : 'en'
		)

		// 应用翻译
		this.applyTranslations()

		// 更新切换按钮状态
		this.updateToggleButton()
	},

	// 应用翻译
	applyTranslations() {
		const elements = document.querySelectorAll('[data-i18n]')
		elements.forEach((el) => {
			const key = el.getAttribute('data-i18n')
			const translation = this.t(key)
			if (translation) {
				// 检查是否包含 HTML
				if (translation.includes('<')) {
					el.innerHTML = translation
				} else {
					el.textContent = translation
				}
			}
		})

		// 更新 placeholder 属性
		const placeholders = document.querySelectorAll(
			'[data-i18n-placeholder]'
		)
		placeholders.forEach((el) => {
			const key = el.getAttribute('data-i18n-placeholder')
			const translation = this.t(key)
			if (translation) {
				el.placeholder = translation
			}
		})

		// 更新 title 属性
		const titles = document.querySelectorAll('[data-i18n-title]')
		titles.forEach((el) => {
			const key = el.getAttribute('data-i18n-title')
			const translation = this.t(key)
			if (translation) {
				el.title = translation
			}
		})
	},

	// 获取翻译
	t(key) {
		return this.translations[this.currentLang]?.[key] || key
	},

	// 切换语言
	setLang(lang) {
		if (this.translations[lang]) {
			this.currentLang = lang
			localStorage.setItem('lang', lang)
			document.documentElement.setAttribute(
				'lang',
				lang === 'zh-CN' ? 'zh-CN' : 'en'
			)
			this.applyTranslations()
			this.updateToggleButton()
		}
	},

	// 切换语言（中英文互切）
	toggle() {
		const newLang = this.currentLang === 'zh-CN' ? 'en' : 'zh-CN'
		this.setLang(newLang)
	},

	// 更新切换按钮状态
	updateToggleButton() {
		const btn = document.querySelector('.lang-toggle')
		if (btn) {
			btn.textContent = this.currentLang === 'zh-CN' ? 'EN' : '中'
			btn.title =
				this.currentLang === 'zh-CN'
					? 'Switch to English'
					: '切换到中文'
		}
	},
}

// 页面加载时初始化
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => i18n.init())
} else {
	i18n.init()
}
