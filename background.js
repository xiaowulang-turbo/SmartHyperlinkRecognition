// 智能超链接识别 - 后台脚本

// 安装或更新时的处理
chrome.runtime.onInstalled.addListener((details) => {
	if (details.reason === 'install') {
		// 首次安装，设置默认配置
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

		chrome.storage.sync.set({ config: defaultConfig }, () => {
			console.log('智能超链接识别插件已安装，默认配置已保存')
		})

		// 打开欢迎页面
		chrome.tabs.create({ url: 'welcome.html' })
	} else if (details.reason === 'update') {
		console.log(
			'智能超链接识别插件已更新到版本',
			chrome.runtime.getManifest().version
		)
	}
})

// 监听来自 content script 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'getConfig') {
		chrome.storage.sync.get(['config'], (result) => {
			sendResponse({ config: result.config })
		})
		return true // 保持消息通道开启
	}
})

// 设置图标徽章
function updateBadge(enabled) {
	if (enabled) {
		chrome.action.setBadgeText({ text: 'ON' })
		chrome.action.setBadgeBackgroundColor({ color: '#4CAF50' })
	} else {
		chrome.action.setBadgeText({ text: 'OFF' })
		chrome.action.setBadgeBackgroundColor({ color: '#F44336' })
	}
}

// 监听存储变化
chrome.storage.onChanged.addListener((changes, namespace) => {
	if (namespace === 'sync' && changes.config) {
		const newConfig = changes.config.newValue
		if (newConfig) {
			updateBadge(newConfig.enabled)
		}
	}
})

// 初始化徽章
chrome.storage.sync.get(['config'], (result) => {
	const config = result.config || { enabled: true }
	updateBadge(config.enabled)
})
