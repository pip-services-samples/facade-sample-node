"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InvocationException_1 = require("../errors/InvocationException");
/**
 * Concrete implementation of [[IEvent IEvent]] interface.
 * It allows to send asynchronous notifications to multiple subscribed listeners.
 *
 * @see [[IEvent]]
 * @see [[IEventListener]]
 *
 * ### Example ###
 *
 *     let event = new Event("my_event");
 *
 *     event.addListener(myListener);
 *
 *     event.notify("123", Parameters.fromTuples(
 *       "param1", "ABC",
 *       "param2", 123
 *     ));
 */
var Event = /** @class */ (function () {
    /**
     * Creates a new event and assigns its name.
     *
     * @param name  the name of the event that is to be created.
     * @throws an Error if the name is null.
     */
    function Event(name) {
        if (!name)
            throw new Error("Name cannot be null");
        this._name = name;
    }
    /**
     * Gets the name of the event.
     *
     * @returns the name of this event.
     */
    Event.prototype.getName = function () {
        return this._name;
    };
    /**
     * Gets all listeners registred in this event.
     *
     * @returns a list of listeners.
     */
    Event.prototype.getListeners = function () {
        return this._listeners;
    };
    /**
     * Adds a listener to receive notifications when this event is fired.
     *
     * @param listener the listener reference to add.
     */
    Event.prototype.addListener = function (listener) {
        this._listeners.push(listener);
    };
    /**
     * Removes a listener, so that it no longer receives notifications for this event.
     *
     * @param listener      the listener reference to remove.
     */
    Event.prototype.removeListener = function (listener) {
        var index = this._listeners.indexOf(listener);
        if (index > -1)
            this._listeners.splice(index, 1);
    };
    /**
     * Fires this event and notifies all registred listeners.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param args              the parameters to raise this event with.
     * @throws an [[InvocationException]] if the event fails to be raised.
     */
    Event.prototype.notify = function (correlationId, args) {
        for (var i = 0; i < this._listeners.length; i++) {
            try {
                var listener = this._listeners[i];
                listener.onEvent(correlationId, this, args);
            }
            catch (ex) {
                throw new InvocationException_1.InvocationException(correlationId, "EXEC_FAILED", "Raising event " + this.getName() + " failed: " + ex)
                    .withDetails("event", this.getName())
                    .wrap(ex);
            }
        }
    };
    return Event;
}());
exports.Event = Event;
//# sourceMappingURL=Event.js.map