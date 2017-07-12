#!/usr/bin/env node

'use strict';

const program = require('commander');
const path = require('path');
const spawnSync = require( 'child_process' ).spawnSync;
const plopFile = path.join(__dirname, 'plopfile.js');

program
  .option('-d, --domains', 'Generates a domains')
  .option('-t, --container', 'Generates a container')
  .option('-p, --component', 'Generates a component')
  .parse(process.argv);

if (program.domains) {
  const ls = spawnSync( './node_modules/.bin/plop', ['--plopfile', plopFile, 'domain'], { stdio: 'inherit' });
}

if (program.container) {
  const ls = spawnSync( './node_modules/.bin/plop', ['--plopfile', plopFile, 'container'], { stdio: 'inherit' });
}

if (program.component) {
  const ls = spawnSync( './node_modules/.bin/plop', ['--plopfile', plopFile, 'component'], { stdio: 'inherit' });
}
