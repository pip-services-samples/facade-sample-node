"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TypeConverter_1 = require("./TypeConverter");
var MapConverter_1 = require("./MapConverter");
/**
 * Converts arbitrary values from and to JSON (JavaScript Object Notation) strings.
 *
 * ### Example ###
 *
 *     let value1 = JsonConverter.fromJson("{\"key\":123}"); // Result: { key: 123 }
 *     let value2 = JsonConverter.toMap({ key: 123}); // Result: "{\"key\":123}"
 *
 * @see [[TypeCode]]
 */
var JsonConverter = /** @class */ (function () {
    function JsonConverter() {
    }
    /**
     * Converts JSON string into a value of type specified by a TypeCode.
     *
     * @param type 		the TypeCode for the data type into which 'value' is to be converted.
     * @param value 	the JSON string to convert.
     * @returns			converted object value or null when value is null.
     */
    JsonConverter.fromJson = function (type, value) {
        if (value == null)
            return null;
        var temp = JSON.parse(value);
        return TypeConverter_1.TypeConverter.toType(type, temp);
    };
    /**
     * Converts value into JSON string.
     *
     * @param value 	the value to convert.
     * @returns			JSON string or null when value is null.
     */
    JsonConverter.toJson = function (value) {
        if (value == null)
            return null;
        return JSON.stringify(value);
    };
    /**
     * Converts JSON string into map object or returns null when conversion is not possible.
     *
     * @param value 	the JSON string to convert.
     * @returns			Map object value or null when conversion is not supported.
     *
     * @see [[MapConverter.toNullableMap]]
     */
    JsonConverter.toNullableMap = function (value) {
        if (value == null)
            return null;
        try {
            var map = JSON.parse(value);
            return MapConverter_1.MapConverter.toNullableMap(map);
        }
        catch (Exception) {
            return null;
        }
    };
    /**
     * Converts JSON string into map object or returns empty map when conversion is not possible.
     *
     * @param value 	the JSON string to convert.
     * @returns 		Map object value or empty object when conversion is not supported.
     *
     * @see [[toNullableMap]]
     */
    JsonConverter.toMap = function (value) {
        var result = JsonConverter.toNullableMap(value);
        return result != null ? result : {};
    };
    /**
     * Converts JSON string into map object or returns default value when conversion is not possible.
     *
     * @param value         the JSON string to convert.
     * @param defaultValue  the default value.
     * @returns				Map object value or default when conversion is not supported.
     *
     * @see [[toNullableMap]]
     */
    JsonConverter.toMapWithDefault = function (value, defaultValue) {
        var result = JsonConverter.toNullableMap(value);
        return result != null ? result : defaultValue;
    };
    return JsonConverter;
}());
exports.JsonConverter = JsonConverter;
//# sourceMappingURL=JsonConverter.js.map