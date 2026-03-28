// 智能超链接识别 - 后台脚本

const defaultConfig = {
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
	whitelist: [],
	theme: 'auto',
	lang: 'auto',
	strictMode: true,
	excludeFileExt: true,
}

// 安装或更新时的处理
chrome.runtime.onInstalled.addListener((details) => {
	if (details.reason === 'install') {
		chrome.storage.sync.set({ config: defaultConfig }, () => {
			console.log('智能超链接识别插件已安装，默认配置已保存')
		})
		chrome.tabs.create({ url: 'welcome.html' })
	} else if (details.reason === 'update') {
		// 迁移旧配置：移除 enabled/blacklist，确保 whitelist 存在
		chrome.storage.sync.get(['config'], (result) => {
			const config = result.config
			if (!config) return

			let needsSave = false
			if ('enabled' in config) {
				delete config.enabled
				needsSave = true
			}
			if ('blacklist' in config) {
				delete config.blacklist
				needsSave = true
			}
			if (!Array.isArray(config.whitelist)) {
				config.whitelist = []
				needsSave = true
			}
			if (needsSave) {
				chrome.storage.sync.set({ config })
			}
		})
	}
})

// 监听来自 content script / popup 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'getConfig') {
		chrome.storage.sync.get(['config'], (result) => {
			sendResponse({ config: result.config })
		})
		return true
	}

	if (request.action === 'toggleWhitelist') {
		const { domain } = request
		chrome.storage.sync.get(['config'], (result) => {
			const config = result.config || { ...defaultConfig }
			const list = config.whitelist || []
			const index = list.findIndex((d) => d === domain)

			if (index >= 0) {
				list.splice(index, 1)
			} else {
				list.push(domain)
			}
			config.whitelist = list
			chrome.storage.sync.set({ config }, () => {
				sendResponse({ whitelisted: index < 0, whitelist: list })
			})
		})
		return true
	}

	if (request.action === 'updateLinkCount') {
		const tabId = sender.tab?.id
		if (tabId) {
			const count = request.count || 0
			const text = count > 0 ? String(count) : ''
			chrome.action.setBadgeText({ text, tabId })
			chrome.action.setBadgeBackgroundColor({ color: '#4CAF50', tabId })
		}
	}
})

// 根据当前 tab URL 更新徽章
function updateBadgeForTab(tabId, url) {
	if (!url) {
		chrome.action.setBadgeText({ text: '', tabId })
		return
	}
	try {
		const hostname = new URL(url).hostname
		chrome.storage.sync.get(['config'], (result) => {
			const config = result.config || defaultConfig
			const list = config.whitelist || []
			const isWhitelisted = list.some((d) => hostname.includes(d))
			if (!isWhitelisted) {
				chrome.action.setBadgeText({ text: '', tabId })
			}
		})
	} catch {
		chrome.action.setBadgeText({ text: '', tabId })
	}
}

// 标签页切换/更新时刷新徽章
chrome.tabs.onActivated.addListener(({ tabId }) => {
	chrome.tabs.get(tabId, (tab) => {
		if (tab?.url) updateBadgeForTab(tabId, tab.url)
	})
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status === 'loading' && tab.url) {
		updateBadgeForTab(tabId, tab.url)
	}
})
