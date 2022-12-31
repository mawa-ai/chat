import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';

const production = !process.env.ROLLUP_WATCH;

/** @type {import('rollup').RollupOptions} */
export default {
	input: 'src/index.ts',
	output: [{
		sourcemap: true,
		format: 'iife',
		name: 'chatEmbed',
		file: 'dist/index.iife.js'
	}, {
		sourcemap: true,
		file: 'dist/index.js',
		format: 'esm',
	}],
	plugins: [
		typescript({
			sourceMap: true,
			inlineSources: !production
		}),
		svelte({
			preprocess: sveltePreprocess(),
			emitCss: false
		}),
		resolve({
			browser: true,
			dedupe: ['svelte']
		})
	],
}