var EventEmitter = require('./index');
var myEventEmitter = new EventEmitter();

// Maximum number of listeners (used to prevent memory leaks and dumb code)
// - defaults to 10
myEventEmitter.maxListeners = 20;

// Implement listener
var onRun = function (explosion) {
    console.log(explosion);
};

// Register onRun event listener
myEventEmitter.on('explosion', onRun);

setTimeout(function () {
    // Deregister event listener after 5 seconds
    myEventEmitter.off('explosion', onRun);
}, 5000);

setInterval(function () {
    if (Math.random() < 0.1) {
        // Emit explosion event
        myEventEmitter.emit('explosion', {
            t: new Date().getTime()
        });
    } else {
        // Emit noExplosion event
        myEventEmitter.emit('noExplosion', {
            t: new Date().getTime()
        });
    }
}, 100);

var myEventEmitter2 = new EventEmitter();
myEventEmitter.pipe(myEventEmitter2);

myEventEmitter2.on('works', function () {
    console.log('"works" event has been fired on myEventEmitter');
});

myEventEmitter.emit('works');
