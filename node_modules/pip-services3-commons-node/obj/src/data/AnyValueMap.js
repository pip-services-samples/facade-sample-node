"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module data */
/** @hidden */
var _ = require('lodash');
var TypeConverter_1 = require("../convert/TypeConverter");
var StringConverter_1 = require("../convert/StringConverter");
var BooleanConverter_1 = require("../convert/BooleanConverter");
var IntegerConverter_1 = require("../convert/IntegerConverter");
var LongConverter_1 = require("../convert/LongConverter");
var FloatConverter_1 = require("../convert/FloatConverter");
var DoubleConverter_1 = require("../convert/DoubleConverter");
var DateTimeConverter_1 = require("../convert/DateTimeConverter");
var MapConverter_1 = require("../convert/MapConverter");
var AnyValue_1 = require("./AnyValue");
var AnyValueArray_1 = require("./AnyValueArray");
/**
 * Cross-language implementation of dynamic object map (dictionary) what can hold values of any type.
 * The stored values can be converted to different types using variety of accessor methods.
 *
 * ### Example ###
 *
 *     let value1 = new AnyValueMap({ key1: 1, key2: "123.456", key3: "2018-01-01" });
 *
 *     value1.getAsBoolean("key1");   // Result: true
 *     value1.getAsInteger("key2");   // Result: 123
 *     value1.getAsFloat("key2");     // Result: 123.456
 *     value1.getAsDateTime("key3");  // Result: new Date(2018,0,1)
 *
 * @see [[StringConverter]]
 * @see [[TypeConverter]]
 * @see [[BooleanConverter]]
 * @see [[IntegerConverter]]
 * @see [[LongConverter]]
 * @see [[DoubleConverter]]
 * @see [[FloatConverter]]
 * @see [[DateTimeConverter]]
 * @see [[ICloneable]]
 */
