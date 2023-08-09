import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
// import terser from '@rollup/plugin-terser'
// import prettier from 'rollup-plugin-prettier'
import path from 'path'
import eslint from '@rollup/plugin-eslint'
import pkg from './package.json' assert { type: 'json' }

console.log(process.env.NODE_ENV, 'env')

export default defineConfig({
	input: './src/main.ts',
	output: [
		{
			name: 'Moniter',
			file: pkg.browser,
			format: 'umd',
			globals: {
				'ua-parser-js': 'UAParser',
			},
		},
		{ file: pkg.main, format: 'cjs' },
		{ file: pkg.module, format: 'es' },
	],
	external: ['ua-parser-js'],
	plugins: [
		alias({
			entries: [
				{ find: '@', replacement: path.resolve(process.cwd(), 'src') },
				{
					find: 'types',
					replacement: path.resolve(process.cwd(), 'types/index.d.ts'),
				},
			],
		}),
		// terser(),
		json(),
		typescript(),
		nodeResolve({
			mainFields: ['browser'],
		}), // so Rollup can find `ms`
		commonjs(), // so Rollup can convert `ms` to an ES module
		// prettier(),
		eslint(),
	],
})
