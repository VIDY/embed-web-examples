const rollup = require('rollup');
const { uglify } = require('rollup-plugin-uglify');

const dest = 'public';
const { PORT=3000 } = process.env;
const trim = x => x.replace('public', '.');

let isWatch = false;
let input = 'src/index.js';

let watch = {
	chokidar: true
};

let output = {
	format: 'iife',
	file: `${dest}/bundle.js`
};

let plugins = [
	require('rollup-plugin-buble')(),
	require('rollup-plugin-node-resolve')(),
	require('rollup-plugin-commonjs')(),
];

module.exports = {
	*style(task) {
		// process stylus & concat with Vidy styles
		yield task.source('src/index.styl').stylus({ compress:true }).target('src');
		yield task.source([
			'src/index.css',
			'node_modules/@vidy/embed/dist/embed.css'
		]).concat('bundle.css').target(dest);
		yield task.clear('src/index.css'); // generated
	},

	*script(task) {
		if (isWatch) {
			plugins.push(
				require('rollup-plugin-serve')({ open:true, contentBase:dest, port:PORT }),
				require('rollup-plugin-livereload')({ watch:dest })
			);
			rollup.watch({ input, plugins, output, watch });
		} else {
			plugins.push(uglify());
			let bun = yield rollup.rollup({ input, plugins });
			yield bun.write(output);
		}
	},

	*html(task) {
		yield task.source('src/index.html').htmlmin().target(dest);
	},

	*build(task) {
		yield task.clear(dest);
		yield task.serial(['html', 'script', 'style']);
	},

	*release(task) {
		// version assets
		yield task.source(`${dest}/*.*`).rev().revManifest({ dest, trim }).revReplace().target(dest);
		// remove originals
		yield task.clear(`${dest}/{bundle,rev-*}.*`);
		// copy editor file
		yield task.source('node_modules/@vidy/embed/dist/embed.edits.js').target(dest);
	},

	*watch(task) {
		isWatch = true;
		yield task.start('build');
		yield task.watch('src/*.html', 'html');
		yield task.watch('src/*.styl', 'style');
	}
}
