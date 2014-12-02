var EventEmitter = require('../');

var myEventEmitter = new EventEmitter();
var myEventEmitter2 = new EventEmitter();
myEventEmitter.pipe(myEventEmitter2);

myEventEmitter2.on('works', function () {
    console.log('"works" event has been fired on myEventEmitter');
});

myEventEmitter.emit('works');

// Events emitted on myEventEmitter will no longer be emitted on myEventEmitter2
myEventEmitter.unpipe(myEventEmitter2);
myEventEmitter.emit('works');
