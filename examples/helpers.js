var EventEmitter = require('../');
var myEventEmitter = new EventEmitter();

// Implement listener
var onRun = function () {
    console.log('RUN!');
};

myEventEmitter.on('on', function (event) {
    console.log('"on" event has been fired:');
    console.log(event);
});

myEventEmitter.on('off', function (event) {
    console.log('"off" event has been fired:');
    console.log(event);
});

// Register onRun event listener
myEventEmitter.on('explosion', onRun);

myEventEmitter.emit('explosion', {
    t: new Date().getTime()
});


myEventEmitter.off('explosion', onRun);
