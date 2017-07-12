#!/usr/bin/env node

'use strict';

var program = require('commander');
var spawnSync = require( 'child_process' ).spawnSync;

program
  .option('-d, --domains', 'Generates a domains')
  .option('-t, --container', 'Generates a container')
  .option('-p, --component', 'Generates a component')
  .parse(process.argv);

if (program.domains) {
  var ls = spawnSync( 'npm', ['run', 'plop', 'domain'], { stdio: 'inherit' });
}

if (program.container) {
  var ls = spawnSync( 'npm', ['run', 'plop', 'container'], { stdio: 'inherit' });
}

if (program.component) {
  var ls = spawnSync( 'npm', ['run', 'plop', 'component'], { stdio: 'inherit' });
}
