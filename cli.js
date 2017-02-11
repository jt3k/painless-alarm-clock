#!/usr/bin/env node
'use strict';
var meow = require('meow');
var painlessAlarmClock = require('./');

var cli = meow([
	'Usage',
	'  $ painless-alarm-clock [input]',
	'',
	'Options',
	'  --foo  Lorem ipsum. [Default: false]',
	'',
	'Examples',
	'  $ painless-alarm-clock',
	'  unicorns & rainbows',
	'  $ painless-alarm-clock ponies',
	'  ponies & rainbows'
]);

console.log(painlessAlarmClock(cli.input[0] || 'unicorns'));
