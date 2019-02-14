const vol = require('vol');
const BezierEasing = require('bezier-easing');

const {
  bus,
  calculateSegmentsLengthRatio,
  convertTimeToSecondsSinceMidnignt
} = require('./lib');

const {
  startEndlesPlaying,
  stopEndlessPlaying,
  sayTime
} = require('./player');

const easing = new BezierEasing(1.0, 1.0, 1.0, 0.3);

let curVolumeLevel = 0;
let lastTimeSay = 0;
const volSayCorrection = 1;

bus.on('UPDATE', ({alarmStatus}) => {
  const isAlarm = alarmStatus !== false;
  if (isAlarm) {
    startEndlesPlaying();
  } else {
    stopEndlessPlaying();
  }

  console.log('isAlarm', isAlarm);

  const volumeLevel = Number(easing(alarmStatus).toFixed(3)) * volSayCorrection;
  if (alarmStatus !== false && curVolumeLevel !== volumeLevel) {
    console.log({
      volumeLevel: volumeLevel.toFixed(4),
      alarmStatus: alarmStatus.toFixed(4)
    });

    vol.set(volumeLevel, () => {});
    curVolumeLevel = volumeLevel;

    // /////////////////////////////////////
    // in half phase say time each 8 min //
    // /////////////////////////////////////
    const sayRate = 8 * 60 * 1000;  // 8 min
    const isTimeToSayTime = alarmStatus >= 0.5;
    // one say per 8 min
    const allowedToSay = (Date.now() - lastTimeSay) > sayRate;
    if (allowedToSay && isTimeToSayTime) {
      // setTimeout();
      lastTimeSay = Date.now();
      sayTime();
    }
  }
});

function painlessAlarmClock(START, END) {
  setInterval(() => {
    const NOW = (new Date()).toLocaleTimeString();
    const startInSec = convertTimeToSecondsSinceMidnignt(START);
    const nowInSec = convertTimeToSecondsSinceMidnignt(NOW);
    const endInSec = convertTimeToSecondsSinceMidnignt(END);

    const alarmStatus = calculateSegmentsLengthRatio(startInSec, nowInSec, endInSec);

    bus.emit('UPDATE', {
      alarmStatus
    });
  }, 1000);
}

module.exports = painlessAlarmClock;
