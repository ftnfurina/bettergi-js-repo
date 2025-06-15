import path from 'node:path'
import process from 'node:process'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import env from 'dotenv'
import { defineConfig } from 'rollup'
import copy from 'rollup-plugin-copy'
import del from 'rollup-plugin-delete'

const outDir = ['../../dist/JoinFriendsWorld']

env.config({ path: ['../../.env', '../../.env.local'], override: true })
const giScriptPath = process.env.GI_SCRIPT_PATH
!!giScriptPath && outDir.push(path.join(giScriptPath, 'JoinFriendsWorld'))

export default defineConfig({
  input: 'src/index.ts',
  output: outDir.map(dir => ({ dir, format: 'esm' })),
  plugins: [
    resolve(),
    typescript(),
    copy({
      targets: [
        { src: 'public/*', dest: outDir },
        { src: 'README.md', dest: outDir },
      ],
    }),
    { name: 'watch-public', buildStart() { this.addWatchFile('public') } },
    del({ targets: outDir, force: true }),
  ],
})
