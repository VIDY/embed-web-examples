import copy from 'rollup-plugin-copy';
import buble from 'rollup-plugin-buble';
import postcss from 'rollup-plugin-postcss';
import { uglify } from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import reload from 'rollup-plugin-livereload';
import common from 'rollup-plugin-commonjs';
import serve from 'rollup-plugin-serve';

let dest = 'public';
let { PORT=3000 } = process.env;
let isWatch = !!~process.argv[2].indexOf('w');

export default {
	input: 'src/index.js',

	output: {
		format: 'iife',
		file: `${dest}/bundle.js`
	},

	plugins: [
		resolve(),
		common(),
		postcss({
			extract: true,
			sourceMap: false,
		}),
		buble(),
		uglify(),
		copy({
			'src/index.html': `${dest}/index.html`
		})
	].concat(isWatch && [
		serve({
			open: true,
			contentBase: dest,
			port: PORT
		}),
		reload({ watch:dest })
	]).filter(Boolean)
}
