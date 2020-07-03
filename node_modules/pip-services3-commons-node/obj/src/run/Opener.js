"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module run */
/** @hidden */
var _ = require('lodash');
/** @hidden */
var async = require('async');
/**
 * Helper class that opens components.
 *
 * [[IOpenable]]
 */
var Opener = /** @class */ (function () {
    function Opener() {
    }
    /**
     * Checks if specified component is opened.
     *
     * To be checked components must implement [[IOpenable]] interface.
     * If they don't the call to this method returns true.
     *
     * @param component 	the component that is to be checked.
     * @returns true if component is opened and false otherwise.
     *
     * @see [[IOpenable]]
     */
    Opener.isOpenOne = function (component) {
        if (_.isFunction(component.isOpen))
            return component.isOpen();
        else
            return true;
    };
    /**
     * Checks if all components are opened.
     *
     * To be checked components must implement [[IOpenable]] interface.
     * If they don't the call to this method returns true.
     *
     * @param components 	a list of components that are to be checked.
     * @returns true if all components are opened and false if at least one component is closed.
     *
     * @see [[isOpenOne]]
     * @see [[IOpenable]]
     */
    Opener.isOpen = function (components) {
        if (components == null)
            return true;
        var result = true;
        for (var index = 0; index < components.length; index++)
            result = result && Opener.isOpenOne(components[index]);
        return result;
    };
    /**
     * Opens specific component.
     *
     * To be opened components must implement [[IOpenable]] interface.
     * If they don't the call to this method has no effect.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param component 		the component that is to be opened.
     * @param callback 			callback function that returns error or null no errors occured.
     *
     * @see [[IOpenable]]
     */
    Opener.openOne = function (correlationId, component, callback) {
        if (_.isFunction(component.open)) {
            try {
                component.open(correlationId, callback);
            }
            catch (err) {
                if (callback)
                    callback(err);
                else if (err)
                    throw err;
            }
        }
        else if (callback)
            callback(null);
    };
    /**
     * Opens multiple components.
     *
     * To be opened components must implement [[IOpenable]] interface.
     * If they don't the call to this method has no effect.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param components 		the list of components that are to be closed.
     * @param callback 			callback function that returns error or null no errors occured.
     *
     * @see [[openOne]]
     * @see [[IOpenable]]
     */
    Opener.open = function (correlationId, components, callback) {
        async.eachSeries(components, function (component, callback) {
            Opener.openOne(correlationId, component, callback);
        }, function (err) {
            if (callback)
                callback(err);
            else if (err)
                throw err;
        });
    };
    return Opener;
}());
exports.Opener = Opener;
//# sourceMappingURL=Opener.js.map