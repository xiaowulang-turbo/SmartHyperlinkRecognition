// 智能超链接识别 - 弹出窗口脚本

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
	const enableToggle = document.getElementById('enableToggle')
	const statusText = document.getElementById('statusText')
	const pageStatus = document.getElementById('pageStatus')
	const optionsBtn = document.getElementById('optionsBtn')
	const refreshBtn = document.getElementById('refreshBtn')
	const themeToggle = document.getElementById('themeToggle')

	// 加载当前配置
	chrome.storage.sync.get(['config'], function (result) {
		const config = result.config || { enabled: true }
		enableToggle.checked = config.enabled
		updateStatusText(config.enabled)
	})

	// 监听开关变化
	enableToggle.addEventListener('change', function () {
		const enabled = this.checked

		chrome.storage.sync.get(['config'], function (result) {
			const config = result.config || {}
			config.enabled = enabled

			chrome.storage.sync.set({ config: config }, function () {
				updateStatusText(enabled)

				// 刷新当前标签页以应用更改
				chrome.tabs.query(
					{ active: true, currentWindow: true },
					function (tabs) {
						if (tabs[0]) {
							chrome.tabs.reload(tabs[0].id)
						}
					}
				)
			})
		})
	})

	// 打开设置页面
	optionsBtn.addEventListener('click', function () {
		chrome.runtime.openOptionsPage()
	})

	// 刷新当前页面
	refreshBtn.addEventListener('click', function () {
		chrome.tabs.query(
			{ active: true, currentWindow: true },
			function (tabs) {
				if (tabs[0]) {
					chrome.tabs.reload(tabs[0].id)
					window.close()
				}
			}
		)
	})

	// 更新状态文本
	function updateStatusText(enabled) {
		if (enabled) {
			statusText.textContent = '已启用'
			statusText.style.color = '#4CAF50'
			pageStatus.textContent = '活动中'
			pageStatus.style.color = '#4CAF50'
		} else {
			statusText.textContent = '已禁用'
			statusText.style.color = '#F44336'
			pageStatus.textContent = '已暂停'
			pageStatus.style.color = '#F44336'
		}
	}

	// 主题切换
	themeToggle.addEventListener('click', function () {
		chrome.storage.sync.get(['config'], function (result) {
			const config = result.config || {}
			const currentTheme =
				document.documentElement.getAttribute('data-theme')
			const isDark =
				currentTheme === 'dark' ||
				(!currentTheme &&
					window.matchMedia('(prefers-color-scheme: dark)').matches)

			const newTheme = isDark ? 'light' : 'dark'
			document.documentElement.setAttribute('data-theme', newTheme)
			config.theme = newTheme

			chrome.storage.sync.set({ config: config })
		})
	})
})
