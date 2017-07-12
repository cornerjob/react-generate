/**
 * Component Generator
 */

'use strict';

const dirExists = require('../utils/dirExists');
const path = require('path');
const config = require('../../config');
const appRoot = require('app-root-path').resolve(process.env.npm_package_reactGenerate_srcPath);
const testFileExtension = process.env.npm_package_reactGenerate_testFileExtension || config.testFileExtension;

module.exports = {
  description: 'Add an unconnected component',
  prompts: [{
    type: 'list',
    name: 'type',
    message: 'Select the type of component',
    default: 'Stateless Function',
    choices: () => ['Stateless Function', 'ES6 Class (Pure)', 'ES6 Class', 'Styled component']
  }, {
    type: 'input',
    name: 'path',
    message: 'Where do you want the component?',
    default: 'components',
    validate: value => {
      if ((/.+/).test(value)) {
        return !dirExists(value) ? 'The path doesn\'t exists' : true;
      }

      return 'The path is required';
    }
  }, {
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Button',
    validate: (value, { compoentPath }) => {
      if ((/.+/).test(value)) {
        return dirExists(`${compoentPath}/${value}`) || dirExists(`${compoentPath}/${value}.js`) ? 'A component with this name already exists' : true;
      }

      return 'The name is required';
    }
  }, {
    type: 'confirm',
    name: 'componentAsDir',
    message: 'Do you want to create the component as a directory? (Button/index.js)'
  }],
  actions: data => {
    const finalPath = path.join(appRoot, data.path);
    let componentTemplate;

    switch (data.type) {
      case 'ES6 Class': {
        componentTemplate = path.join(__dirname, './es6.js.hbs');
        break;
      }
      case 'ES6 Class (Pure)': {
        componentTemplate = path.join(__dirname, './es6.pure.js.hbs');
        break;
      }
      case 'Stateless Function': {
        componentTemplate = path.join(__dirname, './stateless.js.hbs');
        break;
      }
      case 'Styled component': {
        componentTemplate = path.join(__dirname, './styled.js.hbs');
        break;
      }
      default: {
        componentTemplate = path.join(__dirname, './es6.js.hbs');
      }
    }

    const componentPath = data.componentAsDir
      ? `${finalPath}/{{properCase name}}/index.js`
      : `${finalPath}/{{properCase name}}.js`;

    const actions = [{
      type: 'add',
      path: componentPath,
      templateFile: componentTemplate,
      abortOnFail: true
    }];

    let componentTestTemplate;
    const pathTest = data.componentAsDir
      ? `${finalPath}/{{properCase name}}/__tests__/index.${testFileExtension}.js`
      : `${finalPath}/__tests__/{{properCase name}}.${testFileExtension}.js`;

    switch (data.type) {
      case 'Styled component': {
        componentTestTemplate = path.join(__dirname, './testStyled.js.hbs');
        break;
      }
      default: {
        componentTestTemplate = path.join(__dirname, './test.js.hbs');
      }
    }

    actions.push({
      type: 'add',
      path: pathTest,
      templateFile: componentTestTemplate,
      abortOnFail: true
    });

    return actions;
  }
};
