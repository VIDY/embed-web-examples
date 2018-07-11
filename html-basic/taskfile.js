const { resolve } = require('path');
const { unlinkSync } = require('fs');

let dest = 'public';
let trim = x => x.replace('public', '.');

module.exports = {
	*build(task) {
		// minify html
		yield task.source(`${dest}/*.html`).htmlmin().target(dest);
		// version assets
		yield task.source(`${dest}/**/*`).rev().revManifest({ dest, trim }).revReplace().target(dest);
		// remove originals
		yield task.source(`${dest}/{bundle,rev-*}.*`).run({}, function * (f) {
			unlinkSync(resolve(f.dir, f.base));
		});
		// copy editor file
		yield task.source('src/embed.edits.js').target(dest);
	}
}
