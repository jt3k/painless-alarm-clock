#!/usr/bin/env node
'use strict';
const meow = require('meow');
const painlessAlarmClock = require('./');

const cli = meow([
  'Usage',
  '  $ painless-alarm-clock <START_TIME> <END_TIME>',
  '',
  'Example',
  '  $ painless-alarm-clock 05:00:00 10:00:00'
]);

const NOW = new Date();
const RAW_START_TIME = new Date(Number(NOW) + 3000).toLocaleTimeString();
const RAW_END_TIME = new Date(Number(NOW) + 30000).toLocaleTimeString();

console.log(painlessAlarmClock(cli.input[0] || RAW_START_TIME, cli.input[1] || RAW_END_TIME));
