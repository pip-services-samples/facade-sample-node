"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module convert */
/** @hidden */
var _ = require('lodash');
var TypeCode_1 = require("./TypeCode");
var StringConverter_1 = require("./StringConverter");
var BooleanConverter_1 = require("./BooleanConverter");
var IntegerConverter_1 = require("./IntegerConverter");
var LongConverter_1 = require("./LongConverter");
var FloatConverter_1 = require("./FloatConverter");
var DoubleConverter_1 = require("./DoubleConverter");
var DateTimeConverter_1 = require("./DateTimeConverter");
var ArrayConverter_1 = require("./ArrayConverter");
var MapConverter_1 = require("./MapConverter");
/**
 * Converts arbitrary values into objects specific by TypeCodes.
 * For each TypeCode this class calls corresponding converter which applies
 * extended conversion rules to convert the values.
 *
 * @see [[TypeCode]]
 *
 * ### Example ###
 *
 *     let value1 = TypeConverter.toType(TypeCode.Integer, "123.456"); // Result: 123
 *     let value2 = TypeConverter.toType(TypeCode.DateTime, 123); // Result: Date(123)
 *     let value3 = TypeConverter.toType(TypeCode.Boolean, "F"); // Result: false
 */
var TypeConverter = /** @class */ (function () {
    function TypeConverter() {
    }
    /**
     * Gets TypeCode for specific value.
     *
     * @param value 	value whose TypeCode is to be resolved.
     * @returns			the TypeCode that corresponds to the passed object's type.
     */
    TypeConverter.toTypeCode = function (value) {
        if (value == null)
            return TypeCode_1.TypeCode.Unknown;
        if (_.isArray(value))
            return TypeCode_1.TypeCode.Array;
        if (_.isBoolean(value))
            return TypeCode_1.TypeCode.Boolean;
        if (_.isDate(value))
            return TypeCode_1.TypeCode.DateTime;
        if (_.isInteger(value))
            return TypeCode_1.TypeCode.Long;
        if (_.isNumber(value))
            return TypeCode_1.TypeCode.Double;
        if (_.isFunction(value))
            return TypeCode_1.TypeCode.Object;
        if (_.isObject(value))
            return TypeCode_1.TypeCode.Map;
        if (_.isString(value)) {
            // if (value == "undefined")
            //     return TypeCode.Unknown;
            // if (value == "object")
            //     return TypeCode.Map;
            // if (value == "boolean")
            //     return TypeCode.Boolean;
            // if (value == "number")
            //     return TypeCode.Double;
            // if (value == "string")
            //     return TypeCode.String;
            // if (value == "function")
            //     return TypeCode.Object;
            return TypeCode_1.TypeCode.String;
        }
        return TypeCode_1.TypeCode.Object;
    };
    /**
     * Converts value into an object type specified by Type Code or returns null when conversion is not possible.
     *
     * @param type 		the TypeCode for the data type into which 'value' is to be converted.
     * @param value 	the value to convert.
     * @returns			object value of type corresponding to TypeCode, or null when conversion is not supported.
     *
     * @see [[toTypeCode]]
     */
    TypeConverter.toNullableType = function (type, value) {
        if (value == null)
            return null;
        // Convert to known types
        if (type == TypeCode_1.TypeCode.String)
            value = StringConverter_1.StringConverter.toNullableString(value);
        else if (type == TypeCode_1.TypeCode.Boolean)
            value = BooleanConverter_1.BooleanConverter.toNullableBoolean(value);
        else if (type == TypeCode_1.TypeCode.Integer)
            value = IntegerConverter_1.IntegerConverter.toNullableInteger(value);
        else if (type == TypeCode_1.TypeCode.Long)
            value = LongConverter_1.LongConverter.toNullableLong(value);
        else if (type == TypeCode_1.TypeCode.Float)
            value = FloatConverter_1.FloatConverter.toNullableFloat(value);
        else if (type == TypeCode_1.TypeCode.Double)
            value = DoubleConverter_1.DoubleConverter.toNullableDouble(value);
        else if (type == TypeCode_1.TypeCode.DateTime)
            value = DateTimeConverter_1.DateTimeConverter.toNullableDateTime(value);
        else if (type == TypeCode_1.TypeCode.Array)
            value = ArrayConverter_1.ArrayConverter.toNullableArray(value);
        else if (type == TypeCode_1.TypeCode.Map)
            value = MapConverter_1.MapConverter.toNullableMap(value);
        return value;
    };
    /**
     * Converts value into an object type specified by Type Code or returns type default when conversion is not possible.
     *
     * @param type 		the TypeCode for the data type into which 'value' is to be converted.
     * @param value 	the value to convert.
     * @returns			object value of type corresponding to TypeCode, or type default when conversion is not supported.
     *
     * @see [[toNullableType]]
     * @see [[toTypeCode]]
     */
    TypeConverter.toType = function (type, value) {
        // Convert to the specified type
        var result = TypeConverter.toNullableType(type, value);
        if (result != null)
            return result;
        // Define and return default value based on type
        if (type == TypeCode_1.TypeCode.Integer)
            value = 0;
        else if (type == TypeCode_1.TypeCode.Long)
            value = 0;
        else if (type == TypeCode_1.TypeCode.Float)
            value = 0;
        else if (type == TypeCode_1.TypeCode.Double)
            value = 0;
        else if (type == TypeCode_1.TypeCode.Boolean) // cases from here down were added by Mark Makarychev.
            value = false;
        else if (type == TypeCode_1.TypeCode.String)
            value = "";
        else if (type == TypeCode_1.TypeCode.DateTime)
            value = new Date();
        else if (type == TypeCode_1.TypeCode.Map)
            value = {};
        else if (type == TypeCode_1.TypeCode.Array)
            value = [];
        return value;
    };
    /**
     * Converts value into an object type specified by Type Code or returns default value when conversion is not possible.
     *
     * @param type 			the TypeCode for the data type into which 'value' is to be converted.
     * @param value 		the value to convert.
     * @param defaultValue	the default value to return if conversion is not possible (returns null).
     * @returns			object value of type corresponding to TypeCode, or default value when conversion is not supported.
     *
     * @see [[toNullableType]]
     * @see [[toTypeCode]]
     */
    TypeConverter.toTypeWithDefault = function (type, value, defaultValue) {
        var result = TypeConverter.toNullableType(type, value);
        return result != null ? result : defaultValue;
    };
    /**
     * Converts a TypeCode into its string name.
     *
     * @param type 	the TypeCode to convert into a string.
     * @returns		the name of the TypeCode passed as a string value.
     */
    TypeConverter.toString = function (type) {
        switch (type) {
            case TypeCode_1.TypeCode.Unknown:
                return "unknown";
            case TypeCode_1.TypeCode.String:
                return "string";
            case TypeCode_1.TypeCode.Boolean:
                return "boolean";
            case TypeCode_1.TypeCode.Integer:
                return "integer";
            case TypeCode_1.TypeCode.Long:
                return "long";
            case TypeCode_1.TypeCode.Float:
                return "float";
            case TypeCode_1.TypeCode.Double:
                return "double";
            case TypeCode_1.TypeCode.DateTime:
                return "datetime";
            case TypeCode_1.TypeCode.Duration:
                return "duration";
            case TypeCode_1.TypeCode.Object:
                return "object";
            case TypeCode_1.TypeCode.Enum:
                return "enum";
            case TypeCode_1.TypeCode.Array:
                return "array";
            case TypeCode_1.TypeCode.Map:
                return "map";
            default:
                return "unknown";
        }
    };
    return TypeConverter;
}());
exports.TypeConverter = TypeConverter;
//# sourceMappingURL=TypeConverter.js.map