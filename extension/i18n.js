// 智能超链接识别 - 扩展国际化模块

const i18n = {
	// 翻译词典
	translations: {
		'zh-CN': {
			// Popup 页面
			'popup.title': '智能超链接识别',
			'popup.subtitle': 'Smart Text-to-Link Converter',
			'popup.status.enabled': '已启用',
			'popup.status.disabled': '已禁用',
			'popup.info.convert': '🔗 自动将纯文本 URL 转换为可点击链接',
			'popup.info.dynamic': '⚡ 支持动态内容实时处理',
			'popup.page.status': '当前页面状态:',
			'popup.page.active': '活动中',
			'popup.page.paused': '已暂停',
			'popup.btn.settings': '⚙️ 设置',
			'popup.btn.refresh': '🔄 刷新页面',

			// Options 页面
			'options.title': '⚙️ 智能超链接识别 - 设置',
			'options.subtitle': 'Smart Text-to-Link Converter Settings',

			// 基本设置
			'options.basic.title': '🔧 基本设置',
			'options.basic.newTab': '在新标签页中打开链接',
			'options.basic.newTab.desc':
				'启用后，点击转换的链接将在新标签页中打开',

			// 外观设置
			'options.appearance.title': '🎨 外观设置',
			'options.appearance.theme': '主题模式',
			'options.appearance.theme.auto': '💻 跟随系统',
			'options.appearance.theme.light': '☀️ 浅色模式',
			'options.appearance.theme.dark': '🌙 深色模式',
			'options.appearance.theme.desc':
				'选择插件界面的主题模式，"跟随系统"将自动适配您的操作系统设置',
			'options.appearance.lang': '界面语言',
			'options.appearance.lang.auto': '🌐 自动检测',
			'options.appearance.lang.zh': '🇨🇳 简体中文',
			'options.appearance.lang.en': '🇺🇸 English',
			'options.appearance.lang.desc':
				'选择插件界面语言，"自动检测"将根据浏览器语言自动选择',

			// 黑名单
			'options.blacklist.title': '🚫 网站黑名单',
			'options.blacklist.desc':
				'在以下网站上禁用插件功能（每行一个域名）',
			'options.blacklist.placeholder':
				'例如：\ngithub.com\nstackoverflow.com\nexample.com',
			'options.blacklist.hint':
				'💡 提示：只需输入域名，不需要 http:// 或 https://',

			// 排除标签
			'options.excludedTags.title': '🏷️ 排除的 HTML 标签',
			'options.excludedTags.desc':
				'以下标签内的文本不会被转换（用逗号分隔）',
			'options.excludedTags.placeholder': 'SCRIPT, STYLE, PRE, CODE, A',
			'options.excludedTags.hint':
				'💡 默认排除：SCRIPT, STYLE, NOSCRIPT, TEXTAREA, PRE, CODE, A',

			// 关于
			'options.about.title': 'ℹ️ 关于',
			'options.about.desc': '是一款高效的 Chrome 浏览器扩展程序。',
			'options.about.name': '智能超链接识别',
			'options.about.feature1':
				'✨ 自动将网页中的纯文本 URL 转换为可点击的超链接',
			'options.about.feature2': '⚡ 支持动态内容实时处理',
			'options.about.feature3': '🔒 所有操作在本地完成，不收集任何数据',

			// 按钮
			'options.btn.save': '💾 保存设置',
			'options.btn.reset': '🔄 恢复默认',
			'options.status.saved': '✅ 设置已保存！',
			'options.status.reset': '🔄 已恢复默认设置',
			'options.confirm.reset': '确定要恢复默认设置吗？',

// 通用
			'common.switchTheme': '切换主题',
			'common.switchLang': '切换语言',

			// 欢迎页面
			'welcome.title': '✍️ 欢迎使用',
			'welcome.subtitle': '智能超链接识别 (Smart Text-to-Link Converter)',
			'welcome.feature1.title': '智能文本链接转换',
			'welcome.feature1.desc': '自动识别并转换网页中的纯文本 URL，让所有链接都可以直接点击，无需复制粘贴。',
			'welcome.feature2.title': '实时动态处理',
			'welcome.feature2.desc': '不仅处理页面加载时的内容，还能实时处理通过 AJAX 或 JavaScript 动态加载的新内容。',
			'welcome.feature3.title': '智能排除规则',
			'welcome.feature3.desc': '自动跳过代码块、已有链接等特殊区域，避免破坏页面原有结构和样式。',
			'welcome.feature4.title': '安全与隐私',
			'welcome.feature4.desc': '所有操作都在本地完成，不收集任何数据，不影响浏览速度。',
			'welcome.demo.title': '📝 示例演示',
			'welcome.demo.text1': '访问我们的官网',
			'welcome.demo.text2': '了解更多功能',
			'welcome.demo.text3': '项目开源地址',
			'welcome.demo.text4': '欢迎 Star ⭐',
			'welcome.demo.hint': '💡 以上文本中的 URL 已自动转换为可点击的链接！',
			'welcome.cta.text': '插件已安装成功，现在就开始使用吧！',
			'welcome.cta.start': '🚀 开始使用',
			'welcome.cta.settings': '⚙️ 前往设置',
		},
		en: {
			// Popup 页面
			'popup.title': 'Smart Hyperlink',
			'popup.subtitle': 'Smart Text-to-Link Converter',
			'popup.status.enabled': 'Enabled',
			'popup.status.disabled': 'Disabled',
			'popup.info.convert':
				'🔗 Auto-convert plain text URLs to clickable links',
			'popup.info.dynamic':
				'⚡ Support real-time processing of dynamic content',
			'popup.page.status': 'Current page status:',
			'popup.page.active': 'Active',
			'popup.page.paused': 'Paused',
			'popup.btn.settings': '⚙️ Settings',
			'popup.btn.refresh': '🔄 Refresh Page',

			// Options 页面
			'options.title': '⚙️ Smart Hyperlink - Settings',
			'options.subtitle': 'Smart Text-to-Link Converter Settings',

			// 基本设置
			'options.basic.title': '🔧 Basic Settings',
			'options.basic.newTab': 'Open links in new tab',
			'options.basic.newTab.desc':
				'When enabled, clicking converted links will open in a new tab',

			// 外观设置
			'options.appearance.title': '🎨 Appearance',
			'options.appearance.theme': 'Theme Mode',
			'options.appearance.theme.auto': '💻 System',
			'options.appearance.theme.light': '☀️ Light',
			'options.appearance.theme.dark': '🌙 Dark',
			'options.appearance.theme.desc':
				'Choose theme mode. "System" will follow your OS settings',
			'options.appearance.lang': 'Language',
			'options.appearance.lang.auto': '🌐 Auto Detect',
			'options.appearance.lang.zh': '🇨🇳 简体中文',
			'options.appearance.lang.en': '🇺🇸 English',
			'options.appearance.lang.desc':
				'Choose interface language. "Auto Detect" will follow browser language',

			// 黑名单
			'options.blacklist.title': '🚫 Website Blacklist',
			'options.blacklist.desc':
				'Disable extension on these websites (one domain per line)',
			'options.blacklist.placeholder':
				'Example:\ngithub.com\nstackoverflow.com\nexample.com',
			'options.blacklist.hint':
				'💡 Tip: Only enter domain name, no http:// or https://',

			// 排除标签
			'options.excludedTags.title': '🏷️ Excluded HTML Tags',
			'options.excludedTags.desc':
				'Text inside these tags will not be converted (comma separated)',
			'options.excludedTags.placeholder': 'SCRIPT, STYLE, PRE, CODE, A',
			'options.excludedTags.hint':
				'💡 Default excluded: SCRIPT, STYLE, NOSCRIPT, TEXTAREA, PRE, CODE, A',

			// 关于
			'options.about.title': 'ℹ️ About',
			'options.about.desc': 'is an efficient Chrome browser extension.',
			'options.about.name': 'Smart Hyperlink Recognition',
			'options.about.feature1':
				'✨ Automatically convert plain text URLs to clickable hyperlinks',
			'options.about.feature2':
				'⚡ Support real-time processing of dynamic content',
			'options.about.feature3':
				'🔒 All operations are done locally, no data collection',

			// 按钮
			'options.btn.save': '💾 Save Settings',
			'options.btn.reset': '🔄 Reset Default',
			'options.status.saved': '✅ Settings saved!',
			'options.status.reset': '🔄 Default settings restored',
			'options.confirm.reset':
				'Are you sure you want to reset to default settings?',

// 通用
			'common.switchTheme': 'Switch Theme',
			'common.switchLang': 'Switch Language',

			// 欢迎页面
			'welcome.title': '✍️ Welcome',
			'welcome.subtitle': 'Smart Text-to-Link Converter',
			'welcome.feature1.title': 'Smart Link Conversion',
			'welcome.feature1.desc': 'Automatically detect and convert plain text URLs into clickable links, no more copy-paste.',
			'welcome.feature2.title': 'Real-time Processing',
			'welcome.feature2.desc': 'Not only handles content on page load, but also processes content dynamically loaded via AJAX or JavaScript.',
			'welcome.feature3.title': 'Smart Exclusion Rules',
			'welcome.feature3.desc': 'Automatically skips code blocks, existing links and other special areas to avoid breaking page structure.',
			'welcome.feature4.title': 'Security & Privacy',
			'welcome.feature4.desc': 'All operations are done locally, no data collection, no impact on browsing speed.',
			'welcome.demo.title': '📝 Demo',
			'welcome.demo.text1': 'Visit our website',
			'welcome.demo.text2': 'to learn more',
			'welcome.demo.text3': 'Open source at',
			'welcome.demo.text4': 'Welcome to Star ⭐',
			'welcome.demo.hint': '💡 The URLs above have been automatically converted to clickable links!',
			'welcome.cta.text': 'Extension installed successfully, start using it now!',
			'welcome.cta.start': '🚀 Get Started',
			'welcome.cta.settings': '⚙️ Settings',
		},
	},

	// 当前语言
	currentLang: 'zh-CN',

// 初始化
	init(callback) {
		// 检查 chrome.storage 是否可用
		if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
			chrome.storage.sync.get(['config'], (result) => {
				const config = result.config || {}
				const lang = config.lang

				if (lang && lang !== 'auto' && this.translations[lang]) {
					this.currentLang = lang
				} else {
					// 自动检测浏览器语言
					const browserLang = navigator.language || navigator.userLanguage
					this.currentLang = browserLang.startsWith('zh') ? 'zh-CN' : 'en'
				}

				this._applyLangAndTranslations()
				if (callback) callback()
			})
		} else {
			// 如果 chrome.storage 不可用，直接使用浏览器语言
			const browserLang = navigator.language || navigator.userLanguage
			this.currentLang = browserLang.startsWith('zh') ? 'zh-CN' : 'en'
			this._applyLangAndTranslations()
			if (callback) callback()
		}
	},

	// 内部方法：应用语言和翻译
	_applyLangAndTranslations() {
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

	// 设置语言
	setLang(lang, save = true) {
		if (lang === 'auto') {
			const browserLang = navigator.language || navigator.userLanguage
			this.currentLang = browserLang.startsWith('zh') ? 'zh-CN' : 'en'
		} else if (this.translations[lang]) {
			this.currentLang = lang
		}

		document.documentElement.setAttribute(
			'lang',
			this.currentLang === 'zh-CN' ? 'zh-CN' : 'en'
		)

		this.applyTranslations()
		this.updateToggleButton()

		// 保存到 chrome.storage
		if (save) {
			chrome.storage.sync.get(['config'], (result) => {
				const config = result.config || {}
				config.lang = lang
				chrome.storage.sync.set({ config: config })
			})
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
