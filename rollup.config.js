import { nodeResolve } from '@rollup/plugin-node-resolve'
import css from 'rollup-plugin-import-css'
import svgSprite from 'rollup-plugin-svg-sprite'

export default {
	input: "src/app.js",
	output: {
		dir: "dist",
		format: "iife"
	},
	plugins: [
		css({
			output: 'styles.css'
		}),
		nodeResolve(),
		svgSprite({
			outputFolder: './dist/svg',
			minify: true
		}),
	]
}