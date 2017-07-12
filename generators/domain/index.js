/**
 * Domain container Generator
 */

const dirExists = require('../utils/dirExists');
const path = require('path');
const config = require('../../config');
const appRoot = require('app-root-path').resolve(process.env.npm_package_reactGenerate_srcPath);
const testFileExtension = process.env.npm_package_reactGenerate_testFileExtension || config.testFileExtension;

module.exports = {
  description: 'Add a domain container',
  prompts: [{
    type: 'input',
    name: 'domain',
    message: 'What should it be called?',
    default: 'App',
    validate: value => {
      if ((/.+/).test(value)) {
        return dirExists(`containers/${value}`) ? 'A domain with this name already exists' : true;
      }

      return 'The name is required';
    }
  }, {
    type: 'list',
    name: 'defaultState',
    message: 'Do you want a global reducer for this domain?',
    choices: [
      { name: 'No', value: false },
      { name: 'Yes', value: true }
    ]
  }],
  actions: data => {
    const finalPath = path.join(appRoot, `/containers/${data.domain}`);
    const actions = [];

    // Selectors
    actions.push({
      type: 'add',
      path: `${finalPath}/selectors.js`,
      templateFile: path.join(__dirname, './selectors.js.hbs'),
      abortOnFail: true
    });
    actions.push({
      type: 'add',
      path: `${finalPath}/__tests__/selectors.${testFileExtension}.js`,
      templateFile: path.join(__dirname, `./selectors.test.js.hbs`),
      abortOnFail: true
    });

    // Reducer
    actions.push({
      type: 'add',
      path: `${finalPath}/reducer.js`,
      templateFile: path.join(__dirname, './reducer.js.hbs'),
      abortOnFail: true
    });
    actions.push({
      type: 'add',
      path: `${finalPath}/__tests__/reducer.${testFileExtension}.js`,
      templateFile: path.join(__dirname, `./reducer.test.js.hbs`),
      abortOnFail: true
    });

    return actions;
  }
};
