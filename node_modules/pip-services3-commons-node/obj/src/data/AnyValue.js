"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TypeConverter_1 = require("../convert/TypeConverter");
var StringConverter_1 = require("../convert/StringConverter");
var BooleanConverter_1 = require("../convert/BooleanConverter");
var IntegerConverter_1 = require("../convert/IntegerConverter");
var LongConverter_1 = require("../convert/LongConverter");
var FloatConverter_1 = require("../convert/FloatConverter");
var DoubleConverter_1 = require("../convert/DoubleConverter");
var DateTimeConverter_1 = require("../convert/DateTimeConverter");
var AnyValueArray_1 = require("./AnyValueArray");
var AnyValueMap_1 = require("./AnyValueMap");
/**
 * Cross-language implementation of dynamic object what can hold value of any type.
 * The stored value can be converted to different types using variety of accessor methods.
 *
 * ### Example ###
 *
 *     let value1 = new AnyValue("123.456");
 *
 *     value1.getAsInteger();   // Result: 123
 *     value1.getAsString();    // Result: "123.456"
 *     value1.getAsFloat();     // Result: 123.456
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
var AnyValue = /** @class */ (function () {
    /**
     * Creates a new instance of the object and assigns its value.
     *
     * @param value     (optional) value to initialize this object.
     */
    function AnyValue(value) {
        if (value === void 0) { value = null; }
        if (value instanceof AnyValue)
            this.value = value.value;
        else
            this.value = value;
    }
    /**
     * Gets type code for the value stored in this object.
     *
     * @returns type code of the object value.
     *
     * @see [[TypeConverter.toTypeCode]]
     */
    AnyValue.prototype.getTypeCode = function () {
        return TypeConverter_1.TypeConverter.toTypeCode(this.value);
    };
    /**
     * Gets the value stored in this object without any conversions
     *
     * @returns the object value.
     */
    AnyValue.prototype.getAsObject = function () {
        return this.value;
    };
    /**
     * Sets a new value for this object
     *
     * @param value     the new object value.
     */
    AnyValue.prototype.setAsObject = function (value) {
        if (value instanceof AnyValue)
            this.value = value.value;
        else
            this.value = value;
    };
    /**
     * Converts object value into a string or returns null if conversion is not possible.
     *
     * @returns string value or null if conversion is not supported.
     *
     * @see [[StringConverter.toNullableString]]
     */
    AnyValue.prototype.getAsNullableString = function () {
        return StringConverter_1.StringConverter.toNullableString(this.value);
    };
    /**
     * Converts object value into a string or returns "" if conversion is not possible.
     *
     * @returns string value or "" if conversion is not supported.
     *
     * @see [[getAsStringWithDefault]]
     */
    AnyValue.prototype.getAsString = function () {
        return this.getAsStringWithDefault(null);
    };
    /**
     * Converts object value into a string or returns default value if conversion is not possible.
     *
     * @param defaultValue      the default value.
     * @returns string value or default if conversion is not supported.
     *
     * @see [[StringConverter.toStringWithDefault]]
     */
    AnyValue.prototype.getAsStringWithDefault = function (defaultValue) {
        return StringConverter_1.StringConverter.toStringWithDefault(this.value, defaultValue);
    };
    /**
     * Converts object value into a boolean or returns null if conversion is not possible.
     *
     * @returns boolean value or null if conversion is not supported.
     *
     * @see [[BooleanConverter.toNullableBoolean]]
     */
    AnyValue.prototype.getAsNullableBoolean = function () {
        return BooleanConverter_1.BooleanConverter.toNullableBoolean(this.value);
    };
    /**
     * Converts object value into a boolean or returns false if conversion is not possible.
     *
     * @returns string value or false if conversion is not supported.
     *
     * @see [[getAsBooleanWithDefault]]
     */
    AnyValue.prototype.getAsBoolean = function () {
        return this.getAsBooleanWithDefault(false);
    };
    /**
     * Converts object value into a boolean or returns default value if conversion is not possible.
     *
     * @param defaultValue      the default value.
     * @returns boolean value or default if conversion is not supported.
     *
     * @see [[BooleanConverter.toBooleanWithDefault]]
     */
    AnyValue.prototype.getAsBooleanWithDefault = function (defaultValue) {
        return BooleanConverter_1.BooleanConverter.toBooleanWithDefault(this.value, defaultValue);
    };
    /**
     * Converts object value into an integer or returns null if conversion is not possible.
     *
     * @returns integer value or null if conversion is not supported.
     *
     * @see [[IntegerConverter.toNullableInteger]]
     */
    AnyValue.prototype.getAsNullableInteger = function () {
        return IntegerConverter_1.IntegerConverter.toNullableInteger(this.value);
    };
    /**
     * Converts object value into an integer or returns 0 if conversion is not possible.
     *
     * @returns integer value or 0 if conversion is not supported.
     *
     * @see [[getAsIntegerWithDefault]]
     */
    AnyValue.prototype.getAsInteger = function () {
        return this.getAsIntegerWithDefault(0);
    };
    /**
     * Converts object value into a integer or returns default value if conversion is not possible.
     *
     * @param defaultValue      the default value.
     * @returns integer value or default if conversion is not supported.
     *
     * @see [[IntegerConverter.toIntegerWithDefault]]
     */
    AnyValue.prototype.getAsIntegerWithDefault = function (defaultValue) {
        return IntegerConverter_1.IntegerConverter.toIntegerWithDefault(this.value, defaultValue);
    };
    /**
     * Converts object value into a long or returns null if conversion is not possible.
     *
     * @returns long value or null if conversion is not supported.
     *
     * @see [[LongConverter.toNullableLong]]
     */
    AnyValue.prototype.getAsNullableLong = function () {
        return LongConverter_1.LongConverter.toNullableLong(this.value);
    };
    /**
     * Converts object value into a long or returns 0 if conversion is not possible.
     *
     * @returns string value or 0 if conversion is not supported.
     *
     * @see [[getAsLongWithDefault]]
     */
    AnyValue.prototype.getAsLong = function () {
        return this.getAsLongWithDefault(0);
    };
    /**
     * Converts object value into a long or returns default value if conversion is not possible.
     *
     * @param defaultValue      the default value.
     * @returns long value or default if conversion is not supported.
     *
     * @see [[LongConverter.toLongWithDefault]]
     */
    AnyValue.prototype.getAsLongWithDefault = function (defaultValue) {
        return LongConverter_1.LongConverter.toLongWithDefault(this.value, defaultValue);
    };
    /**
     * Converts object value into a float or returns null if conversion is not possible.
     *
     * @returns float value or null if conversion is not supported.
     *
     * @see [[FloatConverter.toNullableFloat]]
     */
    AnyValue.prototype.getAsNullableFloat = function () {
        return FloatConverter_1.FloatConverter.toNullableFloat(this.value);
    };
    /**
     * Converts object value into a float or returns 0 if conversion is not possible.
     *
     * @returns float value or 0 if conversion is not supported.
     *
     * @see [[getAsFloatWithDefault]]
     */
    AnyValue.prototype.getAsFloat = function () {
        return this.getAsFloatWithDefault(0);
    };
    /**
     * Converts object value into a float or returns default value if conversion is not possible.
     *
     * @param defaultValue      the default value.
     * @returns float value or default if conversion is not supported.
     *
     * @see [[FloatConverter.toFloatWithDefault]]
     */
    AnyValue.prototype.getAsFloatWithDefault = function (defaultValue) {
        return FloatConverter_1.FloatConverter.toFloatWithDefault(this.value, defaultValue);
    };
    /**
     * Converts object value into a double or returns null if conversion is not possible.
     *
     * @returns double value or null if conversion is not supported.
     *
     * @see [[DoubleConverter.toNullableDouble]]
     */
    AnyValue.prototype.getAsNullableDouble = function () {
        return DoubleConverter_1.DoubleConverter.toNullableDouble(this.value);
    };
    /**
     * Converts object value into a double or returns 0 if conversion is not possible.
     *
     * @returns double value or 0 if conversion is not supported.
     *
     * @see [[getAsDoubleWithDefault]]
     */
    AnyValue.prototype.getAsDouble = function () {
        return this.getAsDoubleWithDefault(0);
    };
    /**
     * Converts object value into a double or returns default value if conversion is not possible.
     *
     * @param defaultValue      the default value.
     * @returns double value or default if conversion is not supported.
     *
     * @see [[DoubleConverter.toDoubleWithDefault]]
     */
    AnyValue.prototype.getAsDoubleWithDefault = function (defaultValue) {
        return DoubleConverter_1.DoubleConverter.toDoubleWithDefault(this.value, defaultValue);
    };
    /**
     * Converts object value into a Date or returns null if conversion is not possible.
     *
     * @returns Date value or null if conversion is not supported.
     *
     * @see [[DateTimeConverter.toNullableDateTime]]
     */
    AnyValue.prototype.getAsNullableDateTime = function () {
        return DateTimeConverter_1.DateTimeConverter.toNullableDateTime(this.value);
    };
    /**
     * Converts object value into a Date or returns current date if conversion is not possible.
     *
     * @returns Date value or current date if conversion is not supported.
     *
     * @see [[getAsDateTimeWithDefault]]
     */
    AnyValue.prototype.getAsDateTime = function () {
        return this.getAsDateTimeWithDefault(new Date());
    };
    /**
     * Converts object value into a Date or returns default value if conversion is not possible.
     *
     * @param defaultValue      the default value.
     * @returns Date value or default if conversion is not supported.
     *
     * @see [[DateTimeConverter.toDateTimeWithDefault]]
     */
    AnyValue.prototype.getAsDateTimeWithDefault = function (defaultValue) {
        return DateTimeConverter_1.DateTimeConverter.toDateTimeWithDefault(this.value, defaultValue);
    };
    /**
     * Converts object value into a value defined by specied typecode.
     * If conversion is not possible it returns null.
     *
     * @param type      the TypeCode that defined the type of the result
     * @returns value defined by the typecode or null if conversion is not supported.
     *
     * @see [[TypeConverter.toNullableType]]
     */
    AnyValue.prototype.getAsNullableType = function (type) {
        return TypeConverter_1.TypeConverter.toNullableType(type, this.value);
    };
    /**
     * Converts object value into a value defined by specied typecode.
     * If conversion is not possible it returns default value for the specified type.
     *
     * @param typeCode    the TypeCode that defined the type of the result
     * @returns value defined by the typecode or type default value if conversion is not supported.
     *
     * @see [[getAsTypeWithDefault]]
     */
    AnyValue.prototype.getAsType = function (typeCode) {
        return this.getAsTypeWithDefault(typeCode, null);
    };
    /**
     * Converts object value into a value defined by specied typecode.
     * If conversion is not possible it returns default value.
     *
     * @param typeCode      the TypeCode that defined the type of the result
     * @param defaultValue  the default value
     * @returns value defined by the typecode or type default value if conversion is not supported.
     *
     * @see [[TypeConverter.toTypeWithDefault]]
     */
    AnyValue.prototype.getAsTypeWithDefault = function (typeCode, defaultValue) {
        return TypeConverter_1.TypeConverter.toTypeWithDefault(typeCode, this.value, defaultValue);
    };
    /**
     * Converts object value into an AnyArray or returns empty AnyArray if conversion is not possible.
     *
     * @returns AnyArray value or empty AnyArray if conversion is not supported.
     *
     * @see [[AnyValueArray.fromValue]]
     */
    AnyValue.prototype.getAsArray = function () {
        return AnyValueArray_1.AnyValueArray.fromValue(this.value);
    };
    /**
     * Converts object value into AnyMap or returns empty AnyMap if conversion is not possible.
     *
     * @returns AnyMap value or empty AnyMap if conversion is not supported.
     *
     * @see [[AnyValueMap.fromValue]]
     */
    AnyValue.prototype.getAsMap = function () {
        return AnyValueMap_1.AnyValueMap.fromValue(this.value);
    };
    /**
     * Compares this object value to specified specified value.
     * When direct comparison gives negative results it tries
     * to compare values as strings.
     *
     * @param obj   the value to be compared with.
     * @returns     true when objects are equal and false otherwise.
     */
    AnyValue.prototype.equals = function (obj) {
        if (obj == null && this.value == null)
            return true;
        if (obj == null || this.value == null)
            return false;
        if (obj instanceof AnyValue)
            obj = obj.value;
        var strThisValue = StringConverter_1.StringConverter.toString(this.value);
        var strValue = StringConverter_1.StringConverter.toString(obj);
        if (strThisValue == null && strValue == null)
            return true;
        if (strThisValue == null || strValue == null)
            return false;
        return strThisValue == strValue;
    };
    /**
     * Compares this object value to specified specified value.
     * When direct comparison gives negative results it converts
     * values to type specified by type code and compare them again.
     *
     * @param obj   the value to be compared with.
     * @returns     true when objects are equal and false otherwise.
     *
     * @see [[TypeConverter.toType]]
     */
    AnyValue.prototype.equalsAsType = function (type, obj) {
        if (obj == null && this.value == null)
            return true;
        if (obj == null || this.value == null)
            return false;
        if (obj instanceof AnyValue)
            obj = obj.value;
        var typedThisValue = TypeConverter_1.TypeConverter.toType(type, this.value);
        var typedValue = TypeConverter_1.TypeConverter.toType(type, obj);
        if (typedThisValue == null && typedValue == null)
            return true;
        if (typedThisValue == null || typedValue == null)
            return false;
        return typedThisValue == typedValue;
    };
    /**
     * Creates a binary clone of this object.
     *
     * @returns a clone of this object.
     */
    AnyValue.prototype.clone = function () {
        return new AnyValue(this.value);
    };
    /**
     * Gets a string representation of the object.
     *
     * @returns a string representation of the object.
     *
     * @see [[StringConverter.toString]]
     */
    AnyValue.prototype.toString = function () {
        return StringConverter_1.StringConverter.toString(this.value);
    };
    /**
     * Gets an object hash code which can be used to optimize storing and searching.
     *
     * @returns an object hash code.
     */
    AnyValue.prototype.hashCode = function () {
        return this.value != null ? this.value.hashCode() : 0;
    };
    return AnyValue;
}());
exports.AnyValue = AnyValue;
//# sourceMappingURL=AnyValue.js.map