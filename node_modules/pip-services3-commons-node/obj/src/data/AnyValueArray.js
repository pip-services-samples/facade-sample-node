"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var ArrayConverter_1 = require("../convert/ArrayConverter");
var AnyValue_1 = require("./AnyValue");
var AnyValueMap_1 = require("./AnyValueMap");
/**
 * Cross-language implementation of dynamic object array what can hold values of any type.
 * The stored values can be converted to different types using variety of accessor methods.
 *
 * ### Example ###
 *
 *     let value1 = new AnyValueArray([1, "123.456", "2018-01-01"]);
 *
 *     value1.getAsBoolean(0);   // Result: true
 *     value1.getAsInteger(1);   // Result: 123
 *     value1.getAsFloat(1);     // Result: 123.456
 *     value1.getAsDateTime(2);  // Result: new Date(2018,0,1)
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
var AnyValueArray = /** @class */ (function (_super) {
    __extends(AnyValueArray, _super);
    /**
     * Creates a new instance of the array and assigns its value.
     *
     * @param value     (optional) values to initialize this array.
     */
    function AnyValueArray(values) {
        if (values === void 0) { values = null; }
        var _this = _super.call(this) || this;
        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        _this.__proto__ = AnyValueArray.prototype;
        _this.append(values);
        return _this;
    }
    /**
     * Gets an array element specified by its index.
     *
     * @param index     an index of the element to get.
     * @returns         the value of the array element.
     */
    AnyValueArray.prototype.get = function (index) {
        return this[index];
    };
    /**
     * Puts a new value into array element specified by its index.
     *
     * @param index     an index of the element to put.
     * @param value     a new value for array element.
     */
    AnyValueArray.prototype.put = function (index, value) {
        this[index] = value;
    };
    /**
     * Removes an array element specified by its index
     *
     * @param index     an index of the element to remove.
     */
    AnyValueArray.prototype.remove = function (index) {
        this.splice(index, 1);
    };
    /**
     * Appends new elements to this array.
     *
     * @param elements  a list of elements to be added.
     */
    AnyValueArray.prototype.append = function (elements) {
        if (elements != null) {
            for (var index = 0; index < elements.length; index++)
                this.push(elements[index]);
        }
    };
    /**
     * Clears this array by removing all its elements.
    */
    AnyValueArray.prototype.clear = function () {
        this.splice(0, this.length);
    };
    /**
     * Gets the value stored in array element without any conversions.
     * When element index is not defined it returns the entire array value.
     *
     * @param index     (optional) an index of the element to get
     * @returns the element value or value of the array when index is not defined.
     */
    AnyValueArray.prototype.getAsObject = function (index) {
        if (index === void 0) { index = undefined; }
        if (index === undefined) {
            var result = [];
            for (index = 0; index < this.length; index++)
                result.push(this[index]);
            return result;
        }
        else {
            return this[index];
        }
    };
    /**
     * Sets a new value to array element specified by its index.
     * When the index is not defined, it resets the entire array value.
     * This method has double purpose because method overrides are not supported in JavaScript.
     *
     * @param index     (optional) an index of the element to set
     * @param value     a new element or array value.
     *
     * @see [[ArrayConverter.toArray]]
     */
    AnyValueArray.prototype.setAsObject = function (index, value) {
        if (value === void 0) { value = undefined; }
        if (value === undefined) {
            value = index; //originally was not present - added by Mark Makarychev.
            this.clear();
            var elements = ArrayConverter_1.ArrayConverter.toArray(value);
            this.append(elements);
        }
        else {
            this[index] = value;
        }
    };
    /**
     * Converts array element into a string or returns null if conversion is not possible.
     *
     * @param index     an index of element to get.
     * @returns string value of the element or null if conversion is not supported.
     *
     * @see [[StringConverter.toNullableString]]
     */
    AnyValueArray.prototype.getAsNullableString = function (index) {
        var value = this[index];
        return StringConverter_1.StringConverter.toNullableString(value);
    };
    /**
     * Converts array element into a string or returns "" if conversion is not possible.
     *
     * @param index     an index of element to get.
     * @returns string value ot the element or "" if conversion is not supported.
     *
     * @see [[getAsStringWithDefault]]
     */
    AnyValueArray.prototype.getAsString = function (index) {
        return this.getAsStringWithDefault(index, null);
    };
    /**
     * Converts array element into a string or returns default value if conversion is not possible.
     *
     * @param index         an index of element to get.
     * @param defaultValue  the default value
     * @returns string value ot the element or default value if conversion is not supported.
     *
     * @see [[StringConverter.toStringWithDefault]]
     */
    AnyValueArray.prototype.getAsStringWithDefault = function (index, defaultValue) {
        var value = this[index];
        return StringConverter_1.StringConverter.toStringWithDefault(value, defaultValue);
    };
    /**
     * Converts array element into a boolean or returns null if conversion is not possible.
     *
     * @param index     an index of element to get.
     * @returns boolean value of the element or null if conversion is not supported.
     *
     * @see [[BooleanConverter.toNullableBoolean]]
     */
    AnyValueArray.prototype.getAsNullableBoolean = function (index) {
        var value = this[index];
        return BooleanConverter_1.BooleanConverter.toNullableBoolean(value);
    };
    /**
     * Converts array element into a boolean or returns false if conversion is not possible.
     *
     * @param index     an index of element to get.
     * @returns boolean value ot the element or false if conversion is not supported.
     *
     * @see [[getAsBooleanWithDefault]]
     */
    AnyValueArray.prototype.getAsBoolean = function (index) {
        return this.getAsBooleanWithDefault(index, false);
    };
    /**
     * Converts array element into a boolean or returns default value if conversion is not possible.
     *
     * @param index         an index of element to get.
     * @param defaultValue  the default value
     * @returns boolean value ot the element or default value if conversion is not supported.
     *
     * @see [[BooleanConverter.toBooleanWithDefault]]
     */
    AnyValueArray.prototype.getAsBooleanWithDefault = function (index, defaultValue) {
        var value = this[index];
        return BooleanConverter_1.BooleanConverter.toBooleanWithDefault(value, defaultValue);
    };
    /**
     * Converts array element into an integer or returns null if conversion is not possible.
     *
     * @param index     an index of element to get.
     * @returns integer value of the element or null if conversion is not supported.
     *
     * @see [[IntegerConverter.toNullableInteger]]
     */
    AnyValueArray.prototype.getAsNullableInteger = function (index) {
        var value = this[index];
        return IntegerConverter_1.IntegerConverter.toNullableInteger(value);
    };
    /**
     * Converts array element into an integer or returns 0 if conversion is not possible.
     *
     * @param index     an index of element to get.
     * @returns integer value ot the element or 0 if conversion is not supported.
     *
     * @see [[getAsIntegerWithDefault]]
     */
    AnyValueArray.prototype.getAsInteger = function (index) {
        return this.getAsIntegerWithDefault(index, 0);
    };
    /**
     * Converts array element into an integer or returns default value if conversion is not possible.
     *
     * @param index         an index of element to get.
     * @param defaultValue  the default value
     * @returns integer value ot the element or default value if conversion is not supported.
     *
     * @see [[IntegerConverter.toIntegerWithDefault]]
     */
    AnyValueArray.prototype.getAsIntegerWithDefault = function (index, defaultValue) {
        var value = this[index];
        return IntegerConverter_1.IntegerConverter.toIntegerWithDefault(value, defaultValue);
    };
    /**
     * Converts array element into a long or returns null if conversion is not possible.
     *
     * @param index     an index of element to get.
     * @returns long value of the element or null if conversion is not supported.
     *
     * @see [[LongConverter.toNullableLong]]
     */
    AnyValueArray.prototype.getAsNullableLong = function (index) {
        var value = this[index];
        return LongConverter_1.LongConverter.toNullableLong(value);
    };
    /**
     * Converts array element into a long or returns 0 if conversion is not possible.
     *
     * @param index     an index of element to get.
     * @returns long value ot the element or 0 if conversion is not supported.
     *
     * @see [[getAsLongWithDefault]]
     */
    AnyValueArray.prototype.getAsLong = function (index) {
        return this.getAsLongWithDefault(index, 0);
    };
    /**
     * Converts array element into a long or returns default value if conversion is not possible.
     *
     * @param index         an index of element to get.
     * @param defaultValue  the default value
     * @returns long value ot the element or default value if conversion is not supported.
     *
     * @see [[LongConverter.toLongWithDefault]]
     */
    AnyValueArray.prototype.getAsLongWithDefault = function (index, defaultValue) {
        var value = this[index];
        return LongConverter_1.LongConverter.toLongWithDefault(value, defaultValue);
    };
    /**
     * Converts array element into a float or returns null if conversion is not possible.
     *
     * @param index     an index of element to get.
     * @returns float value of the element or null if conversion is not supported.
     *
     * @see [[FloatConverter.toNullableFloat]]
     */
    AnyValueArray.prototype.getAsNullableFloat = function (index) {
        var value = this[index];
        return FloatConverter_1.FloatConverter.toNullableFloat(value);
    };
    /**
     * Converts array element into a float or returns 0 if conversion is not possible.
     *
     * @param index     an index of element to get.
     * @returns float value ot the element or 0 if conversion is not supported.
     *
     * @see [[getAsFloatWithDefault]]
     */
    AnyValueArray.prototype.getAsFloat = function (index) {
        return this.getAsFloatWithDefault(index, 0);
    };
    /**
     * Converts array element into a float or returns default value if conversion is not possible.
     *
     * @param index         an index of element to get.
     * @param defaultValue  the default value
     * @returns float value ot the element or default value if conversion is not supported.
     *
     * @see [[FloatConverter.toFloatWithDefault]]
     */
    AnyValueArray.prototype.getAsFloatWithDefault = function (index, defaultValue) {
        var value = this[index];
        return FloatConverter_1.FloatConverter.toFloatWithDefault(value, defaultValue);
    };
    /**
     * Converts array element into a double or returns null if conversion is not possible.
     *
     * @param index     an index of element to get.
     * @returns double value of the element or null if conversion is not supported.
     *
     * @see [[DoubleConverter.toNullableDouble]]
     */
    AnyValueArray.prototype.getAsNullableDouble = function (index) {
        var value = this[index];
        return DoubleConverter_1.DoubleConverter.toNullableDouble(value);
    };
    /**
     * Converts array element into a double or returns 0 if conversion is not possible.
     *
     * @param index     an index of element to get.
     * @returns double value ot the element or 0 if conversion is not supported.
     *
     * @see [[getAsDoubleWithDefault]]
     */
    AnyValueArray.prototype.getAsDouble = function (index) {
        return this.getAsDoubleWithDefault(index, 0);
    };
    /**
     * Converts array element into a double or returns default value if conversion is not possible.
     *
     * @param index         an index of element to get.
     * @param defaultValue  the default value
     * @returns double value ot the element or default value if conversion is not supported.
     *
     * @see [[DoubleConverter.toDoubleWithDefault]]
     */
    AnyValueArray.prototype.getAsDoubleWithDefault = function (index, defaultValue) {
        var value = this[index];
        return DoubleConverter_1.DoubleConverter.toDoubleWithDefault(value, defaultValue);
    };
    /**
     * Converts array element into a Date or returns null if conversion is not possible.
     *
     * @param index     an index of element to get.
     * @returns Date value of the element or null if conversion is not supported.
     *
     * @see [[DateTimeConverter.toNullableDateTime]]
     */
    AnyValueArray.prototype.getAsNullableDateTime = function (index) {
        var value = this[index];
        return DateTimeConverter_1.DateTimeConverter.toNullableDateTime(value);
    };
    /**
     * Converts array element into a Date or returns the current date if conversion is not possible.
     *
     * @param index     an index of element to get.
     * @returns Date value ot the element or the current date if conversion is not supported.
     *
     * @see [[getAsDateTimeWithDefault]]
     */
    AnyValueArray.prototype.getAsDateTime = function (index) {
        return this.getAsDateTimeWithDefault(index, new Date());
    };
    /**
     * Converts array element into a Date or returns default value if conversion is not possible.
     *
     * @param index         an index of element to get.
     * @param defaultValue  the default value
     * @returns Date value ot the element or default value if conversion is not supported.
     *
     * @see [[DateTimeConverter.toDateTimeWithDefault]]
     */
    AnyValueArray.prototype.getAsDateTimeWithDefault = function (index, defaultValue) {
        var value = this[index];
        return DateTimeConverter_1.DateTimeConverter.toDateTimeWithDefault(value, defaultValue);
    };
    /**
     * Converts array element into a value defined by specied typecode.
     * If conversion is not possible it returns null.
     *
     * @param type      the TypeCode that defined the type of the result
     * @param index     an index of element to get.
     * @returns element value defined by the typecode or null if conversion is not supported.
     *
     * @see [[TypeConverter.toNullableType]]
     */
    AnyValueArray.prototype.getAsNullableType = function (type, index) {
        var value = this[index];
        return TypeConverter_1.TypeConverter.toNullableType(type, value);
    };
    /**
     * Converts array element into a value defined by specied typecode.
     * If conversion is not possible it returns default value for the specified type.
     *
     * @param type      the TypeCode that defined the type of the result
     * @param index     an index of element to get.
     * @returns element value defined by the typecode or default if conversion is not supported.
     *
     * @see [[getAsTypeWithDefault]]
     */
    AnyValueArray.prototype.getAsType = function (type, index) {
        return this.getAsTypeWithDefault(type, index, null);
    };
    /**
     * Converts array element into a value defined by specied typecode.
     * If conversion is not possible it returns default value.
     *
     * @param type          the TypeCode that defined the type of the result
     * @param index         an index of element to get.
     * @param defaultValue  the default value
     * @returns element value defined by the typecode or default value if conversion is not supported.
     *
     * @see [[TypeConverter.toTypeWithDefault]]
     */
    AnyValueArray.prototype.getAsTypeWithDefault = function (type, index, defaultValue) {
        var value = this[index];
        return TypeConverter_1.TypeConverter.toTypeWithDefault(type, value, defaultValue);
    };
    /**
     * Converts array element into an AnyValue or returns an empty AnyValue if conversion is not possible.
     *
     * @param index     an index of element to get.
     * @returns AnyValue value of the element or empty AnyValue if conversion is not supported.
     *
     * @see [[AnyValue]]
     * @see [[AnyValue.constructor]]
     */
    AnyValueArray.prototype.getAsValue = function (index) {
        var value = this[index];
        return new AnyValue_1.AnyValue(value);
    };
    /**
     * Converts array element into an AnyValueArray or returns null if conversion is not possible.
     *
     * @param index     an index of element to get.
     * @returns AnyValueArray value of the element or null if conversion is not supported.
     *
     * @see [[fromValue]]
     */
    AnyValueArray.prototype.getAsNullableArray = function (index) {
        var value = this[index];
        return value != null ? AnyValueArray.fromValue(value) : null;
    };
    /**
     * Converts array element into an AnyValueArray or returns empty AnyValueArray if conversion is not possible.
     *
     * @param index     an index of element to get.
     * @returns AnyValueArray value of the element or empty AnyValueArray if conversion is not supported.
     *
     * @see [[fromValue]]
     */
    AnyValueArray.prototype.getAsArray = function (index) {
        var value = this[index];
        return AnyValueArray.fromValue(value);
    };
    /**
     * Converts array element into an AnyValueArray or returns default value if conversion is not possible.
     *
     * @param index         an index of element to get.
     * @param defaultValue  the default value
     * @returns AnyValueArray value of the element or default value if conversion is not supported.
     *
     * @see [[getAsNullableArray]]
     */
    AnyValueArray.prototype.getAsArrayWithDefault = function (index, defaultValue) {
        var result = this.getAsNullableArray(index);
        return result != null ? result : defaultValue;
    };
    /**
     * Converts array element into an AnyValueMap or returns null if conversion is not possible.
     *
     * @param index     an index of element to get.
     * @returns AnyValueMap value of the element or null if conversion is not supported.
     *
     * @see [[AnyValueMap]]
     * @see [[AnyValueMap.fromValue]]
     */
    AnyValueArray.prototype.getAsNullableMap = function (index) {
        var value = this[index];
        return value != null ? AnyValueMap_1.AnyValueMap.fromValue(value) : null;
    };
    /**
     * Converts array element into an AnyValueMap or returns empty AnyValueMap if conversion is not possible.
     *
     * @param index     an index of element to get.
     * @returns AnyValueMap value of the element or empty AnyValueMap if conversion is not supported.
     *
     * @see [[AnyValueMap]]
     * @see [[AnyValueMap.fromValue]]
     */
    AnyValueArray.prototype.getAsMap = function (index) {
        var value = this[index];
        return AnyValueMap_1.AnyValueMap.fromValue(value);
    };
    /**
     * Converts array element into an AnyValueMap or returns default value if conversion is not possible.
     *
     * @param index         an index of element to get.
     * @param defaultValue  the default value
     * @returns AnyValueMap value of the element or default value if conversion is not supported.
     *
     * @see [[getAsNullableMap]]
     */
    AnyValueArray.prototype.getAsMapWithDefault = function (index, defaultValue) {
        var result = this.getAsNullableMap(index);
        return result != null ? AnyValueMap_1.AnyValueMap.fromValue(result) : defaultValue;
    };
    /**
     * Checks if this array contains a value.
     * The check uses direct comparison between elements and the specified value.
     *
     * @param value     a value to be checked
     * @returns         true if this array contains the value or false otherwise.
     */
    AnyValueArray.prototype.contains = function (value) {
        for (var index = 0; index < this.length; index++) {
            var element = this[index];
            if (value == null && element == null)
                return true;
            if (value == null || element == null)
                continue;
            if (value == element)
                return true;
        }
        return false;
    };
    /**
     * Checks if this array contains a value.
     * The check before comparison converts elements and the value to type specified by type code.
     *
     * @param typeCode  a type code that defines a type to convert values before comparison
     * @param value     a value to be checked
     * @returns         true if this array contains the value or false otherwise.
     *
     * @see [[TypeConverter.toType]]
     * @see [[TypeConverter.toNullableType]]
     */
    AnyValueArray.prototype.containsAsType = function (typeCode, value) {
        var typedValue = TypeConverter_1.TypeConverter.toType(typeCode, value);
        for (var index = 0; index < this.length; index++) {
            var thisTypedValue = TypeConverter_1.TypeConverter.toNullableType(typeCode, this[index]);
            if (typedValue == null && thisTypedValue == null)
                return true;
            if (typedValue == null || thisTypedValue == null)
                continue;
            if (typedValue == thisTypedValue)
                return true;
        }
        return false;
    };
    /**
     * Creates a binary clone of this object.
     *
     * @returns a clone of this object.
     */
    AnyValueArray.prototype.clone = function () {
        return new AnyValueArray(this);
    };
    /**
     * Gets a string representation of the object.
     * The result is a comma-separated list of string representations of individual elements as
     * "value1,value2,value3"
     *
     * @returns a string representation of the object.
     *
     * @see [[StringConverter.toString]]
     */
    AnyValueArray.prototype.toString = function () {
        var builder = '';
        for (var index = 0; index < this.length; index++) {
            if (index > 0)
                builder += ',';
            builder += this.getAsStringWithDefault(index, "");
        }
        return builder;
    };
    /**
     * Creates a new AnyValueArray from a list of values
     *
     * @param values    a list of values to initialize the created AnyValueArray
     * @returns         a newly created AnyValueArray.
     */
    AnyValueArray.fromValues = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new AnyValueArray(values);
    };
    /**
     * Converts specified value into AnyValueArray.
     *
     * @param value     value to be converted
     * @returns         a newly created AnyValueArray.
     *
     * @see [[ArrayConverter.toNullableArray]]
     */
    AnyValueArray.fromValue = function (value) {
        var values = ArrayConverter_1.ArrayConverter.toNullableArray(value);
        return new AnyValueArray(values);
    };
    /**
     * Splits specified string into elements using a separator and assigns
     * the elements to a newly created AnyValueArray.
     *
     * @param values            a string value to be split and assigned to AnyValueArray
     * @param separator         a separator to split the string
     * @param removeDuplicates  (optional) true to remove duplicated elements
     * @returns                 a newly created AnyValueArray.
     */
    AnyValueArray.fromString = function (values, separator, removeDuplicates) {
        if (removeDuplicates === void 0) { removeDuplicates = false; }
        var result = new AnyValueArray();
        if (values == null || values.length == 0)
            return result;
        var items = values.split(separator, -1);
        for (var index = 0; index < items.length; index++) {
            var item = items[index];
            if ((item != null && item.length > 0) || removeDuplicates == false)
                result.push(item != null ? new AnyValue_1.AnyValue(item) : null);
        }
        return result;
    };
    return AnyValueArray;
}(Array));
exports.AnyValueArray = AnyValueArray;
//# sourceMappingURL=AnyValueArray.js.map