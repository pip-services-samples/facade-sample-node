"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module convert */
/** @hidden */
var _ = require('lodash');
var TypeCode_1 = require("./TypeCode");
var TypeConverter_1 = require("./TypeConverter");
var TypeReflector_1 = require("../reflect/TypeReflector");
/**
 * Converts arbitrary values into map objects using extended conversion rules.
 * This class is similar to [[MapConverter]], but is recursively converts all values
 * stored in objects and arrays.
 *
 * ### Example ###
 *
 *     let value1 = RecursiveMapConverted.toNullableMap("ABC"); // Result: null
 *     let value2 = RecursiveMapConverted.toNullableMap({ key: 123 }); // Result: { key: 123 }
 *     let value3 = RecursiveMapConverted.toNullableMap([1,[2,3]); // Result: { "0": 1, { "0": 2, "1": 3 } }
 */
var RecursiveMapConverter = /** @class */ (function () {
    function RecursiveMapConverter() {
    }
    RecursiveMapConverter.objectToMap = function (value) {
        if (value == null)
            return null;
        var result = {};
        var props = Object.keys(value);
        for (var i = 0; i < props.length; i++) {
            var propValue = value[props[i]];
            propValue = RecursiveMapConverter.valueToMap(propValue);
            result[props[i]] = propValue;
        }
        return result;
    };
    RecursiveMapConverter.valueToMap = function (value) {
        if (value == null)
            return null;
        // Skip expected non-primitive values
        if (_.isString(value))
            return value;
        var valueType = TypeConverter_1.TypeConverter.toTypeCode(value);
        // Skip primitive values
        if (TypeReflector_1.TypeReflector.isPrimitive(valueType))
            return value;
        if (valueType == TypeCode_1.TypeCode.Map)
            return RecursiveMapConverter.mapToMap(value);
        // Convert arrays
        if (valueType == TypeCode_1.TypeCode.Array)
            return RecursiveMapConverter.arrayToMap(value);
        return RecursiveMapConverter.objectToMap(value);
    };
    RecursiveMapConverter.mapToMap = function (value) {
        var result = {};
        var keys = Object.keys(value);
        for (var i = 0; i < keys.length; i++) {
            result[keys[i]] = RecursiveMapConverter.valueToMap(value[keys[i]]);
        }
    };
    RecursiveMapConverter.arrayToMap = function (value) {
        var result = [];
        for (var i = 0; i < value.length; i++) {
            result[i] = RecursiveMapConverter.valueToMap(value[i]);
        }
        return result;
    };
    /**
     * Converts value into map object or returns null when conversion is not possible.
     *
     * @param value     the value to convert.
     * @returns         map object or null when conversion is not supported.
     */
    RecursiveMapConverter.toNullableMap = function (value) {
        return RecursiveMapConverter.valueToMap(value);
    };
    /**
     * Converts value into map object or returns empty map when conversion is not possible
     *
     * @param value     the value to convert.
     * @returns         map object or empty map when conversion is not supported.
     *
     * @see [[toNullableMap]]
     */
    RecursiveMapConverter.toMap = function (value) {
        return RecursiveMapConverter.toNullableMap(value) || {};
    };
    /**
     * Converts value into map object or returns default when conversion is not possible
     *
     * @param value         the value to convert.
     * @param defaultValue  the default value.
     * @returns             map object or emptu map when conversion is not supported.
     *
     * @see [[toNullableMap]]
     */
    RecursiveMapConverter.toMapWithDefault = function (value, defaultValue) {
        return RecursiveMapConverter.toNullableMap(value) || defaultValue;
    };
    return RecursiveMapConverter;
}());
exports.RecursiveMapConverter = RecursiveMapConverter;
//# sourceMappingURL=RecursiveMapConverter.js.map