import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';

const production = !process.env.ROLLUP_WATCH;

export default [{
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'chatEmbed',
		file: 'dist/index.iife.js'
	},
	plugins: [
		svelte({
			dev: !production,
			preprocess: sveltePreprocess(),
		}),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		typescript({
			sourceMap: true,
			inlineSources: !production
		}),
		production && terser()
	],
}, {
	input: 'src/ChatController.svelte',
	output: {
		sourcemap: true,
		file: "dist/index.js",
		name: 'ChatController',
		format: "umd",
	},
	plugins: [
		svelte({
			dev: !production,
			preprocess: sveltePreprocess(),
		}),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		typescript({
			sourceMap: true,
			inlineSources: !production
		}),
	]
}]
