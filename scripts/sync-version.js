#!/usr/bin/env node
/**
 * 版本同步脚本
 * 将 package.json 中的版本号同步到 website/index.html
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const PKG_PATH = path.join(ROOT_DIR, 'package.json');
const HTML_PATH = path.join(ROOT_DIR, 'website', 'index.html');

function syncVersion() {
	// 读取 package.json
	const pkg = JSON.parse(fs.readFileSync(PKG_PATH, 'utf8'));
	const version = pkg.version;

	// 读取 index.html
	let html = fs.readFileSync(HTML_PATH, 'utf8');

	// 替换版本号（匹配 <div class="stat-number">版本号</div>）
	const originalHtml = html;
	html = html.replace(
		/(<div class="stat-number">)[\d.]+(<\/div>)/,
		`$1${version}$2`
	);

	// 检查是否有变化
	if (html === originalHtml) {
		console.log(`✓ 版本号已是最新 (${version})`);
		return false;
	}

	// 写回文件
	fs.writeFileSync(HTML_PATH, html);
	console.log(`✓ 版本号已同步: ${version}`);
	return true;
}

// 如果被直接执行
if (require.main === module) {
	try {
		const changed = syncVersion();
		process.exit(changed ? 0 : 0);
	} catch (error) {
		console.error('✗ 版本同步失败:', error.message);
		process.exit(1);
	}
}

module.exports = { syncVersion };
