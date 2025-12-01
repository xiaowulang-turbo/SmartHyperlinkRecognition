// 智能超链接识别 - 内容脚本
;(function () {
	'use strict'

	// 默认配置
	let config = {
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
		urlPattern:
			/(?:(?:https?|ftp):\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/gi,
		emailPattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
		blacklist: [],
	}

	// 标记已处理的节点
	const PROCESSED_ATTR = 'data-link-converted'

	// 从存储加载配置
	function loadConfig() {
		chrome.storage.sync.get(['config'], function (result) {
			if (result.config) {
				config = { ...config, ...result.config }
			}
			if (config.enabled && !isBlacklisted()) {
				init()
			}
		})
	}

	// 检查当前网站是否在黑名单中
	function isBlacklisted() {
		const hostname = window.location.hostname
		return config.blacklist.some((domain) => hostname.includes(domain))
	}

	// 初始化
	function init() {
		// 处理现有内容
		processNode(document.body)

		// 监听动态内容变化
		observeDOMChanges()
	}

	// 处理节点
	function processNode(node) {
		if (!node || node.nodeType !== Node.ELEMENT_NODE) {
			return
		}

		// 跳过已处理或排除的标签
		if (
			node.hasAttribute(PROCESSED_ATTR) ||
			config.excludedTags.includes(node.tagName)
		) {
			return
		}

		// 标记为已处理
		node.setAttribute(PROCESSED_ATTR, 'true')

		// 遍历子节点
		const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
			acceptNode: function (node) {
				// 检查父节点是否应该被排除
				let parent = node.parentElement
				while (parent) {
					if (config.excludedTags.includes(parent.tagName)) {
						return NodeFilter.FILTER_REJECT
					}
					parent = parent.parentElement
				}
				return NodeFilter.FILTER_ACCEPT
			},
		})

		const textNodes = []
		let currentNode
		while ((currentNode = walker.nextNode())) {
			textNodes.push(currentNode)
		}

		// 处理文本节点
		textNodes.forEach((textNode) => {
			convertTextToLinks(textNode)
		})
	}

	// 将文本转换为链接
	function convertTextToLinks(textNode) {
		const text = textNode.textContent
		if (!text || !text.trim()) {
			return
		}

		// 检查是否包含 URL 或邮箱
		const hasUrl = config.urlPattern.test(text)
		const hasEmail = config.emailPattern.test(text)

		if (!hasUrl && !hasEmail) {
			return
		}

		// 重置正则表达式
		config.urlPattern.lastIndex = 0
		config.emailPattern.lastIndex = 0

		const fragment = document.createDocumentFragment()
		let lastIndex = 0
		const matches = []

		// 收集所有匹配
		let match
		const urlRegex = new RegExp(config.urlPattern.source, 'gi')
		while ((match = urlRegex.exec(text)) !== null) {
			matches.push({
				index: match.index,
				length: match[0].length,
				text: match[0],
				type: 'url',
			})
		}

		const emailRegex = new RegExp(config.emailPattern.source, 'g')
		while ((match = emailRegex.exec(text)) !== null) {
			matches.push({
				index: match.index,
				length: match[0].length,
				text: match[0],
				type: 'email',
			})
		}

		// 按位置排序并去重
		matches.sort((a, b) => a.index - b.index)
		const uniqueMatches = []
		let lastEnd = 0
		for (const match of matches) {
			if (match.index >= lastEnd) {
				uniqueMatches.push(match)
				lastEnd = match.index + match.length
			}
		}

		// 构建新的 DOM 结构
		uniqueMatches.forEach((match) => {
			// 添加匹配前的文本
			if (match.index > lastIndex) {
				fragment.appendChild(
					document.createTextNode(
						text.substring(lastIndex, match.index)
					)
				)
			}

			// 创建链接
			const link = document.createElement('a')
			link.textContent = match.text

			if (match.type === 'email') {
				link.href = 'mailto:' + match.text
			} else {
				// 处理 URL
				let href = match.text
				if (!/^https?:\/\//i.test(href)) {
					href = 'http://' + href
				}
				link.href = href
			}

			if (config.openInNewTab) {
				link.target = '_blank'
				link.rel = 'noopener noreferrer'
			}

			link.style.color = '#0066cc'
			link.style.textDecoration = 'underline'
			link.setAttribute('data-auto-link', 'true')

			fragment.appendChild(link)
			lastIndex = match.index + match.length
		})

		// 添加剩余文本
		if (lastIndex < text.length) {
			fragment.appendChild(
				document.createTextNode(text.substring(lastIndex))
			)
		}

		// 只有在实际创建了链接时才替换节点
		if (uniqueMatches.length > 0) {
			textNode.parentNode.replaceChild(fragment, textNode)
		}
	}

	// 监听 DOM 变化
	function observeDOMChanges() {
		const observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				mutation.addedNodes.forEach(function (node) {
					if (node.nodeType === Node.ELEMENT_NODE) {
						processNode(node)
					}
				})
			})
		})

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		})
	}

	// 监听来自 popup 的消息
	chrome.runtime.onMessage.addListener(function (
		request,
		sender,
		sendResponse
	) {
		if (request.action === 'toggleEnabled') {
			config.enabled = request.enabled
			if (config.enabled) {
				location.reload()
			}
			sendResponse({ success: true })
		} else if (request.action === 'getStatus') {
			sendResponse({ enabled: config.enabled })
		}
	})

	// 启动
	loadConfig()
})()
