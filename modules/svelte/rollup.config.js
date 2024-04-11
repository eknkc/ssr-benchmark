import svelte from 'rollup-plugin-svelte';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
	input: 'src/index.js',
	output: {
		file: 'build/handler.js',
		format: 'esm'
	},
	plugins: [
		nodeResolve(),
		svelte({
			compilerOptions: {
				generate: 'server'
			}
		})
	]
};
