// 智能超链接识别 - 弹出窗口脚本

document.addEventListener('DOMContentLoaded', function () {
	const enableToggle = document.getElementById('enableToggle')
	const statusText = document.getElementById('statusText')
	const pageStatus = document.getElementById('pageStatus')
	const optionsBtn = document.getElementById('optionsBtn')
	const refreshBtn = document.getElementById('refreshBtn')

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

				// 通知当前标签页
				chrome.tabs.query(
					{ active: true, currentWindow: true },
					function (tabs) {
						if (tabs[0]) {
							chrome.tabs.sendMessage(tabs[0].id, {
								action: 'toggleEnabled',
								enabled: enabled,
							})
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
})
