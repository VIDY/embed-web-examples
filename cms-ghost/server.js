/**
 * This example server code comes from the "Using Ghost as an npm module"
 * documentation page: https://docs.ghost.org/docs/using-ghost-as-an-npm-module
 */
const ghost = require('ghost');

ghost().then(app => {
  app.start();
});
