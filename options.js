// 智能超链接识别 - 设置页面脚本

document.addEventListener('DOMContentLoaded', function () {
	const openInNewTab = document.getElementById('openInNewTab')
	const blacklist = document.getElementById('blacklist')
	const excludedTags = document.getElementById('excludedTags')
	const saveBtn = document.getElementById('saveBtn')
	const resetBtn = document.getElementById('resetBtn')
	const saveStatus = document.getElementById('saveStatus')

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
		})
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

		chrome.storage.sync.get(['config'], function (result) {
			const config = result.config || {}

			config.openInNewTab = openInNewTab.checked
			config.blacklist = blacklistArray
			config.excludedTags =
				excludedTagsArray.length > 0
					? excludedTagsArray
					: defaultConfig.excludedTags

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

	// 初始化
	loadConfig()

	// 加载统计信息
	chrome.storage.local.get(['stats'], function (result) {
		const stats = result.stats || { totalConverted: 0 }
		document.getElementById('totalConverted').textContent =
			stats.totalConverted || 0
	})
})
