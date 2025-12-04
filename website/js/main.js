// 智能超链接识别官网 - 主脚本

document.addEventListener('DOMContentLoaded', function () {
	// 导航栏滚动效果
	initNavbarScroll()

	// 移动端菜单
	initMobileMenu()

	// FAQ 折叠效果
	initFAQ()

	// 平滑滚动
	initSmoothScroll()

	// 动画效果
	initAnimations()
})

// 导航栏滚动效果
function initNavbarScroll() {
	const navbar = document.querySelector('.navbar')
	let lastScroll = 0

	window.addEventListener('scroll', () => {
		const currentScroll = window.pageYOffset

		if (currentScroll > 100) {
			navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)'
		} else {
			navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)'
		}

		lastScroll = currentScroll
	})
}

// 移动端菜单
function initMobileMenu() {
	const toggle = document.querySelector('.mobile-menu-toggle')
	const menu = document.querySelector('.nav-menu')

	if (toggle && menu) {
		toggle.addEventListener('click', () => {
			menu.classList.toggle('active')

			// 切换图标
			const icon = toggle.querySelector('i')
			if (menu.classList.contains('active')) {
				icon.classList.remove('fa-bars')
				icon.classList.add('fa-times')
			} else {
				icon.classList.remove('fa-times')
				icon.classList.add('fa-bars')
			}
		})

		// 点击菜单项后关闭菜单
		const menuItems = menu.querySelectorAll('a')
		menuItems.forEach((item) => {
			item.addEventListener('click', () => {
				menu.classList.remove('active')
				const icon = toggle.querySelector('i')
				icon.classList.remove('fa-times')
				icon.classList.add('fa-bars')
			})
		})
	}
}

// FAQ 折叠效果
function initFAQ() {
	const faqItems = document.querySelectorAll('.faq-item')

	faqItems.forEach((item) => {
		const question = item.querySelector('.faq-question')

		question.addEventListener('click', () => {
			// 关闭其他打开的项
			faqItems.forEach((otherItem) => {
				if (
					otherItem !== item &&
					otherItem.classList.contains('active')
				) {
					otherItem.classList.remove('active')
				}
			})

			// 切换当前项
			item.classList.toggle('active')
		})
	})
}

// 平滑滚动
function initSmoothScroll() {
	const links = document.querySelectorAll('a[href^="#"]')

	links.forEach((link) => {
		link.addEventListener('click', (e) => {
			const href = link.getAttribute('href')

			// 跳过空锚点
			if (href === '#' || href === '#!') {
				return
			}

			const target = document.querySelector(href)

			if (target) {
				e.preventDefault()

				const navbarHeight =
					document.querySelector('.navbar').offsetHeight
				const targetPosition = target.offsetTop - navbarHeight

				window.scrollTo({
					top: targetPosition,
					behavior: 'smooth',
				})
			}
		})
	})
}

// 动画效果
function initAnimations() {
	// 观察器配置
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px',
	}

	// 创建观察器
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1'
				entry.target.style.transform = 'translateY(0)'
			}
		})
	}, observerOptions)

	// 观察需要动画的元素
	const animatedElements = document.querySelectorAll(
		'.feature-card, .use-case-card, .doc-card, .download-card, .step'
	)

	animatedElements.forEach((el) => {
		el.style.opacity = '0'
		el.style.transform = 'translateY(30px)'
		el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
		observer.observe(el)
	})
}

// 复制代码功能（如果需要）
function copyToClipboard(text) {
	if (navigator.clipboard) {
		navigator.clipboard.writeText(text).then(() => {
			showNotification('已复制到剪贴板！')
		})
	} else {
		// 降级方案
		const textarea = document.createElement('textarea')
		textarea.value = text
		textarea.style.position = 'fixed'
		textarea.style.opacity = '0'
		document.body.appendChild(textarea)
		textarea.select()
		document.execCommand('copy')
		document.body.removeChild(textarea)
		showNotification('已复制到剪贴板！')
	}
}

// 显示通知
function showNotification(message) {
	const notification = document.createElement('div')
	notification.className = 'notification'
	notification.textContent = message
	notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(37, 99, 235, 0.4);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `

	document.body.appendChild(notification)

	setTimeout(() => {
		notification.style.animation = 'slideOut 0.3s ease'
		setTimeout(() => {
			document.body.removeChild(notification)
		}, 300)
	}, 3000)
}

// 添加动画样式
const style = document.createElement('style')
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            gap: 15px;
        }
    }
`
document.head.appendChild(style)

// 统计功能（可选）
function trackEvent(category, action, label) {
	// 如果集成了 Google Analytics 或其他分析工具
	if (typeof gtag !== 'undefined') {
		gtag('event', action, {
			event_category: category,
			event_label: label,
		})
	}
	console.log('Event:', category, action, label)
}

// 下载按钮点击追踪
document.querySelectorAll('.btn').forEach((btn) => {
	btn.addEventListener('click', function (e) {
		const text = this.textContent.trim()
		trackEvent('Button', 'Click', text)
	})
})

// 页面加载完成
window.addEventListener('load', () => {
	console.log('✍️ 智能超链接识别官网已加载')
	trackEvent('Page', 'Load', 'Homepage')
})
