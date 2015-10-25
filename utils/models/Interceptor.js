var Proxy = require('harmony-proxy');
var Reflect = require('harmony-reflect');

/**
 * Infinite callable Interceptor object, based on Proxy.
 *
 * @returns {Proxy}
 */
var Interceptor = function() {
    return new Proxy(function() {}, handler);
};

// Replaces 'getPrototypeOf' trap
Interceptor.prototype = {};

/**
 * Interceptor handler.
 */
var handler = {
    /**
     * Get trap, if key is not exists, return new interceptor,
     * otherwise performw default operation.
     */
    get: function (target, key, receiver) {
        if (!(key in target)) {
            return Interceptor();
        }

        return Reflect.get(target, key, receiver);
    }
};

module.exports = Interceptor;