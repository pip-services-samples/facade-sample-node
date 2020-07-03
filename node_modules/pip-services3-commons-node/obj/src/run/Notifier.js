"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module run */
/** @hidden */
var _ = require('lodash');
/**
 * Helper class that notifies components.
 *
 * [[INotifiable]]
 */
var Notifier = /** @class */ (function () {
    function Notifier() {
    }
    /**
     * Notifies specific component.
     *
     * To be notiied components must implement [[INotifiable]] interface.
     * If they don't the call to this method has no effect.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param component 		the component that is to be notified.
     * @param args              notifiation arguments.
     *
     * @see [[INotifiable]]
     */
    Notifier.notifyOne = function (correlationId, component, args) {
        if (_.isFunction(component.notify))
            component.notify(correlationId, args);
    };
    /**
     * Notifies multiple components.
     *
     * To be notified components must implement [[INotifiable]] interface.
     * If they don't the call to this method has no effect.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param components 		a list of components that are to be notified.
     * @param args              notification arguments.
     *
     * @see [[notifyOne]]
     * @see [[INotifiable]]
     */
    Notifier.notify = function (correlationId, components, args) {
        if (components == null)
            return;
        for (var index = 0; index < components.length; index++)
            Notifier.notifyOne(correlationId, components[index], args);
    };
    return Notifier;
}());
exports.Notifier = Notifier;
//# sourceMappingURL=Notifier.js.map