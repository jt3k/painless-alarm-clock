import test from 'ava';
import time from './time';

test('should convert time-string to correct format', t => {
  t.is(time.fixTimeStringFormat('23:59:0'), '23:59:00');
  t.is(time.fixTimeStringFormat('0:01:0'), '00:01:00');
  let times = 23;
  while (times--) {
    const inp = `${times}:${times}:${times}`;
    const out = `${('0' + times).slice(-2)}:${('0' + times).slice(-2)}:${('0' + times).slice(-2)}`;
    t.is(time.fixTimeStringFormat(inp), out);
  }
});

test('should convert time-string to seconds since midnight', t => {
  t.is(time.convertTimeToSecondsSinceMidnignt('23:59:0'), 86340);
  t.is(time.convertTimeToSecondsSinceMidnignt('0:0:0'), 0);
  t.is(time.convertTimeToSecondsSinceMidnignt('0:1:0'), 60);
});
