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
var Schema_1 = require("./Schema");
/**
 * Schema to validate object properties
 *
 * @see [[ObjectSchema]]
 *
 * ### Example ###
 *
 *     let schema = new ObjectSchema()
 *         .withProperty(new PropertySchema("id", TypeCode.String));
 *
 *     schema.validate({ id: "1", name: "ABC" });       // Result: no errors
 *     schema.validate({ name: "ABC" });                // Result: no errors
 *     schema.validate({ id: 1, name: "ABC" });         // Result: id type mismatch
 */
var PropertySchema = /** @class */ (function (_super) {
    __extends(PropertySchema, _super);
    /**
     * Creates a new validation schema and sets its values.
     *
     * @param name          (optional) a property name
     * @param type          (optional) a property type
     * @param required      (optional) true to always require non-null values.
     * @param rules         (optional) a list with validation rules.
     *
     * @see [[IValidationRule]]
     * @see [[TypeCode]]
     */
    function PropertySchema(name, type, required, rules) {
        var _this = _super.call(this, required, rules) || this;
        _this._name = name;
        _this._type = type;
        return _this;
    }
    /**
     * Gets the property name.
     *
     * @returns the property name.
     */
    PropertySchema.prototype.getName = function () {
        return this._name;
    };
    /**
     * Sets the property name.
     *
     * @param value     a new property name.
     */
    PropertySchema.prototype.setName = function (value) {
        this._name = value;
    };
    /**
     * Gets the property type.
     *
     * @returns the property type.
     */
    PropertySchema.prototype.getType = function () {
        return this._type;
    };
    /**
     * Sets a new property type.
     * The type can be defined as type, type name or [[TypeCode]]
     *
     * @param value     a new property type.
     */
    PropertySchema.prototype.setType = function (value) {
        this._type = value;
    };
    /**
     * Validates a given value against the schema and configured validation rules.
     *
     * @param path      a dot notation path to the value.
     * @param value     a value to be validated.
     * @param results   a list with validation results to add new results.
     */
    PropertySchema.prototype.performValidation = function (path, value, results) {
        path = path != "" ? path + "." + this.getName() : this.getName();
        _super.prototype.performValidation.call(this, path, value, results);
        _super.prototype.performTypeValidation.call(this, path, this.getType(), value, results);
    };
    return PropertySchema;
}(Schema_1.Schema));
exports.PropertySchema = PropertySchema;
//# sourceMappingURL=PropertySchema.js.map