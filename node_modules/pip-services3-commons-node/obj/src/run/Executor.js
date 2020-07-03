"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module run */
/** @hidden */
var _ = require('lodash');
/** @hidden */
var async = require('async');
/**
 * Helper class that executes components.
 *
 * [[IExecutable]]
 */
var Executor = /** @class */ (function () {
    function Executor() {
    }
    /**
     * Executes specific component.
     *
     * To be executed components must implement [[IExecutable]] interface.
     * If they don't the call to this method has no effect.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param component 		the component that is to be executed.
     * @param args              execution arguments.
     * @param callback 			callback function that receives execution result or error.
     *
     * @see [[IExecutable]]
     * @see [[Parameters]]
     */
    Executor.executeOne = function (correlationId, component, args, callback) {
        if (_.isFunction(component.execute)) {
            try {
                return component.execute(correlationId, args, callback);
            }
            catch (err) {
                callback(err, null);
            }
        }
        else
            callback(null, null);
    };
    /**
     * Executes multiple components.
     *
     * To be executed components must implement [[IExecutable]] interface.
     * If they don't the call to this method has no effect.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param components 		a list of components that are to be executed.
     * @param args              execution arguments.
     * @param callback 			callback function that receives execution result or error.
     *
     * @see [[executeOne]]
     * @see [[IExecutable]]
     * @see [[Parameters]]
     */
    Executor.execute = function (correlationId, components, args, callback) {
        var results = [];
        async.eachSeries(components, function (component, callback) {
            Executor.executeOne(correlationId, component, args, function (err, result) {
                results.push(result);
                callback(err);
            });
        }, function (err) {
            callback(err, results);
        });
    };
    return Executor;
}());
exports.Executor = Executor;
//# sourceMappingURL=Executor.js.map