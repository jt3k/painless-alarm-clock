function convertTimeToSecondsSinceMidnignt(time) {
  const [h, m, s] = time.split(':');
  return ((Number(h) + Number(m) / 60) * 60 * 60) + Number(s);
}

function _padZeroAtLeft(num) {
  return ('0' + num).slice(-2);
}

function fixTimeStringFormat(string) {
  return string.split(':').map(_padZeroAtLeft).join(':');
}

module.exports = {
  convertTimeToSecondsSinceMidnignt,
  fixTimeStringFormat
};
