import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import env from 'dotenv'
import { defineConfig } from 'rollup'
import copy from 'rollup-plugin-copy'
import del from 'rollup-plugin-delete'

/**
 * 绝对路径
 * @param {...string} p 路径
 * @returns {string} 绝对路径
 */
function absPath(...p) {
  return path.join(path.dirname(fileURLToPath(import.meta.url)), ...p)
}

/**
 * 初始化 rollup 配置
 * @param {string} projectName 项目名称
 * @returns {import('rollup').RollupOptions} rollup 配置
 */
export function initRollupConfig(projectName) {
  const outDirs = [absPath('dist', projectName)]

  env.config({ path: [absPath('.env'), absPath('.env.local')], override: true })
  const giScriptPath = process.env.OUT_DIRS
  !!giScriptPath && outDirs.push(...giScriptPath.split(',').map(p => path.join(p, projectName)))

  return defineConfig({
    input: 'src/index.ts',
    output: outDirs.map(dir => ({ dir, format: 'esm' })),
    plugins: [
      resolve(),
      typescript(),
      copy({
        targets: [
          { src: 'public/*', dest: outDirs },
          { src: 'README.md', dest: outDirs },
        ],
      }),
      { name: 'watch-public', buildStart() { this.addWatchFile('public') } },
      del({ targets: outDirs, force: true }),
    ],
  })
}
