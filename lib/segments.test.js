import test from 'ava';
import segments from './segments';

test('should calculate ratio of time segments', t => {
  t.is(segments.calculateSegmentsLengthRatio(0, 99, 100), 0.99);
  t.is(segments.calculateSegmentsLengthRatio(21600, 28800, 7200), 0.1);
  t.is(segments.calculateSegmentsLengthRatio(86400, 0, 43200), 0);

  let times = 100;
  while (--times) {
    t.is(segments.calculateSegmentsLengthRatio(0, times, 100), times / 100);
    // console.log('times / 100', times / 100);
  }

  // exceptions
  t.is(segments.calculateSegmentsLengthRatio(0, 0, 100), false);
  t.is(segments.calculateSegmentsLengthRatio(0, 100, 100), false);
  t.is(segments.calculateSegmentsLengthRatio(0, 101, 100), false);
  t.is(segments.calculateSegmentsLengthRatio(0, -101, 100), false);
});
