// 欢迎页面脚本
;(function () {
	'use strict'

	// 初始化国际化
	if (typeof i18n !== 'undefined') {
		i18n.init()
	}

	// 绑定按钮事件
	document.addEventListener('DOMContentLoaded', function () {
		const startBtn = document.getElementById('startBtn')
		const settingsBtn = document.getElementById('settingsBtn')

		if (startBtn) {
			startBtn.addEventListener('click', function () {
				window.close()
			})
		}

		if (settingsBtn) {
			settingsBtn.addEventListener('click', function () {
				chrome.runtime.openOptionsPage()
			})
		}
	})
})()
