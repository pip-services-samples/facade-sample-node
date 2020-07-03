"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationResult_1 = require("./ValidationResult");
var ObjectComparator_1 = require("./ObjectComparator");
var ValidationResultType_1 = require("./ValidationResultType");
var ObjectReader_1 = require("../reflect/ObjectReader");
/**
 * Validation rule that compares two object properties.
 *
 * @see [[IValidationRule]]
 *
 * ### Example ###
 *
 *     let schema = new ObjectSchema()
 *         .withRule(new PropertyComparisonRule("field1", "NE", "field2"));
 *
 *     schema.validate({ field1: 1, field2: 2 });       // Result: no errors
 *     schema.validate({ field1: 1, field2: 1 });       // Result: field1 shall not be equal to field2
 *     schema.validate({});                             // Result: no errors
 */
var PropertiesComparisonRule = /** @class */ (function () {
    /**
     * Creates a new validation rule and sets its arguments.
     *
     * @param property1    a name of the first property to compare.
     * @param operation    a comparison operation: "==" ("=", "EQ"), "!= " ("<>", "NE"); "<"/">" ("LT"/"GT"), "<="/">=" ("LE"/"GE"); "LIKE".
     * @param property2    a name of the second property to compare.
     *
     * @see [[ObjectComparator.compare]]
     */
    function PropertiesComparisonRule(property1, operation, property2) {
        this._property1 = property1;
        this._property2 = property2;
        this._operation = operation;
    }
    /**
     * Validates a given value against this rule.
     *
     * @param path      a dot notation path to the value.
     * @param schema    a schema this rule is called from
     * @param value     a value to be validated.
     * @param results   a list with validation results to add new results.
     */
    PropertiesComparisonRule.prototype.validate = function (path, schema, value, results) {
        var name = path || "value";
        var value1 = ObjectReader_1.ObjectReader.getProperty(value, this._property1);
        var value2 = ObjectReader_1.ObjectReader.getProperty(value, this._property2);
        if (!ObjectComparator_1.ObjectComparator.compare(value1, this._operation, value2)) {
            results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "PROPERTIES_NOT_MATCH", name + " must have " + this._property1 + " " + this._operation + " " + this._property2, value2, value1));
        }
    };
    return PropertiesComparisonRule;
}());
exports.PropertiesComparisonRule = PropertiesComparisonRule;
//# sourceMappingURL=PropertiesComparisonRule.js.map