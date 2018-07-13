const config = require('ghost/core/server/config');
const version = require('ghost/core/server/utils/ghost-version');

require('ghost/core/server/overrides');

module.exports = {
	currentVersion: version.safe,
	database: config.get('database'),
	migrationPath: config.get('paths:migrationPath')
}
