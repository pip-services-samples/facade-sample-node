"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module validate */
/** @hidden */
var _ = require('lodash');
var ValidationResult_1 = require("./ValidationResult");
var ValidationResultType_1 = require("./ValidationResultType");
var ValidationException_1 = require("./ValidationException");
var ObjectReader_1 = require("../reflect/ObjectReader");
var TypeMatcher_1 = require("../reflect/TypeMatcher");
var TypeConverter_1 = require("../convert/TypeConverter");
/**
 * Basic schema that validates values against a set of validation rules.
 *
 * This schema is used as a basis for specific schemas to validate
 * objects, project properties, arrays and maps.
 *
 * @see [[ObjectSchema]]
 * @see [[PropertySchema]]
 * @see [[ArraySchema]]
 * @see [[MapSchema]]
 */
var Schema = /** @class */ (function () {
    /**
     * Creates a new instance of validation schema and sets its values.
     *
     * @param required  (optional) true to always require non-null values.
     * @param rules     (optional) a list with validation rules.
     *
     * @see [[IValidationRule]]
     */
    function Schema(required, rules) {
        this._required = required;
        this._rules = rules;
    }
    /**
     * Gets a flag that always requires non-null values.
     * For null values it raises a validation error.
     *
     * @returns true to always require non-null values and false to allow null values.
     */
    Schema.prototype.isRequired = function () {
        return this._required;
    };
    /**
     * Sets a flag that always requires non-null values.
     *
     * @param value true to always require non-null values and false to allow null values.
     */
    Schema.prototype.setRequired = function (value) {
        this._required = value;
    };
    /**
     * Gets validation rules to check values against.
     *
     * @returns a list with validation rules.
     */
    Schema.prototype.getRules = function () {
        return this._rules;
    };
    /**
     * Sets validation rules to check values against.
     *
     * @param value a list with validation rules.
     */
    Schema.prototype.setRules = function (value) {
        this._rules = value;
    };
    /**
     * Makes validated values always required (non-null).
     * For null values the schema will raise errors.
     *
     * This method returns reference to this exception to implement Builder pattern
     * to chain additional calls.
     *
     * @returns this validation schema
     *
     * @see [[makeOptional]]
     */
    Schema.prototype.makeRequired = function () {
        this._required = true;
        return this;
    };
    /**
     * Makes validated values optional.
     * Validation for null values will be skipped.
     *
     * This method returns reference to this exception to implement Builder pattern
     * to chain additional calls.
     *
     * @returns this validation schema
     *
     * @see [[makeRequired]]
     */
    Schema.prototype.makeOptional = function () {
        this._required = false;
        return this;
    };
    /**
     * Adds validation rule to this schema.
     *
     * This method returns reference to this exception to implement Builder pattern
     * to chain additional calls.
     *
     * @param rule  a validation rule to be added.
     * @returns this validation schema.
     */
    Schema.prototype.withRule = function (rule) {
        this._rules = this._rules || [];
        this._rules.push(rule);
        return this;
    };
    /**
     * Validates a given value against the schema and configured validation rules.
     *
     * @param path      a dot notation path to the value.
     * @param value     a value to be validated.
     * @param results   a list with validation results to add new results.
     */
    Schema.prototype.performValidation = function (path, value, results) {
        var name = path || "value";
        if (value == null) {
            if (this.isRequired()) {
                results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "VALUE_IS_NULL", name + " must not be null", "NOT NULL", null));
            }
        }
        else {
            value = ObjectReader_1.ObjectReader.getValue(value);
            // Check validation rules
            if (this._rules != null) {
                for (var i = 0; i < this._rules.length; i++) {
                    var rule = this._rules[i];
                    rule.validate(path, this, value, results);
                }
            }
        }
    };
    Schema.prototype.typeToString = function (type) {
        if (type == null)
            return "unknown";
        if (_.isNumber(type))
            return TypeConverter_1.TypeConverter.toString(type);
        return type.toString();
    };
    /**
     * Validates a given value to match specified type.
     * The type can be defined as a Schema, type, a type name or [[TypeCode]]
     * When type is a Schema, it executes validation recursively against that Schema.
     *
     * @param path      a dot notation path to the value.
     * @param type      a type to match the value type
     * @param value     a value to be validated.
     * @param results   a list with validation results to add new results.
     *
     * @see [[performValidation]]
     */
    Schema.prototype.performTypeValidation = function (path, type, value, results) {
        // If type it not defined then skip
        if (type == null)
            return;
        // Perform validation against the schema
        if (type instanceof Schema) {
            var schema = type;
            schema.performValidation(path, value, results);
            return;
        }
        // If value is null then skip
        value = ObjectReader_1.ObjectReader.getValue(value);
        if (value == null)
            return;
        var name = path || "value";
        var valueType = TypeConverter_1.TypeConverter.toTypeCode(value);
        // Match types
        if (TypeMatcher_1.TypeMatcher.matchType(type, valueType, value))
            return;
        results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "TYPE_MISMATCH", name + " type must be " + this.typeToString(type) + " but found " + this.typeToString(valueType), type, valueType.toString()));
    };
    /**
     * Validates the given value and results validation results.
     *
     * @param value     a value to be validated.
     * @returns a list with validation results.
     *
     * @see [[ValidationResult]]
     */
    Schema.prototype.validate = function (value) {
        var results = [];
        this.performValidation("", value, results);
        return results;
    };
    /**
     * Validates the given value and returns a [[ValidationException]] if errors were found.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param value             a value to be validated.
     * @param strict            true to treat warnings as errors.
     */
    Schema.prototype.validateAndReturnException = function (correlationId, value, strict) {
        if (strict === void 0) { strict = false; }
        var results = this.validate(value);
        return ValidationException_1.ValidationException.fromResults(correlationId, results, strict);
    };
    /**
     * Validates the given value and throws a [[ValidationException]] if errors were found.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param value             a value to be validated.
     * @param strict            true to treat warnings as errors.
     *
     * @see [[ValidationException.throwExceptionIfNeeded]]
     */
    Schema.prototype.validateAndThrowException = function (correlationId, value, strict) {
        if (strict === void 0) { strict = false; }
        var results = this.validate(value);
        ValidationException_1.ValidationException.throwExceptionIfNeeded(correlationId, results, strict);
    };
    return Schema;
}());
exports.Schema = Schema;
//# sourceMappingURL=Schema.js.map