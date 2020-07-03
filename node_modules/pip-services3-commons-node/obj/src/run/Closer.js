"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module run */
/** @hidden */
var _ = require('lodash');
/** @hidden */
var async = require('async');
/**
 * Helper class that closes previously opened components.
 *
 * [[ICloseable]]
 */
var Closer = /** @class */ (function () {
    function Closer() {
    }
    /**
     * Closes specific component.
     *
     * To be closed components must implement [[ICloseable]] interface.
     * If they don't the call to this method has no effect.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param component 		the component that is to be closed.
     * @param callback 			callback function that receives error or null no errors occured.
     *
     * @see [[IClosable]]
     */
    Closer.closeOne = function (correlationId, component, callback) {
        if (_.isFunction(component.close)) {
            try {
                component.close(correlationId, callback);
            }
            catch (err) {
                if (callback)
                    callback(err);
                else
                    throw err;
            }
        }
        else if (callback)
            callback(null);
    };
    /**
     * Closes multiple components.
     *
     * To be closed components must implement [[ICloseable]] interface.
     * If they don't the call to this method has no effect.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param components 		the list of components that are to be closed.
     * @param callback 			callback function that receives error or null no errors occured.
     *
     * @see [[closeOne]]
     * @see [[IClosable]]
     */
    Closer.close = function (correlationId, components, callback) {
        async.eachSeries(components, function (component, callback) {
            Closer.closeOne(correlationId, component, callback);
        }, function (err) {
            if (callback)
                callback(err);
            else if (err)
                throw err;
        });
    };
    return Closer;
}());
exports.Closer = Closer;
//# sourceMappingURL=Closer.js.map