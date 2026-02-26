#!/usr/bin/env node
/**
 * Git Hook 安装脚本
 * 将 pre-commit hook 安装到 .git/hooks/ 目录
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const HOOKS_DIR = path.join(ROOT_DIR, '.git', 'hooks');
const HOOK_FILE = path.join(HOOKS_DIR, 'pre-commit');

const HOOK_SCRIPT = `#!/bin/sh
# 由 scripts/install-hooks.js 自动生成的 pre-commit hook
# 提交前自动同步版本号

echo "🔍 检查版本号同步..."
node scripts/sync-version.js

# 如果 sync-version.js 修改了 index.html，需要重新添加到暂存区
if git diff --name-only | grep -q "website/index.html"; then
	echo "📦 自动添加更新后的 index.html 到提交"
	git add website/index.html
fi

echo "✓ 版本号检查完成"
`;

function installHook() {
	// 检查是否在 git 仓库中
	if (!fs.existsSync(path.join(ROOT_DIR, '.git'))) {
		console.log('⚠ 不是 Git 仓库，跳过 hook 安装');
		return;
	}

	// 确保 hooks 目录存在
	if (!fs.existsSync(HOOKS_DIR)) {
		fs.mkdirSync(HOOKS_DIR, { recursive: true });
	}

	// 检查是否已有 pre-commit hook
	if (fs.existsSync(HOOK_FILE)) {
		const existing = fs.readFileSync(HOOK_FILE, 'utf8');
		if (existing.includes('sync-version.js')) {
			console.log('✓ pre-commit hook 已存在且已配置');
			return;
		}
		console.log('⚠ 已存在其他 pre-commit hook，请手动合并以下代码：');
		console.log('---');
		console.log(HOOK_SCRIPT);
		console.log('---');
		return;
	}

	// 写入 hook
	fs.writeFileSync(HOOK_FILE, HOOK_SCRIPT);
	fs.chmodSync(HOOK_FILE, 0o755);
	console.log('✓ pre-commit hook 安装成功');
}

installHook();
