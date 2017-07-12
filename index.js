#!/usr/bin/env node

'use strict';


const program = require('commander');
const path = require('path');
const config = require('./config');
const spawnSync = require( 'child_process' ).spawnSync;
const plopFile = path.join(__dirname, 'plopfile.js');
const chalk = require('chalk');

program
  .option('-d --domains', 'Generates a domain')
  .option('-t, --container', 'Generates a container')
  .option('-p, --component', 'Generates a component')
  .parse(process.argv);

if (process.env.npm_package_reactGenerate_srcPath) {
  if (!process.env.npm_package_reactGenerate_testFileExtension) {
    console.log(chalk.keyword('orange')(`Warning: 'testFileExtension' was not specified, using '${config.testFileExtension}' by default\n`));
  }

  if (program.domains) {
    const ls = spawnSync( './node_modules/.bin/plop', ['--plopfile', plopFile, 'domain'], { stdio: 'inherit' });
  }

  if (program.container) {
    const ls = spawnSync( './node_modules/.bin/plop', ['--plopfile', plopFile, 'container'], { stdio: 'inherit' });
  }

  if (program.component) {
    const ls = spawnSync( './node_modules/.bin/plop', ['--plopfile', plopFile, 'component'], { stdio: 'inherit' });
  }
} else {
  console.log(chalk.red.bold('Error: \'srcPath\' was not specified, please add \'srcPath\' to your package.json \n'));
}
