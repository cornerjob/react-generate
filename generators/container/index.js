/**
 * Container Generator
 */

const dirExists = require('../utils/dirExists');
const path = require('path');
const config = require('../../config');
const appRoot = require('app-root-path').resolve(process.env.npm_package_reactGenerate_srcPath);
const testFileExtension = process.env.npm_package_reactGenerate_testFileExtension || config.testFileExtension;

module.exports = {
  description: 'Add a container component',
  prompts: [{
    type: 'input',
    name: 'domain',
    message: 'What is the domain for this container?',
    default: 'App',
    validate: value => {
      if ((/.+/).test(value)) {
        return !dirExists(`containers/${value}`) ? 'The domain doesn\'t exists' : true;
      }

      return 'The domain is required';
    }
  }, {
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Form',
    validate: (value, { domain }) => {
      if ((/.+/).test(value)) {
        return dirExists(`containers/${domain}/${value}`) ? `A container with this name already exists in ${domain}` : true;
      }

      return 'The name is required';
    }
  }, {
    type: 'list',
    name: 'component',
    message: 'Select a base component:',
    default: 'PureComponent',
    choices: () => ['PureComponent', 'Component']
  }, {
    type: 'confirm',
    name: 'wantActionsAndReducer',
    default: true,
    message: 'Do you want an actions/constants/selectors/reducer tuple for this container?'
  }],
  actions: data => {
    const finalPath = path.join(appRoot, `/containers/${data.domain}/`);

    const actions = [{
      type: 'add',
      path: `${finalPath}{{properCase name}}/index.js`,
      templateFile: path.join(__dirname, './index.js.hbs'),
      abortOnFail: true
    }, {
      type: 'add',
      path: `${finalPath}{{properCase name}}/__tests__/index.${testFileExtension}.js`,
      templateFile: path.join(__dirname, './test.js.hbs'),
      abortOnFail: true
    }];

    // If they want actions and a reducer, generate actions.js, constants.js,
    // reducer.js and the corresponding tests for actions and the reducer
    if (data.wantActionsAndReducer) {
      // Actions
      actions.push({
        type: 'add',
        path: `${finalPath}{{properCase name}}/actions.js`,
        templateFile: path.join(__dirname, './actions.js.hbs'),
        abortOnFail: true
      });
      actions.push({
        type: 'add',
        path: `${finalPath}{{properCase name}}/__tests__/actions.${testFileExtension}.js`,
        templateFile: path.join(__dirname, './actions.test.js.hbs'),
        abortOnFail: true
      });

      // Constants
      actions.push({
        type: 'add',
        path: `${finalPath}{{properCase name}}/constants.js`,
        templateFile: path.join(__dirname, './constants.js.hbs'),
        abortOnFail: true
      });

      // Selectors
      actions.push({
        type: 'add',
        path: `${finalPath}{{properCase name}}/selectors.js`,
        templateFile: path.join(__dirname, './selectors.js.hbs'),
        abortOnFail: true
      });
      actions.push({
        type: 'add',
        path: `${finalPath}{{properCase name}}/__tests__/selectors.${testFileExtension}.js`,
        templateFile: path.join(__dirname, './selectors.test.js.hbs'),
        abortOnFail: true
      });

      // Reducer
      actions.push({
        type: 'add',
        path: `${finalPath}{{properCase name}}/reducer.js`,
        templateFile: path.join(__dirname, './reducer.js.hbs'),
        abortOnFail: true
      });
      actions.push({
        type: 'add',
        path: `${finalPath}{{properCase name}}/__tests__/reducer.${testFileExtension}.js`,
        templateFile: path.join(__dirname, './reducer.test.js.hbs'),
        abortOnFail: true
      });
    }

    return actions;
  }
};
