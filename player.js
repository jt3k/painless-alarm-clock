var say = require('say');

const lib = require('./lib');

const {
  procM: {
    spawn,
    kill,
    killall
  },
  bus
} = lib;

function play(playlist) {
  const args = [
    '-playlist',
    // 'cliqhop32.pls',
    playlist,
    '-quiet'
  ];

  return spawn('mplayer', args);
}

function startEndlesPlaying() {
  let proc = play('http://somafm.com/beatblender32.pls');
  bus.emit('PLAYER', 'pending');

  proc.stdout.on('data', function (data) {
    data = data.toString();

    // console.log('stdout: ' + data);
    if (/\[coreaudio\]/.test(data)) {
      bus.emit('PLAYER', 'playing');
    }
  });
  proc.stderr.on('data', function (err) {
    err = err.toString();
    // console.log('stderr: ' + err);

    if (/\[performance issue\]/.test(err)) {
      bus.emit('PLAYER', 'stoped');
    }
  });

  proc.on('close', function (code) {
    console.log('CLOSING CODE: ' + code);
    bus.emit('PLAYER', 'stoped');
    sayTime();
    proc = startEndlesPlaying();
  });

  return proc;
}

bus.on('PLAYER', function () {
  console.log('arguments', arguments);
});

// startEndlesPlaying();

// play('http://somafm.com/cliqhop32.pls');
// play('http://somafm.com/groovesalad32.pls');

const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf-8');

function sayTime() {
  say.stop();
  const timeString = (new Date()).toLocaleTimeString().replace(/\d+$/, '');
  say.speak(timeString, 'Milena');
}

stdin.on('data', key => {
  // say time
  if (key === 't') {
    sayTime();
  }

  if (key === '\u0003' || key === '\u001b' || key === 'q') {
    // kill all child processes
    killall();

    // close program
    kill(process.pid);
  }
});

module.exports = startEndlesPlaying;
// module.exports = function (str, opts) {
// 	if (typeof str !== 'string') {
// 		throw new TypeError('Expected a string');
// 	}

// 	opts = opts || {};

// 	return str + ' & ' + (opts.postfix || 'rainbows');
// };
