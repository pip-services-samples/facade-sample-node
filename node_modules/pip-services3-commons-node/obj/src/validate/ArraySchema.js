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
var Schema_1 = require("./Schema");
var ValidationResult_1 = require("./ValidationResult");
var ValidationResultType_1 = require("./ValidationResultType");
var ObjectReader_1 = require("../reflect/ObjectReader");
var TypeCode_1 = require("../convert/TypeCode");
var TypeConverter_1 = require("../convert/TypeConverter");
/**
 * Schema to validate arrays.
 *
 * ### Example ###
 *
 *     let schema = new ArraySchema(TypeCode.String);
 *
 *     schema.validate(["A", "B", "C"]);    // Result: no errors
 *     schema.validate([1, 2, 3]);          // Result: element type mismatch
 *     schema.validate("A");                // Result: type mismatch
 */
var ArraySchema = /** @class */ (function (_super) {
    __extends(ArraySchema, _super);
    /**
     * Creates a new instance of validation schema and sets its values.
     *
     * @param valueType     a type of array elements. Null means that elements may have any type.
     * @param required      (optional) true to always require non-null values.
     * @param rules         (optional) a list with validation rules.
     *
     * @see [[TypeCode]]
     */
    function ArraySchema(valueType, required, rules) {
        var _this = _super.call(this, required, rules) || this;
        _this._valueType = valueType;
        return _this;
    }
    /**
     * Gets the type of array elements.
     * Null means that elements may have any type.
     *
     * @returns the type of array elements.
     */
    ArraySchema.prototype.getValueType = function () {
        return this._valueType;
    };
    /**
     * Sets the type of array elements.
     * Null means that elements may have any type.
     *
     * @param value     a type of array elements.
     */
    ArraySchema.prototype.setValueType = function (value) {
        this._valueType = value;
    };
    /**
     * Validates a given value against the schema and configured validation rules.
     *
     * @param path      a dot notation path to the value.
     * @param value     a value to be validated.
     * @param results   a list with validation results to add new results.
     */
    ArraySchema.prototype.performValidation = function (path, value, results) {
        var name = path || "value";
        value = ObjectReader_1.ObjectReader.getValue(value);
        _super.prototype.performValidation.call(this, path, value, results);
        if (!value)
            return;
        if (_.isArray(value)) {
            for (var index = 0; index < value.length; index++) {
                var elementPath = path != "" ? path + "." + index : index.toString();
                this.performTypeValidation(elementPath, this.getValueType(), value[index], results);
            }
        }
        else {
            results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "VALUE_ISNOT_ARRAY", name + " type must to be List or Array", TypeCode_1.TypeCode.Array, TypeConverter_1.TypeConverter.toTypeCode(value)));
        }
    };
    return ArraySchema;
}(Schema_1.Schema));
exports.ArraySchema = ArraySchema;
//# sourceMappingURL=ArraySchema.js.map