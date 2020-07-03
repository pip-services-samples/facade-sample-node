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
/** @module validate */
/** @hidden */
var _ = require('lodash');
var ValidationResult_1 = require("./ValidationResult");
var ValidationResultType_1 = require("./ValidationResultType");
var Schema_1 = require("./Schema");
var ObjectReader_1 = require("../reflect/ObjectReader");
var TypeCode_1 = require("../convert/TypeCode");
var TypeConverter_1 = require("../convert/TypeConverter");
var StringConverter_1 = require("../convert/StringConverter");
/**
 * Schema to validate maps.
 *
 * ### Example ###
 *
 *     let schema = new MapSchema(TypeCode.String, TypeCode.Integer);
 *
 *     schema.validate({ "key1": "A", "key2": "B" });       // Result: no errors
 *     schema.validate({ "key1": 1, "key2": 2 });           // Result: element type mismatch
 *     schema.validate([ 1, 2, 3 ]);                        // Result: type mismatch
 */
var MapSchema = /** @class */ (function (_super) {
    __extends(MapSchema, _super);
    /**
     * Creates a new instance of validation schema and sets its values.
     *
     * @param keyType       a type of map keys. Null means that keys may have any type.
     * @param valueType     a type of map values. Null means that values may have any type.
     * @param required      (optional) true to always require non-null values.
     * @param rules         (optional) a list with validation rules.
     *
     * @see [[IValidationRule]]
     * @see [[TypeCode]]
     */
    function MapSchema(keyType, valueType, required, rules) {
        var _this = _super.call(this, required, rules) || this;
        _this._keyType = keyType;
        _this._valueType = valueType;
        return _this;
    }
    /**
     * Gets the type of map keys.
     * Null means that keys may have any type.
     *
     * @returns the type of map keys.
     */
    MapSchema.prototype.getKeyType = function () {
        return this._keyType;
    };
    /**
     * Sets the type of map keys.
     * Null means that keys may have any type.
     *
     * @param value     a type of map keys.
     */
    MapSchema.prototype.setKeyType = function (value) {
        this._keyType = value;
    };
    /**
     * Gets the type of map values.
     * Null means that values may have any type.
     *
     * @returns the type of map values.
     */
    MapSchema.prototype.getValueType = function () {
        return this._valueType;
    };
    /**
     * Sets the type of map values.
     * Null means that values may have any type.
     *
     * @param value     a type of map values.
     */
    MapSchema.prototype.setValueType = function (value) {
        this._valueType = value;
    };
    /**
     * Validates a given value against the schema and configured validation rules.
     *
     * @param path      a dot notation path to the value.
     * @param value     a value to be validated.
     * @param results   a list with validation results to add new results.
     */
    MapSchema.prototype.performValidation = function (path, value, results) {
        value = ObjectReader_1.ObjectReader.getValue(value);
        _super.prototype.performValidation.call(this, path, value, results);
        if (!value)
            return;
        var name = path || "value";
        var valueType = TypeConverter_1.TypeConverter.toTypeCode(value);
        var map = valueType === TypeCode_1.TypeCode.Map ? value : null;
        if (map) {
            for (var key in map) {
                var elementPath = path != "" ? path + "." + key : StringConverter_1.StringConverter.toString(key);
                this.performTypeValidation(elementPath, this.getKeyType(), key, results);
                this.performTypeValidation(elementPath, this.getValueType(), map[key], results);
            }
        }
        else {
            if (this.isRequired) {
                results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "VALUE_ISNOT_MAP", name + " type must be Map", TypeCode_1.TypeCode.Map, valueType));
            }
        }
    };
    return MapSchema;
}(Schema_1.Schema));
exports.MapSchema = MapSchema;
//# sourceMappingURL=MapSchema.js.map