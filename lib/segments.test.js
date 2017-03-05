import test from 'ava';
import segments from './segments';

test('should calculate ratio of time segments', t => {
  t.is(segments.calculateSegmentsLengthRatio(0, 1, 100), 0.01);
  t.is(segments.calculateSegmentsLengthRatio(0, 50, 100), 0.5);
  t.is(segments.calculateSegmentsLengthRatio(0, 99, 100), 0.99);

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
