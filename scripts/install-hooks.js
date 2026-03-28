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
# 提交前自动同步版本号（与 package.json 一致）

echo "🔍 检查版本号同步..."
node scripts/sync-version.js

# 若同步脚本改动了下列文件，将其加入本次提交
for f in website/index.html extension/manifest.json README.md README.zh-CN.md; do
	if ! git diff --quiet -- "$f" 2>/dev/null; then
		echo "📦 自动添加 $f"
		git add -- "$f"
	fi
done

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
			// 旧版仅 stage index.html，升级为同时 stage manifest 与 README
			if (
				existing.includes('git add website/index.html') &&
				!existing.includes('README.md')
			) {
				fs.writeFileSync(HOOK_FILE, HOOK_SCRIPT);
				fs.chmodSync(HOOK_FILE, 0o755);
				console.log('✓ pre-commit hook 已升级为多文件版本同步');
				return;
			}
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
