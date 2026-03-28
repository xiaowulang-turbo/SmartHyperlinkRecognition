;(function () {
	const RAW_URL =
		'https://raw.githubusercontent.com/xiaowulang-turbo/SmartHyperlinkRecognition/main/CHANGELOG.md'
	const GITHUB_BLOB =
		'https://github.com/xiaowulang-turbo/SmartHyperlinkRecognition/blob/main/CHANGELOG.md'

	function loadChangelog() {
		const loading = document.getElementById('changelog-loading')
		const body = document.getElementById('changelog-body')
		const err = document.getElementById('changelog-error')
		if (!body || !loading) return

		fetch(RAW_URL)
			.then(function (r) {
				if (!r.ok) throw new Error('HTTP ' + r.status)
				return r.text()
			})
			.then(function (md) {
				if (typeof marked === 'undefined') throw new Error('marked missing')
				body.innerHTML = marked.parse(md)
				loading.style.display = 'none'
				body.style.display = 'block'
			})
			.catch(function () {
				loading.style.display = 'none'
				if (err) {
					err.style.display = 'block'
					const msg = err.querySelector('[data-changelog-error-msg]')
					if (msg && typeof i18n !== 'undefined' && i18n.t) {
						msg.textContent = i18n.t('changelog.loadError')
					}
				}
			})
	}

	const sourceLink = document.getElementById('changelog-source-link')
	if (sourceLink) sourceLink.href = GITHUB_BLOB

	if (document.getElementById('changelog-body')) {
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', loadChangelog)
		} else {
			loadChangelog()
		}
	}
})()
