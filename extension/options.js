// 智能超链接识别 - 设置页面脚本

// 初始化主题（立即执行，避免闪烁）
;(function () {
	chrome.storage.sync.get(['config'], function (result) {
		const config = result.config || {}
		// 默认跟随系统（auto），不设置 data-theme 属性
		const theme = config.theme
		if (theme === 'dark') {
			document.documentElement.setAttribute('data-theme', 'dark')
		} else if (theme === 'light') {
			document.documentElement.setAttribute('data-theme', 'light')
		}
		// theme 为 undefined 或 'auto' 时不设置属性，跟随系统
	})
})()

document.addEventListener('DOMContentLoaded', function () {
	const openInNewTab = document.getElementById('openInNewTab')
	const blacklist = document.getElementById('blacklist')
	const excludedTags = document.getElementById('excludedTags')
	const saveBtn = document.getElementById('saveBtn')
	const resetBtn = document.getElementById('resetBtn')
	const saveStatus = document.getElementById('saveStatus')
	const themeToggle = document.getElementById('themeToggle')
	const themeRadios = document.querySelectorAll('input[name="theme"]')

	// 默认配置
	const defaultConfig = {
		enabled: true,
		openInNewTab: true,
		excludedTags: [
			'SCRIPT',
			'STYLE',
			'NOSCRIPT',
			'TEXTAREA',
			'PRE',
			'CODE',
			'A',
		],
		blacklist: [],
		theme: 'auto',
	}

	// 加载配置
	function loadConfig() {
		chrome.storage.sync.get(['config'], function (result) {
			const config = result.config || defaultConfig

			openInNewTab.checked = config.openInNewTab !== false
			blacklist.value = (config.blacklist || []).join('\n')
			excludedTags.value = (
				config.excludedTags || defaultConfig.excludedTags
			).join(', ')

			// 加载主题设置
			const theme = config.theme || 'auto'
			const themeRadio = document.getElementById(
				'theme' + theme.charAt(0).toUpperCase() + theme.slice(1)
			)
			if (themeRadio) {
				themeRadio.checked = true
			}
			applyTheme(theme)
		})
	}

	// 应用主题
	function applyTheme(theme) {
		if (theme === 'auto') {
			document.documentElement.removeAttribute('data-theme')
		} else {
			document.documentElement.setAttribute('data-theme', theme)
		}
	}

	// 保存配置
	function saveConfig() {
		const blacklistArray = blacklist.value
			.split('\n')
			.map((line) => line.trim())
			.filter((line) => line.length > 0)

		const excludedTagsArray = excludedTags.value
			.split(',')
			.map((tag) => tag.trim().toUpperCase())
			.filter((tag) => tag.length > 0)

		// 获取选中的主题
		const selectedTheme =
			document.querySelector('input[name="theme"]:checked')?.value ||
			'auto'

		chrome.storage.sync.get(['config'], function (result) {
			const config = result.config || {}

			config.openInNewTab = openInNewTab.checked
			config.blacklist = blacklistArray
			config.excludedTags =
				excludedTagsArray.length > 0
					? excludedTagsArray
					: defaultConfig.excludedTags
			config.theme = selectedTheme

			chrome.storage.sync.set({ config: config }, function () {
				showStatus('✅ 设置已保存！', 'success')
			})
		})
	}

	// 重置为默认配置
	function resetConfig() {
		if (confirm('确定要恢复默认设置吗？')) {
			chrome.storage.sync.set({ config: defaultConfig }, function () {
				loadConfig()
				showStatus('🔄 已恢复默认设置', 'success')
			})
		}
	}

	// 显示保存状态
	function showStatus(message, type) {
		saveStatus.textContent = message
		saveStatus.className = 'save-status show ' + type

		setTimeout(function () {
			saveStatus.classList.remove('show')
		}, 3000)
	}

	// 事件监听
	saveBtn.addEventListener('click', saveConfig)
	resetBtn.addEventListener('click', resetConfig)

	// 主题切换按钮事件
	themeToggle.addEventListener('click', function () {
		const currentTheme = document.documentElement.getAttribute('data-theme')
		const isDark =
			currentTheme === 'dark' ||
			(!currentTheme &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)

		const newTheme = isDark ? 'light' : 'dark'
		applyTheme(newTheme)

		// 更新单选按钮状态
		const themeRadio = document.getElementById(
			'theme' + newTheme.charAt(0).toUpperCase() + newTheme.slice(1)
		)
		if (themeRadio) {
			themeRadio.checked = true
		}

		// 保存主题设置
		chrome.storage.sync.get(['config'], function (result) {
			const config = result.config || {}
			config.theme = newTheme
			chrome.storage.sync.set({ config: config })
		})
	})

	// 主题单选按钮事件
	themeRadios.forEach(function (radio) {
		radio.addEventListener('change', function () {
			const theme = this.value
			applyTheme(theme)

			// 保存主题设置
			chrome.storage.sync.get(['config'], function (result) {
				const config = result.config || {}
				config.theme = theme
				chrome.storage.sync.set({ config: config })
			})
		})
	})

	// 初始化
	loadConfig()

	// 加载统计信息
	chrome.storage.local.get(['stats'], function (result) {
		const stats = result.stats || { totalConverted: 0 }
		document.getElementById('totalConverted').textContent =
			stats.totalConverted || 0
	})
})
