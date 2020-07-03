"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module run */
/** @hidden */
var _ = require('lodash');
/** @hidden */
var async = require('async');
/**
 * Helper class that cleans stored object state.
 *
 * @see [[ICleanable]]
 */
var Cleaner = /** @class */ (function () {
    function Cleaner() {
    }
    /**
     * Clears state of specific component.
     *
     * To be cleaned state components must implement [[ICleanable]] interface.
     * If they don't the call to this method has no effect.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param component 		the component that is to be cleaned.
     * @param callback 			callback function that returns error or null no errors occured.
     *
     * @see [[ICleanable]]
     */
    Cleaner.clearOne = function (correlationId, component, callback) {
        if (_.isFunction(component.clear)) {
            try {
                component.clear(correlationId);
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
     * Clears state of multiple components.
     *
     * To be cleaned state components must implement [[ICleanable]] interface.
     * If they don't the call to this method has no effect.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param components 		the list of components that are to be cleaned.
     * @param callback 			callback function that returns error or null no errors occured.
     *
     * @see [[clearOne]]
     * @see [[ICleanable]]
     */
    Cleaner.clear = function (correlationId, components, callback) {
        async.eachSeries(components, function (component, callback) {
            Cleaner.clearOne(correlationId, component, callback);
        }, function (err) {
            if (callback)
                callback(err);
            else if (err)
                throw err;
        });
    };
    return Cleaner;
}());
exports.Cleaner = Cleaner;
//# sourceMappingURL=Cleaner.js.map