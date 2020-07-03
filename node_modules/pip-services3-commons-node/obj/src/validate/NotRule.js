"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationResult_1 = require("./ValidationResult");
var ValidationResultType_1 = require("./ValidationResultType");
/**
 * Validation rule negate another rule.
 * When embedded rule returns no errors, than this rule return an error.
 * When embedded rule return errors, than the rule returns no errors.
 *
 * @see [[IValidationRule]]
 *
 * ### Example ###
 *
 *     let schema = new Schema()
 *         .withRule(new NotRule(
 *             new ValueComparisonRule("EQ", 1)
 *         ));
 *
 *     schema.validate(1);          // Result: error
 *     schema.validate(5);          // Result: no error
 */
var NotRule = /** @class */ (function () {
    /**
     * Creates a new validation rule and sets its values
     *
     * @param rule     a rule to be negated.
     */
    function NotRule(rule) {
        this._rule = rule;
    }
    /**
     * Validates a given value against this rule.
     *
     * @param path      a dot notation path to the value.
     * @param schema    a schema this rule is called from
     * @param value     a value to be validated.
     * @param results   a list with validation results to add new results.
     */
    NotRule.prototype.validate = function (path, schema, value, results) {
        if (!this._rule)
            return;
        var name = path || "value";
        var localResults = [];
        this._rule.validate(path, schema, value, localResults);
        if (localResults.length > 0)
            return;
        results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "NOT_FAILED", "Negative check for " + name + " failed", null, null));
    };
    return NotRule;
}());
exports.NotRule = NotRule;
//# sourceMappingURL=NotRule.js.map