var AnyValueMap = /** @class */ (function () {
    /**
     * Creates a new instance of the map and assigns its value.
     *
     * @param value     (optional) values to initialize this map.
     */
    function AnyValueMap(values) {
        if (values === void 0) { values = null; }
        this.append(values);
    }
    /**
     * Gets a map element specified by its key.
     *
     * @param key     a key of the element to get.
     * @returns       the value of the map element.
     */
    AnyValueMap.prototype.get = function (key) {
        return this[key] || null;
    };
    /**
     * Gets keys of all elements stored in this map.
     *
     * @returns a list with all map keys.
     */
    AnyValueMap.prototype.getKeys = function () {
        var keys = [];
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    };
    /**
     * Puts a new value into map element specified by its key.
     *
     * @param key       a key of the element to put.
     * @param value     a new value for map element.
     */
    AnyValueMap.prototype.put = function (key, value) {
        this[key] = value;
    };
    /**
     * Removes a map element specified by its key
     *
     * @param key     a key of the element to remove.
     */
    AnyValueMap.prototype.remove = function (key) {
        delete this[key];
    };
    /**
     * Appends new elements to this map.
     *
     * @param map  a map with elements to be added.
     */
    AnyValueMap.prototype.append = function (map) {
        if (map == null)
            return;
        for (var key in map) {
            var value = map[key];
            if (map.hasOwnProperty(key))
                this[key] = value;
        }
    };
    /**
     * Clears this map by removing all its elements.
     */
    AnyValueMap.prototype.clear = function () {
        for (var key in this) {
            var value = this[key];
            if (this.hasOwnProperty(key))
                delete this[key];
        }
    };
    /**
     * Gets a number of elements stored in this map.
     *
     * @returns the number of elements in this map.
     */
    AnyValueMap.prototype.length = function () {
        var count = 0;
        for (var key in this) {
            if (this.hasOwnProperty(key) && !_.isFunction(this[key])) {
                count++;
            }
        }
        return count;
    };
    /**
     * Gets the value stored in map element without any conversions.
     * When element key is not defined it returns the entire map value.
     *
     * @param key       (optional) a key of the element to get
     * @returns the element value or value of the map when index is not defined.
     */
    AnyValueMap.prototype.getAsObject = function (key) {
        if (key === void 0) { key = undefined; }
        if (key === undefined) {
            var result = {};
            for (var key_1 in this) {
                var value = this[key_1];
                if (this.hasOwnProperty(key_1))
                    result[key_1] = value;
            }
            return result;
        }
        else {
            return this.get(key);
        }
    };
    /**
     * Sets a new value to map element specified by its index.
     * When the index is not defined, it resets the entire map value.
     * This method has double purpose because method overrides are not supported in JavaScript.
     *
     * @param key       (optional) a key of the element to set
     * @param value     a new element or map value.
     *
     * @see [[MapConverter.toMap]]
     */
    AnyValueMap.prototype.setAsObject = function (key, value) {
        if (value === void 0) { value = undefined; }
        if (value === undefined) {
            value = key;
            this.clear();
            var values = MapConverter_1.MapConverter.toMap(value);
            this.append(values);
        }
        else {
            this.put(key, value);
        }
    };
    /**
     * Converts map element into a string or returns null if conversion is not possible.
     *
     * @param key       a key of element to get.
     * @returns string value of the element or null if conversion is not supported.
     *
     * @see [[StringConverter.toNullableString]]
     */
    AnyValueMap.prototype.getAsNullableString = function (key) {
        var value = this.get(key);
        return StringConverter_1.StringConverter.toNullableString(value);
    };
    /**
     * Converts map element into a string or returns "" if conversion is not possible.
     *
     * @param key       a key of element to get.
     * @returns string value of the element or "" if conversion is not supported.
     *
     * @see [[getAsStringWithDefault]]
     */
    AnyValueMap.prototype.getAsString = function (key) {
        return this.getAsStringWithDefault(key, null);
    };
    /**
     * Converts map element into a string or returns default value if conversion is not possible.
     *
     * @param key           a key of element to get.
     * @param defaultValue  the default value
     * @returns string value of the element or default value if conversion is not supported.
     *
     * @see [[StringConverter.toStringWithDefault]]
     */
    AnyValueMap.prototype.getAsStringWithDefault = function (key, defaultValue) {
        var value = this.get(key);
        return StringConverter_1.StringConverter.toStringWithDefault(value, defaultValue);
    };
    /**
     * Converts map element into a boolean or returns null if conversion is not possible.
     *
     * @param key       a key of element to get.
     * @returns boolean value of the element or null if conversion is not supported.
     *
     * @see [[BooleanConverter.toNullableBoolean]]
     */
    AnyValueMap.prototype.getAsNullableBoolean = function (key) {
        var value = this.get(key);
        return BooleanConverter_1.BooleanConverter.toNullableBoolean(value);
    };
    /**
     * Converts map element into a boolean or returns false if conversion is not possible.
     *
     * @param key       a key of element to get.
     * @returns boolean value of the element or false if conversion is not supported.
     *
     * @see [[getAsBooleanWithDefault]]
     */
    AnyValueMap.prototype.getAsBoolean = function (key) {
        return this.getAsBooleanWithDefault(key, false);
    };
    /**
     * Converts map element into a boolean or returns default value if conversion is not possible.
     *
     * @param key           a key of element to get.
     * @param defaultValue  the default value
     * @returns boolean value of the element or default value if conversion is not supported.
     *
     * @see [[BooleanConverter.toBooleanWithDefault]]
     */
    AnyValueMap.prototype.getAsBooleanWithDefault = function (key, defaultValue) {
        var value = this.get(key);
        return BooleanConverter_1.BooleanConverter.toBooleanWithDefault(value, defaultValue);
    };
    /**
     * Converts map element into an integer or returns null if conversion is not possible.
     *
     * @param key       a key of element to get.
     * @returns integer value of the element or null if conversion is not supported.
     *
     * @see [[IntegerConverter.toNullableInteger]]
     */
    AnyValueMap.prototype.getAsNullableInteger = function (key) {
        var value = this.get(key);
        return IntegerConverter_1.IntegerConverter.toNullableInteger(value);
    };
    /**
     * Converts map element into an integer or returns 0 if conversion is not possible.
     *
     * @param key       a key of element to get.
     * @returns integer value of the element or 0 if conversion is not supported.
     *
     * @see [[getAsIntegerWithDefault]]
     */
    AnyValueMap.prototype.getAsInteger = function (key) {
        return this.getAsIntegerWithDefault(key, 0);
    };
    /**
     * Converts map element into an integer or returns default value if conversion is not possible.
     *
     * @param key           a key of element to get.
     * @param defaultValue  the default value
     * @returns integer value of the element or default value if conversion is not supported.
     *
     * @see [[IntegerConverter.toIntegerWithDefault]]
     */
    AnyValueMap.prototype.getAsIntegerWithDefault = function (key, defaultValue) {
        var value = this.get(key);
        return IntegerConverter_1.IntegerConverter.toIntegerWithDefault(value, defaultValue);
    };
    /**
     * Converts map element into a long or returns null if conversion is not possible.
     *
     * @param key       a key of element to get.
     * @returns long value of the element or null if conversion is not supported.
     *
     * @see [[LongConverter.toNullableLong]]
     */
    AnyValueMap.prototype.getAsNullableLong = function (key) {
        var value = this.get(key);
        return LongConverter_1.LongConverter.toNullableLong(value);
    };
    /**
     * Converts map element into a long or returns 0 if conversion is not possible.
     *
     * @param key       a key of element to get.
     * @returns long value of the element or 0 if conversion is not supported.
     *
     * @see [[getAsLongWithDefault]]
     */
    AnyValueMap.prototype.getAsLong = function (key) {
        return this.getAsLongWithDefault(key, 0);
    };
    /**
     * Converts map element into a long or returns default value if conversion is not possible.
     *
     * @param key           a key of element to get.
     * @param defaultValue  the default value
     * @returns long value of the element or default value if conversion is not supported.
     *
     * @see [[LongConverter.toLongWithDefault]]
     */
    AnyValueMap.prototype.getAsLongWithDefault = function (key, defaultValue) {
        var value = this.get(key);
        return LongConverter_1.LongConverter.toLongWithDefault(value, defaultValue);
    };
    /**
     * Converts map element into a float or returns null if conversion is not possible.
     *
     * @param key       a key of element to get.
     * @returns float value of the element or null if conversion is not supported.
     *
     * @see [[FloatConverter.toNullableFloat]]
     */
    AnyValueMap.prototype.getAsNullableFloat = function (key) {
        var value = this.get(key);
        return FloatConverter_1.FloatConverter.toNullableFloat(value);
    };
    /**
     * Converts map element into a float or returns 0 if conversion is not possible.
     *
     * @param key       a key of element to get.
     * @returns float value of the element or 0 if conversion is not supported.
     *
     * @see [[getAsFloatWithDefault]]
     */
    AnyValueMap.prototype.getAsFloat = function (key) {
        return this.getAsFloatWithDefault(key, 0);
    };
    /**
     * Converts map element into a flot or returns default value if conversion is not possible.
     *
     * @param key           a key of element to get.
     * @param defaultValue  the default value
     * @returns flot value of the element or default value if conversion is not supported.
     *
     * @see [[FloatConverter.toFloatWithDefault]]
     */
    AnyValueMap.prototype.getAsFloatWithDefault = function (key, defaultValue) {
        var value = this.get(key);
        return FloatConverter_1.FloatConverter.toFloatWithDefault(value, defaultValue);
    };
    /**
     * Converts map element into a double or returns null if conversion is not possible.
     *
     * @param key       a key of element to get.
     * @returns double value of the element or null if conversion is not supported.
     *
     * @see [[DoubleConverter.toNullableDouble]]
     */
    AnyValueMap.prototype.getAsNullableDouble = function (key) {
        var value = this.get(key);
        return DoubleConverter_1.DoubleConverter.toNullableDouble(value);
    };
    /**
     * Converts map element into a double or returns 0 if conversion is not possible.
     *
     * @param key       a key of element to get.
     * @returns double value of the element or 0 if conversion is not supported.
     *
     * @see [[getAsDoubleWithDefault]]
     */
    AnyValueMap.prototype.getAsDouble = function (key) {
        return this.getAsDoubleWithDefault(key, 0);
    };
    /**
     * Converts map element into a double or returns default value if conversion is not possible.
     *
     * @param key           a key of element to get.
     * @param defaultValue  the default value
     * @returns double value of the element or default value if conversion is not supported.
     *
     * @see [[DoubleConverter.toDoubleWithDefault]]
     */
    AnyValueMap.prototype.getAsDoubleWithDefault = function (key, defaultValue) {
        var value = this.get(key);
        return DoubleConverter_1.DoubleConverter.toDoubleWithDefault(value, defaultValue);
    };
    /**
     * Converts map element into a Date or returns null if conversion is not possible.
     *
     * @param key       a key of element to get.
     * @returns Date value of the element or null if conversion is not supported.
     *
     * @see [[DateTimeConverter.toNullableDateTime]]
     */
    AnyValueMap.prototype.getAsNullableDateTime = function (key) {
        var value = this.get(key);
        return DateTimeConverter_1.DateTimeConverter.toNullableDateTime(value);
    };
    /**
     * Converts map element into a Date or returns the current date if conversion is not possible.
     *
     * @param key       a key of element to get.
     * @returns Date value of the element or the current date if conversion is not supported.
     *
     * @see [[getAsDateTimeWithDefault]]
     */
    AnyValueMap.prototype.getAsDateTime = function (key) {
        return this.getAsDateTimeWithDefault(key, null);
    };
    /**
     * Converts map element into a Date or returns default value if conversion is not possible.
     *
     * @param key           a key of element to get.
     * @param defaultValue  the default value
     * @returns Date value of the element or default value if conversion is not supported.
     *
     * @see [[DateTimeConverter.toDateTimeWithDefault]]
     */
    AnyValueMap.prototype.getAsDateTimeWithDefault = function (key, defaultValue) {
        var value = this.get(key);
        return DateTimeConverter_1.DateTimeConverter.toDateTimeWithDefault(value, defaultValue);
    };
    /**
     * Converts map element into a value defined by specied typecode.
     * If conversion is not possible it returns null.
     *
     * @param type      the TypeCode that defined the type of the result
     * @param key       a key of element to get.
     * @returns element value defined by the typecode or null if conversion is not supported.
     *
     * @see [[TypeConverter.toNullableType]]
     */
    AnyValueMap.prototype.getAsNullableType = function (type, key) {
        var value = this.get(key);
        return TypeConverter_1.TypeConverter.toNullableType(type, value);
    };
    /**
     * Converts map element into a value defined by specied typecode.
     * If conversion is not possible it returns default value for the specified type.
     *
     * @param type      the TypeCode that defined the type of the result
     * @param key       a key of element to get.
     * @returns element value defined by the typecode or default if conversion is not supported.
     *
     * @see [[getAsTypeWithDefault]]
     */
    AnyValueMap.prototype.getAsType = function (type, key) {
        return this.getAsTypeWithDefault(type, key, null);
    };
    /**
     * Converts map element into a value defined by specied typecode.
     * If conversion is not possible it returns default value.
     *
     * @param type          the TypeCode that defined the type of the result
     * @param key       a key of element to get.
     * @param defaultValue  the default value
     * @returns element value defined by the typecode or default value if conversion is not supported.
     *
     * @see [[TypeConverter.toTypeWithDefault]]
     */
    AnyValueMap.prototype.getAsTypeWithDefault = function (type, key, defaultValue) {
        var value = this.get(key);
        return TypeConverter_1.TypeConverter.toTypeWithDefault(type, value, defaultValue);
    };
    /**
     * Converts map element into an AnyValue or returns an empty AnyValue if conversion is not possible.
     *
     * @param key       a key of element to get.
     * @returns AnyValue value of the element or empty AnyValue if conversion is not supported.
     *
     * @see [[AnyValue]]
     * @see [[AnyValue.constructor]]
     */
    AnyValueMap.prototype.getAsValue = function (key) {
        var value = this.get(key);
        return new AnyValue_1.AnyValue(value);
    };
    /**
     * Converts map element into an AnyValueArray or returns null if conversion is not possible.
     *
     * @param key       a key of element to get.
     * @returns AnyValueArray value of the element or null if conversion is not supported.
     *
     * @see [[AnyValueArray]]
     * @see [[AnyValueArray.fromValue]]
     */
    AnyValueMap.prototype.getAsNullableArray = function (key) {
        var value = this.get(key);
        return value != null ? AnyValueArray_1.AnyValueArray.fromValue(value) : null;
    };
    /**
     * Converts map element into an AnyValueArray or returns empty AnyValueArray if conversion is not possible.
     *
     * @param key       a key of element to get.
     * @returns AnyValueArray value of the element or empty AnyValueArray if conversion is not supported.
     *
     * @see [[AnyValueArray]]
     * @see [[AnyValueArray.fromValue]]
     */
    AnyValueMap.prototype.getAsArray = function (key) {
        var value = this.get(key);
        return AnyValueArray_1.AnyValueArray.fromValue(value);
    };
    /**
     * Converts map element into an AnyValueArray or returns default value if conversion is not possible.
     *
     * @param key       a key of element to get.
     * @param defaultValue  the default value
     * @returns AnyValueArray value of the element or default value if conversion is not supported.
     *
     * @see [[AnyValueArray]]
     * @see [[getAsNullableArray]]
     */
    AnyValueMap.prototype.getAsArrayWithDefault = function (key, defaultValue) {
        var result = this.getAsNullableArray(key);
        return result != null ? result : defaultValue;
    };
    /**
     * Converts map element into an AnyValueMap or returns null if conversion is not possible.
     *
     * @param key       a key of element to get.
     * @returns AnyValueMap value of the element or null if conversion is not supported.
     *
     * @see [[fromValue]]
     */
    AnyValueMap.prototype.getAsNullableMap = function (key) {
        var value = this.get(key);
        return value != null ? AnyValueMap.fromValue(value) : null;
    };
    /**
     * Converts map element into an AnyValueMap or returns empty AnyValueMap if conversion is not possible.
     *
     * @param key       a key of element to get.
     * @returns AnyValueMap value of the element or empty AnyValueMap if conversion is not supported.
     *
     * @see [[fromValue]]
     */
    AnyValueMap.prototype.getAsMap = function (key) {
        var value = this.get(key);
        return AnyValueMap.fromValue(value);
    };
    /**
     * Converts map element into an AnyValueMap or returns default value if conversion is not possible.
     *
     * @param key       a key of element to get.
     * @param defaultValue  the default value
     * @returns AnyValueMap value of the element or default value if conversion is not supported.
     *
     * @see [[getAsNullableMap]]
     */
    AnyValueMap.prototype.getAsMapWithDefault = function (key, defaultValue) {
        var result = this.getAsNullableMap(key);
        return result != null ? result : defaultValue;
    };
    /**
     * Gets a string representation of the object.
     * The result is a semicolon-separated list of key-value pairs as
     * "key1=value1;key2=value2;key=value3"
     *
     * @returns a string representation of the object.
     */
    AnyValueMap.prototype.toString = function () {
        var builder = '';
        // Todo: User encoder
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                var value = this[key];
                if (builder.length > 0)
                    builder += ';';
                if (value != null)
                    builder += key + '=' + value;
                else
                    builder += key;
            }
        }
        return builder;
    };
    /**
     * Creates a binary clone of this object.
     *
     * @returns a clone of this object.
     */
    AnyValueMap.prototype.clone = function () {
        return new AnyValueMap(this);
    };
    /**
     * Converts specified value into AnyValueMap.
     *
     * @param value     value to be converted
     * @returns         a newly created AnyValueMap.
     *
     * @see [[setAsObject]]
     */
    AnyValueMap.fromValue = function (value) {
        var result = new AnyValueMap();
        result.setAsObject(value);
        return result;
    };
    /**
     * Creates a new AnyValueMap from a list of key-value pairs called tuples.
     *
     * @param tuples    a list of values where odd elements are keys and the following even elements are values
     * @returns         a newly created AnyValueArray.
     *
     * @see [[fromTuplesArray]]
     */
    AnyValueMap.fromTuples = function () {
        var tuples = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tuples[_i] = arguments[_i];
        }
        return AnyValueMap.fromTuplesArray(tuples);
    };
    /**
     * Creates a new AnyValueMap from a list of key-value pairs called tuples.
     * The method is similar to [[fromTuples]] but tuples are passed as array instead of parameters.
     *
     * @param tuples    a list of values where odd elements are keys and the following even elements are values
     * @returns         a newly created AnyValueArray.
     */
    AnyValueMap.fromTuplesArray = function (tuples) {
        var result = new AnyValueMap();
        if (tuples == null || tuples.length == 0)
            return result;
        for (var index = 0; index < tuples.length; index += 2) {
            if (index + 1 >= tuples.length)
                break;
            var name_1 = StringConverter_1.StringConverter.toString(tuples[index]);
            var value = tuples[index + 1];
            result.setAsObject(name_1, value);
        }
        return result;
    };
    /**
     * Creates a new AnyValueMap by merging two or more maps.
     * Maps defined later in the list override values from previously defined maps.
     *
     * @param maps  an array of maps to be merged
     * @returns     a newly created AnyValueMap.
     */
    AnyValueMap.fromMaps = function () {
        var maps = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            maps[_i] = arguments[_i];
        }
        var result = new AnyValueMap();
        if (maps != null && maps.length > 0) {
            for (var index = 0; index < maps.length; index++)
                result.append(maps[index]);
        }
        return result;
    };
    return AnyValueMap;
}());
exports.AnyValueMap = AnyValueMap;
//# sourceMappingURL=AnyValueMap.js.map