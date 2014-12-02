[![Build Status](https://travis-ci.org/alexanderGugel/micro-events.svg)](https://travis-ci.org/alexanderGugel/micro-events)

# micro-events

> A very, very simple event emitter implementation.

## Features

* no dependencies
* very small (~ 100 LoC)
* smart memory leak detection
* lightning fast
* unopinionated and minimal
* works in the browser (browserify) and on the server (Node.JS)
* emits useful events (e.g. "on" and "off" when manipulating listeners)
* supports #pipe() and #unpipe()

## Installation

- **Node.js, browserify** `npm install micro-events --save`
- **Require.js** `require(["micro-events"], ...`

## Examples

```javascript
var EventEmitter = require('micro-events'); // require it
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
```

Want more code? - Look into `/examples`!

## How can I extend this?

Just like you would extend any other "class".

```javascript
var EventEmitter = require('micro-events');

var MyEventEmitter = function () {
    EventEmitter.call(this);
};

MyEventEmitter.prototype = Object.create(EventEmitter.prototype);
MyEventEmitter.prototype.constructor = MyEventEmitter;
```

If possible, it is recommended to use/ mix in individual methods as opposed to
extending the super class.
