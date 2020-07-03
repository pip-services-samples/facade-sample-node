"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationResult_1 = require("./ValidationResult");
var ValidationResultType_1 = require("./ValidationResultType");
var ObjectComparator_1 = require("./ObjectComparator");
/**
 * Validation rule to check that value is excluded from the list of constants.
 *
 * @see [[IValidationRule]]
 *
 * ### Example ###
 *
 *     let schema = new Schema()
 *         .withRule(new ExcludedRule(1, 2, 3));
 *
 *     schema.validate(2);      // Result: 2 must not be one of 1, 2, 3
 *     schema.validate(10);     // Result: no errors
 */
var ExcludedRule = /** @class */ (function () {
    /**
     * Creates a new validation rule and sets its values.
     *
     * @param values    a list of constants that value must be excluded from
     */
    function ExcludedRule() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        this._values = values;
    }
    /**
     * Validates the given value. None of the values set in this ExcludedRule object must exist
     * in the value that is given for validation to pass.
     *
     * @param path      the dot notation path to the value that is to be validated.
     * @param schema    (not used in this implementation).
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     */
    ExcludedRule.prototype.validate = function (path, schema, value, results) {
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
        if (found) {
            results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "VALUE_INCLUDED", name + " must not be one of " + this._values, this._values, null));
        }
    };
    return ExcludedRule;
}());
exports.ExcludedRule = ExcludedRule;
//# sourceMappingURL=ExcludedRule.js.map