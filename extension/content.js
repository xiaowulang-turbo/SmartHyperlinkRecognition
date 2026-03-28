// 智能超链接识别 - 内容脚本
;(function () {
	'use strict'

	// 默认配置
	let config = {
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
		urlPattern: /(?:https?:\/\/|ftp:\/\/|www\.)[a-zA-Z0-9][-a-zA-Z0-9]*(?:\.[a-zA-Z0-9][-a-zA-Z0-9]*)+\.[a-zA-Z]{2,}(?::\d+)?(?:\/[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)?/gi,
		emailPattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
		whitelist: [],
	}

	let convertedCount = 0

	// URL验证过滤器 - 排除误匹配
	const URL_VALIDATORS = {
		// 排除纯数字IP-like (13804.46)
		isNumericOnly: (url) => /^\d+(\.\d+)+$/.test(url),

		// 排除版本号模式 (1.2.3.4, 1.0.0.290)
		isVersionNumber: (url) => /^\d+(\.\d+){2,}$/.test(url),

		// 排除常见文件扩展名（无路径时）
		isFileExtension: (url) => {
			const fileExtPattern = /^(?!.*\/)[^\s]+\.(js|css|json|xml|yaml|yml|md|txt|log|min|map|ts|tsx|jsx|vue|py|java|cpp|c|h|go|rs|php|rb)$/i
			return fileExtPattern.test(url)
		},

		// 排除纯数字统计值 (如 13804.46/100000 中的 13804.46)
		isNumericStat: (url) => /^\d+\.\d{1,2}$/.test(url) && parseFloat(url) > 1000,
	}

	// 验证URL是否有效
	function isValidUrl(url) {
		// 如果禁用了严格模式，只进行基本验证
		if (config.strictMode === false) {
			return !URL_VALIDATORS.isNumericOnly(url)
		}

		// 快速排除明显无效的匹配
		if (URL_VALIDATORS.isNumericOnly(url)) return false
		if (URL_VALIDATORS.isVersionNumber(url)) return false
		if (URL_VALIDATORS.isNumericStat(url)) return false

		// 根据配置决定是否排除文件扩展名
		if (config.excludeFileExt !== false && URL_VALIDATORS.isFileExtension(url)) {
			return false
		}

		// 确保至少包含一个字母（排除纯数字IP被误识别）
		if (!/[a-zA-Z]/.test(url)) return false

		return true
	}

	// 标记已处理的节点
	const PROCESSED_ATTR = 'data-link-converted'

	// 从存储加载配置
	function loadConfig() {
		chrome.storage.sync.get(['config'], function (result) {
			if (result.config) {
				config = { ...config, ...result.config }
			}
			if (isWhitelisted()) {
				init()
			}
		})
	}

	// 检查当前网站是否在白名单中
	function isWhitelisted() {
		const hostname = window.location.hostname
		return (config.whitelist || []).some((domain) => hostname.includes(domain))
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
			const matchedText = match[0]
			// 验证URL有效性，排除误匹配
			if (isValidUrl(matchedText)) {
				matches.push({
					index: match.index,
					length: match[0].length,
					text: matchedText,
					type: 'url',
				})
			}
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

		if (uniqueMatches.length > 0) {
			convertedCount += uniqueMatches.length
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
		if (request.action === 'getStatus') {
			sendResponse({ active: isWhitelisted() })
		} else if (request.action === 'getLinkCount') {
			sendResponse({ count: convertedCount })
		}
	})

	// 启动
	loadConfig()
})()
