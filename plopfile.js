/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const fs = require('fs');
const path = require('path');
const componentGenerator = require('./generators/component/index.js');
const containerGenerator = require('./generators/container/index.js');
const domainGenerator = require('./generators/domain/index.js');
const appRoot = require('app-root-path').resolve(process.env.npm_package_reactGenerate_srcPath);

module.exports = plop => {
  plop.setGenerator('domain', domainGenerator);
  plop.setGenerator('container', containerGenerator);
  plop.setGenerator('component', componentGenerator);
  plop.addHelper('directory', comp => {
    try {
      fs.accessSync(path.join(appRoot, `/containers/${comp}`), fs.F_OK);
      return `containers/${comp}`;
    } catch (e) {
      return `components/${comp}`;
    }
  });
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
};
