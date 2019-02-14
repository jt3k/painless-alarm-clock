
// [A--%--B     C]  // AB = first-segment
function getFirstSegmentRatio(start, end, between) {
  return 100 / (end - start) * (between - start);
}

let id = 0;
module.exports = {
  idGen: () => `id_${++id}`,
  getFirstSegmentRatio
};

