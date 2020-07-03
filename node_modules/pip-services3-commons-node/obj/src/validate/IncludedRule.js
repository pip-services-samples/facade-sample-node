"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationResult_1 = require("./ValidationResult");
var ValidationResultType_1 = require("./ValidationResultType");
var ObjectComparator_1 = require("./ObjectComparator");
/**
 * Validation rule to check that value is included into the list of constants.
 *
 * @see [[IValidationRule]]
 *
 * ### Example ###
 *
 *     let schema = new Schema()
 *         .withRule(new IncludedRule(1, 2, 3));
 *
 *     schema.validate(2);      // Result: no errors
 *     schema.validate(10);     // Result: 10 must be one of 1, 2, 3
 */
var IncludedRule = /** @class */ (function () {
    /**
     * Creates a new validation rule and sets its values.
     *
     * @param values    a list of constants that value must be included to
     */
    function IncludedRule() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        this._values = values;
    }
    /**
     * Validates a given value against this rule.
     *
     * @param path      a dot notation path to the value.
     * @param schema    a schema this rule is called from
     * @param value     a value to be validated.
     * @param results   a list with validation results to add new results.
     */
    IncludedRule.prototype.validate = function (path, schema, value, results) {
        if (!this._values)
            return;
        var name = path || "value";
        var found = false;
        for (var i = 0; i < this._values.length && !found; i++) {
            var thisValue = this._values[i];
            if (ObjectComparator_1.ObjectComparator.compare(value, 'EQ', thisValue)) {
                found = true;
                break;
            }
        }
        if (!found) {
            results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "VALUE_NOT_INCLUDED", name + " must be one of " + this._values, this._values, null));
        }
    };
    return IncludedRule;
}());
exports.IncludedRule = IncludedRule;
//# sourceMappingURL=IncludedRule.js.map