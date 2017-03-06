var say = require('say');

const lib = require('./lib');

const {
  spawn,
  kill,
  killall
} = lib.procM;

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
  proc._isPlaying = false;

  proc.stdout.on('data', function (data) {
    data = data.toString();

    console.log('stdout: ' + data);
    if (/\[coreaudio\]/.test(data)) {
      proc._isPlaying = true;
      console.log('isPlaying = true;');
    }
  });
  proc.stderr.on('data', function (err) {
    err = err.toString();
    // console.log('stderr: ' + err);

    if (/\[performance issue\]/.test(err)) {
      proc._isPlaying = false;
      console.log('isPlaying = false;');
    }
  });

  proc.on('close', function (code) {
    console.log('CLOSING CODE: ' + code);
    proc._isPlaying = false;
    console.log('isPlaying = false;');
    sayTime();
    startEndlesPlaying();
  });

  return proc;
}

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
