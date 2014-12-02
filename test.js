var assert = require('assert');
var EventEmitter = require('./index');

var _noop = function () {};

describe('EventEmitter', function () {
    it('#on() and #emit()', function (done) {
        var eventEmitter = new EventEmitter();
        var originalEvent = {};
        eventEmitter.on('boom', function (event) {
            assert(event, originalEvent);
            done();
        });
        eventEmitter.emit('boom', originalEvent);
    });

    it('#on() should only register handler once', function (done) {
        var eventEmitter = new EventEmitter();
        var originalEvent = {};
        var handler = function (event) {
            done();
        };
        eventEmitter.on('boom', handler);
        eventEmitter.on('boom', handler);
        eventEmitter.emit('boom', originalEvent);
    });

    it('#off() and #emit()', function () {
        var eventEmitter = new EventEmitter();
        var originalEvent = {};
        var handler = function (event) {
            throw 'Unregistered handler has been called';
        };
        eventEmitter.on('boom', handler);
        eventEmitter.off('boom', handler);
        eventEmitter.emit('boom', originalEvent);
    });

    it('functions should return this', function () {
        var eventEmitter = new EventEmitter();
        assert(eventEmitter.on('boom', _noop), eventEmitter);
        assert(eventEmitter.off('boom', _noop), eventEmitter);
        assert(eventEmitter.emit('boom', _noop), eventEmitter);
        assert(eventEmitter.clearListeners('boom'), eventEmitter);
    });

    it('functions should check arguments', function () {
        assert.throws(function () {
            emit.on();
        });
        assert.throws(function () {
            emit.on('boom', 'Not a function');
        });
        assert.throws(function () {
            on.off();
        });
        assert.throws(function () {
            emit.off('boom', 'Not a function');
        });
        assert.throws(function () {
            off.emit();
        });
    });

    it('#clearListeners()', function () {
        var eventEmitter = new EventEmitter();
        var originalEvent = {};
        var handler = function (event) {
            throw 'Unregistered handler has been called';
        };
        eventEmitter.on('boom', handler);
        eventEmitter.clearListeners('boom');
        eventEmitter.emit('boom', originalEvent);
    });

    it('#on() should detect memory leak', function () {
        var eventEmitter = new EventEmitter();
        assert.throws(function () {
            for (var i = 0; i < 20; i++) {
                eventEmitter.on('boom', function () {});
            }
        });
    });
});
