const vol = require('vol');
const BezierEasing = require('bezier-easing');

const {
  bus,
  calculateSegmentsLengthRatio,
  convertTimeToSecondsSinceMidnignt
} = require('./lib');

const player = require('./player');

const NOW = new Date();
const RAW_START_TIME = new Date(Number(NOW) + 1000).toLocaleTimeString();
const RAW_END_TIME = new Date(Number(NOW) + 60000).toLocaleTimeString();

const easing = new BezierEasing(1.00, 0.00, 0.50, 1.00);

let curVolumeLevel = 0;
bus.on('UPDATE', ({alarmStatus}) => {
  const volumeLevel = Number(easing(alarmStatus).toFixed(3));
  if (alarmStatus && curVolumeLevel !== volumeLevel) {
    console.log({
      volumeLevel: volumeLevel.toFixed(4),
      alarmStatus: alarmStatus.toFixed(4)
    });

    vol.set(volumeLevel, () => {});
    curVolumeLevel = volumeLevel;
  }
});

function painlessAlarmClock(START = RAW_START_TIME, END = RAW_END_TIME) {
  player();
  console.log('arguments', arguments);
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
