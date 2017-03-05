const EventEmitter = require('events');
class MyBus extends EventEmitter {}

module.exports = new MyBus();
