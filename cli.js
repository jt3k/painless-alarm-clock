#!/usr/bin/env node
'use strict';
var meow = require('meow');
var painlessAlarmClock = require('./');

var cli = meow([
  'Usage',
  '  $ painless-alarm-clock <START_TIME> <END_TIME>',
  '',
  'Example',
  '  $ painless-alarm-clock 05:00:00 10:00:00'
]);

console.log(painlessAlarmClock(cli.input[0], cli.input[1]));
