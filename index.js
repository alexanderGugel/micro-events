function _each(arr, func, thisArg) {
    for (var i = 0; i < arr.length; i++) {
        func.call(thisArg, arr[i]);
    }
}

function _remove(arr, element) {
    var index = arr.indexOf(element);
    if (index !== -1) {
        arr.splice(index, 1);
    }
}

function _contains(arr, element) {
    return arr.indexOf(element) !== -1;
}

function EventEmitter() {
    this.listeners = {};
}

EventEmitter.prototype.maxListeners = 10;

function _validateEventName(eventName) {
    if (typeof eventName !== 'string') {
        throw 'eventName is not a string';
    }
}

function _validateListener(listener) {
    if (typeof listener !== 'function') {
        throw 'listener is not a function';
    }
}

EventEmitter.prototype.on = function (eventName, listener) {
    _validateEventName(eventName);
    _validateListener(listener);
    this.listeners[eventName] = this.listeners[eventName] || [];
    if (this.listeners[eventName].length > this.maxListeners) {
        throw 'Exceeded maxListeners - You might have a memory leak';
    }
    if (!_contains(this.listeners[eventName], listener)) {
        this.listeners[eventName].push(listener);
        this.emit('on', {
            eventName: eventName,
            listener: listener
        });
    }
    return this;
};

EventEmitter.prototype.emit = function (eventName, event) {
    _validateEventName(eventName);
    var events = Array.prototype.slice.call(arguments, 1);
    _each(this.listeners[eventName] || [], function (listener) {
        listener.apply(this, events);
    }, this);
    return this;
};

EventEmitter.prototype.off = function (eventName, listener) {
    _validateEventName(eventName);
    _validateListener(listener);
    _remove(this.listeners[eventName] || [], listener);

    this.emit('off', {
        eventName: eventName,
        listener: listener
    });
    return this;
};

EventEmitter.prototype.clearListeners = function (eventName) {
    _validateEventName(eventName);
    this.listeners[eventName] = null;
    return this;
};

module.exports = EventEmitter;
