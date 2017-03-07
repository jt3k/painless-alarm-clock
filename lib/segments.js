//         full
// |-----------------|
// 0                 9
// 0  A-    B    -C  9     // case 0   A < C && B < C && B > A
// 0  B    -C     A- 9     // case 1   A > C && B < C
// 0 -C     A-    B  9     // case 2   A > C && B > A
// |  |     |     |  |
// 0  3     6     8  9
// -------------------
// exceptions:
//   -C     B     A-       // error 0  A > C && B < A && B > C
//    B     A-----C        // error 1  A < C && B < A
//    A-----C     B        // error 2  A < C && B > C

// [case 0]
// (AC) = (0С) - (0A)  =  (C) - (A)
// (AB) = (0B) - (0A)  =  (B) - (A)

// [case 1]
// (AC) = (A9) + (0C)  =  (full - A) + C
// (AB) = (A9) + (0B)  =  (full - A) + B

// [case 2]
// (AC) = (A9) + (0C)  =  (full - A) + C
// (AB) = (0A) + (0C)  =  (B) - (A)
function _calculateSegmentsLength(A, B, C, full = 60 * 60 * 24) {
  // exceptions
  const isException = A > C && B < A && B > C ||
    A < C && B < A ||
    A < C && B > C;
  if (isException) {
    return false;
  }

  let AC = 0;
  let AB = 0;

  // [case 0]
  if (A < C && B < C && B > A) {
    // console.log('[case 0]');
    AC = C - A;
    AB = B - A;
  }
  // [case 1]
  if (A > C && B < C) {
    // console.log('[case 1]');
    AC = (full - A) + C;
    AB = (full - A) + B;
  }
  // [case 2]
  if (A > C && B > A) {
    // console.log('[case 2]');
    AC = (full - A) + C;
    AB = B - A;
  }

  return [AC, AB];
}

function calculateSegmentsLengthRatio(A, B, C) {
  const isExteption = A === B || C === B;
  if (isExteption) {
    return false;
  }

  const lengths = _calculateSegmentsLength(A, B, C);
  if (!lengths) {
    return false;
  }

  // calculate ratio
  const [AC, AB] = lengths;
  return AB / AC;
}

module.exports = {
  calculateSegmentsLengthRatio
};
