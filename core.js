const vol = require('vol');
const BezierEasing = require('bezier-easing');

const {
  bus,
  calculateSegmentsLengthRatio,
  convertTimeToSecondsSinceMidnignt
} = require('./lib');

const NOW = new Date();
const RAW_START_TIME = new Date(Number(NOW) + 1000).toLocaleTimeString();
const RAW_END_TIME = new Date(Number(NOW) + 60000).toLocaleTimeString();

const easing = new BezierEasing(1.00, 0.00, 0.50, 1.00);

bus.on('UPDATE', console.log.bind(console));

bus.on('UPDATE', ({alarmStatus}) => {
  const volumeLevel = easing(alarmStatus);
  if (alarmStatus) {
    vol.set(volumeLevel, () => {});
  }
});

setInterval(() => {
  const now = (new Date()).toLocaleTimeString();

  const startInSec = convertTimeToSecondsSinceMidnignt(RAW_START_TIME); // A
  const nowInSec = convertTimeToSecondsSinceMidnignt(now); // B
  const endInSec = convertTimeToSecondsSinceMidnignt(RAW_END_TIME); // C

  const alarmStatus = calculateSegmentsLengthRatio(startInSec, nowInSec, endInSec);

  bus.emit('UPDATE', {
    alarmStatus
  });
}, 500);
