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
var ValidationResult_1 = require("./ValidationResult");
var ValidationResultType_1 = require("./ValidationResultType");
var Schema_1 = require("./Schema");
var PropertySchema_1 = require("./PropertySchema");
var ObjectComparator_1 = require("./ObjectComparator");
var ObjectReader_1 = require("../reflect/ObjectReader");
/**
 * Schema to validate user defined objects.
 *
 * ### Example ###
 *
 *     let schema = new ObjectSchema(false)
 *         .withOptionalProperty("id", TypeCode.String)
 *         .withRequiredProperty("name", TypeCode.String);
 *
 *     schema.validate({ id: "1", name: "ABC" });       // Result: no errors
 *     schema.validate({ name: "ABC" });                // Result: no errors
 *     schema.validate({ id: 1, name: "ABC" });         // Result: id type mismatch
 *     schema.validate({ id: 1, _name: "ABC" });        // Result: name is missing, unexpected _name
 *     schema.validate("ABC");                          // Result: type mismatch
 */
var ObjectSchema = /** @class */ (function (_super) {
    __extends(ObjectSchema, _super);
    /**
     * Creates a new validation schema and sets its values.
     *
     * @param allowUndefined    true to allow properties undefines in the schema
     * @param required          (optional) true to always require non-null values.
     * @param rules             (optional) a list with validation rules.
     *
     * @see [[IValidationRule]]
     */
    function ObjectSchema(allowUndefined, required, rules) {
        var _this = _super.call(this, required, rules) || this;
        _this._allowUndefined = allowUndefined;
        return _this;
    }
    /**
     * Gets validation schemas for object properties.
     *
     * @returns the list of property validation schemas.
     *
     * @see [[PropertySchema]]
     */
    ObjectSchema.prototype.getProperties = function () {
        return this._properties;
    };
    /**
     * Sets validation schemas for object properties.
     *
     * @param value     a list of property validation schemas.
     *
     * @see [[PropertySchema]]
     */
    ObjectSchema.prototype.setProperties = function (value) {
        this._properties = value;
    };
    Object.defineProperty(ObjectSchema.prototype, "isUndefinedAllowed", {
        /**
         * Gets flag to allow undefined properties
         *
         * @returns true to allow undefined properties and false to disallow.
         */
        get: function () {
            return this._allowUndefined;
        },
        /**
         * Sets flag to allow undefined properties
         *
         * @param value     true to allow undefined properties and false to disallow.
         */
        set: function (value) {
            this._allowUndefined = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets flag to allow undefined properties
     *
     * This method returns reference to this exception to implement Builder pattern
     * to chain additional calls.
     *
     * @param value     true to allow undefined properties and false to disallow.
     * @returns this validation schema.
     */
    ObjectSchema.prototype.allowUndefined = function (value) {
        this.isUndefinedAllowed = value;
        return this;
    };
    /**
     * Adds a validation schema for an object property.
     *
     * This method returns reference to this exception to implement Builder pattern
     * to chain additional calls.
     *
     * @param schema    a property validation schema to be added.
     * @returns this validation schema.
     *
     * @see [[PropertySchema]]
     */
    ObjectSchema.prototype.withProperty = function (schema) {
        this._properties = this._properties || [];
        this._properties.push(schema);
        return this;
    };
    /**
     * Adds a validation schema for a required object property.
     *
     * @param name      a property name.
     * @param type      (optional) a property schema or type.
     * @param rules     (optional) a list of property validation rules.
     */
    ObjectSchema.prototype.withRequiredProperty = function (name, type) {
        var rules = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rules[_i - 2] = arguments[_i];
        }
        var schema = new PropertySchema_1.PropertySchema(name, type);
        schema.setRules(rules.slice());
        schema.makeRequired();
        return this.withProperty(schema);
    };
    /**
     * Adds a validation schema for an optional object property.
     *
     * @param name      a property name.
     * @param type      (optional) a property schema or type.
     * @param rules     (optional) a list of property validation rules.
     */
    ObjectSchema.prototype.withOptionalProperty = function (name, type) {
        var rules = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rules[_i - 2] = arguments[_i];
        }
        var schema = new PropertySchema_1.PropertySchema(name, type);
        schema.setRules(rules.slice());
        schema.makeOptional();
        return this.withProperty(schema);
    };
    /**
     * Validates a given value against the schema and configured validation rules.
     *
     * @param path      a dot notation path to the value.
     * @param value     a value to be validated.
     * @param results   a list with validation results to add new results.
     */
    ObjectSchema.prototype.performValidation = function (path, value, results) {
        _super.prototype.performValidation.call(this, path, value, results);
        if (!value)
            return;
        var name = path || "value";
        var properties = ObjectReader_1.ObjectReader.getProperties(value);
        if (this._properties) {
            for (var i = 0; i < this._properties.length; i++) {
                var propertySchema = this._properties[i];
                var processedName = null;
                for (var key in properties) {
                    var propertyName = key;
                    var propertyValue = properties[key];
                    if (ObjectComparator_1.ObjectComparator.areEqual(propertySchema.getName(), propertyName)) {
                        propertySchema.performValidation(path, propertyValue, results);
                        processedName = propertyName;
                        break;
                    }
                }
                if (processedName)
                    delete properties[processedName];
                else
                    propertySchema.performValidation(path, null, results);
            }
        }
        if (!this._allowUndefined)
            for (var key in properties) {
                var propertyPath = key && path != "" ? path + "." + key : key;
                results.push(new ValidationResult_1.ValidationResult(propertyPath, ValidationResultType_1.ValidationResultType.Warning, "UNEXPECTED_PROPERTY", name + " contains unexpected property " + key, null, key));
            }
    };
    return ObjectSchema;
}(Schema_1.Schema));
exports.ObjectSchema = ObjectSchema;
//# sourceMappingURL=ObjectSchema.js.map