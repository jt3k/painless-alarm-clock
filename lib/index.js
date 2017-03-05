const procM = require('./process-manager.js');
const bus = require('./bus.js');

module.exports = Object.assign(
  {},
  {bus},
  {procM},
  require('./time.js'),
  require('./segments.js')
);
