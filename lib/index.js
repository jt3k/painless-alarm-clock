const bus = require('./bus.js');

module.exports = Object.assign(
  {},
  {bus},
  require('./time.js'),
  require('./segments.js')
);
