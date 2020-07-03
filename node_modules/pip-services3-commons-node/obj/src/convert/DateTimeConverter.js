"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module convert */
/** @hidden */
var _ = require('lodash');
/**
 * Converts arbitrary values into Date values using extended conversion rules:
 * - Strings: converted using ISO time format
 * - Numbers: converted using milliseconds since unix epoch
 *
 * ### Example ###
 *
 *     let value1 = DateTimeConverter.toNullableDateTime("ABC"); // Result: null
 *     let value2 = DateTimeConverter.toNullableDateTime("2018-01-01T11:30:00.0"); // Result: Date(2018,0,1,11,30)
 *     let value3 = DateTimeConverter.toNullableDateTime(123); // Result: Date(123)
 */
var DateTimeConverter = /** @class */ (function () {
    function DateTimeConverter() {
    }
    /**
     * Converts value into Date or returns null when conversion is not possible.
     *
     * @param value     the value to convert.
     * @returns         Date value or null when conversion is not supported.
     */
    DateTimeConverter.toNullableDateTime = function (value) {
        if (value == null)
            return null;
        if (_.isDate(value))
            return value;
        if (_.isNumber(value))
            return new Date(value);
        var result = Date.parse(value);
        return isNaN(result) ? null : new Date(result);
    };
    /**
     * Converts value into Date or returns current date when conversion is not possible.
     *
     * @param value     the value to convert.
     * @returns         Date value or current date when conversion is not supported.
     *
     * @see [[toDateTimeWithDefault]]
     */
    DateTimeConverter.toDateTime = function (value) {
        return DateTimeConverter.toDateTimeWithDefault(value, new Date());
    };
    /**
     * Converts value into Date or returns default when conversion is not possible.
     *
     * @param value         the value to convert.
     * @param defaultValue  the default value.
     * @returns             Date value or default when conversion is not supported.
     *
     * @see [[toNullableDateTime]]
     */
    DateTimeConverter.toDateTimeWithDefault = function (value, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        var result = DateTimeConverter.toNullableDateTime(value);
        return result != null ? result : defaultValue;
    };
    return DateTimeConverter;
}());
exports.DateTimeConverter = DateTimeConverter;
//# sourceMappingURL=DateTimeConverter.js.map