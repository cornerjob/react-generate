/**
 * dirExists
 *
 * Check whether the given path exists
 */

const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path').resolve(process.env.npm_package_reactGenerate_srcPath);

function dirExists(comp) {
  return !!fs.existsSync(path.join(appRoot, `${comp}`));
}

module.exports = dirExists;
