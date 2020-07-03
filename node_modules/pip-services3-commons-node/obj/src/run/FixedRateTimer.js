"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module run */
/** @hidden */
var _ = require('lodash');
var Parameters_1 = require("./Parameters");
/**
 * Timer that is triggered in equal time intervals.
 *
 * It has summetric cross-language implementation
 * and is often used by Pip.Services toolkit to
 * perform periodic processing and cleanup in microservices.
 *
 * @see [[INotifiable]]
 *
 * ### Example ###
 *
 *     class MyComponent {
 *         private timer: FixedRateTimer = new FixedRateTimer(() => { this.cleanup }, 60000);
 *         ...
 *         public open(correlationId: string, callback: (err: any) => void): void {
 *             ...
 *             timer.start();
 *             ...
 *         }
 *
 *         public open(correlationId: string, callback: (err: any) => void): void {
 *             ...
 *             timer.stop();
 *             ...
 *         }
 *
 *         private cleanup(): void {
 *             ...
 *         }
 *         ...
 *     }
 */
var FixedRateTimer = /** @class */ (function () {
    /**
     * Creates new instance of the timer and sets its values.
     *
     * @param taskOrCallback    (optional) a Notifiable object or callback function to call when timer is triggered.
     * @param interval          (optional) an interval to trigger timer in milliseconds.
     * @param delay             (optional) a delay before the first triggering in milliseconds.
     *
     * @see [[setTask]]
     * @see [[setCallback]]
     * @see [[setInterval]]
     * @see [[setDelay]]
     */
    function FixedRateTimer(taskOrCallback, interval, delay) {
        if (taskOrCallback === void 0) { taskOrCallback = null; }
        if (interval === void 0) { interval = null; }
        if (delay === void 0) { delay = null; }
        if (_.isObject(taskOrCallback) && _.isFunction(taskOrCallback.notify))
            this.setTask(taskOrCallback);
        else
            this.setCallback(taskOrCallback);
        this.setInterval(interval);
        this.setDelay(delay);
    }
    /**
     * Gets the INotifiable object that receives notifications from this timer.
     *
     * @returns the INotifiable object or null if it is not set.
     */
    FixedRateTimer.prototype.getTask = function () { return this._task; };
    /**
     * Sets a new INotifiable object to receive notifications from this timer.
     *
     * @param value a INotifiable object to be triggered.
     */
    FixedRateTimer.prototype.setTask = function (value) {
        var _this = this;
        this._task = value;
        this._callback = function () {
            _this._task.notify("pip-commons-timer", new Parameters_1.Parameters());
        };
    };
    /**
     * Gets the callback function that is called when this timer is triggered.
     *
     * @returns the callback function or null if it is not set.
     */
    FixedRateTimer.prototype.getCallback = function () { return this._callback; };
    /**
     * Sets the callback function that is called when this timer is triggered.
     *
     * @param value the callback function to be called.
     */
    FixedRateTimer.prototype.setCallback = function (value) {
        this._callback = value;
        this._task = null;
    };
    /**
     * Gets initial delay before the timer is triggered for the first time.
     *
     * @returns the delay in milliseconds.
     */
    FixedRateTimer.prototype.getDelay = function () { return this._delay; };
    /**
     * Sets initial delay before the timer is triggered for the first time.
     *
     * @param value a delay in milliseconds.
     */
    FixedRateTimer.prototype.setDelay = function (value) { this._delay = value; };
    /**
     * Gets periodic timer triggering interval.
     *
     * @returns the interval in milliseconds
     */
    FixedRateTimer.prototype.getInterval = function () { return this._interval; };
    /**
     * Sets periodic timer triggering interval.
     *
     * @param value an interval in milliseconds.
     */
    FixedRateTimer.prototype.setInterval = function (value) { this._interval = value; };
    /**
     * Checks if the timer is started.
     *
     * @returns true if the timer is started and false if it is stopped.
     */
    FixedRateTimer.prototype.isStarted = function () { return this._timer != null; };
    /**
     * Starts the timer.
     *
     * Initially the timer is triggered after delay.
     * After that it is triggered after interval until it is stopped.
     *
     * @see [[stop]]
     */
    FixedRateTimer.prototype.start = function () {
        var _this = this;
        // Stop previously set timer
        this.stop();
        // Exit if interval is not defined
        if (this._interval == null || this._interval <= 0)
            return;
        // Introducing delay
        var delay = Math.max(0, this._delay - this._interval);
        this._timeout = setTimeout(function () {
            _this._timeout = null;
            // Set a new timer
            _this._timer = setInterval(function () {
                try {
                    if (_this._callback)
                        _this._callback();
                }
                catch (ex) {
                    // Ignore or better log!
                }
            }, _this._interval);
        }, delay);
    };
    /**
     * Stops the timer.
     *
     * @see [[start]]
     */
    FixedRateTimer.prototype.stop = function () {
        if (this._timeout != null) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
        if (this._timer != null) {
            clearInterval(this._timer);
            this._timer = null;
        }
    };
    /**
     * Closes the timer.
     *
     * This is required by [[ICloseable]] interface,
     * but besides that it is identical to stop().
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param callback 			callback function that receives error or null no errors occured.
     *
     * @see [[stop]]
     */
    FixedRateTimer.prototype.close = function (correlationId, callback) {
        this.stop();
        if (callback != null)
            callback(null);
    };
    return FixedRateTimer;
}());
exports.FixedRateTimer = FixedRateTimer;
//# sourceMappingURL=FixedRateTimer.js.map