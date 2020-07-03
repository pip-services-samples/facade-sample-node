"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Validation rule to combine rules with OR logical operation.
 * When one of rules returns no errors, than this rule also returns no errors.
 * When all rules return errors, than the rule returns all errors.
 *
 * @see [[IValidationRule]]
 *
 * ### Example ###
 *
 *     let schema = new Schema()
 *         .withRule(new OrRule(
 *             new ValueComparisonRule("LT", 1),
 *             new ValueComparisonRule("GT", 10)
 *         ));
 *
 *     schema.validate(0);          // Result: no error
 *     schema.validate(5);          // Result: 5 must be less than 1 or 5 must be more than 10
 *     schema.validate(20);         // Result: no error
 */
var OrRule = /** @class */ (function () {
    /**
     * Creates a new validation rule and sets its values.
     *
     * @param rules     a list of rules to join with OR operator
     */
    function OrRule() {
        var rules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rules[_i] = arguments[_i];
        }
        this._rules = rules;
    }
    /**
     * Validates a given value against this rule.
     *
     * @param path      a dot notation path to the value.
     * @param schema    a schema this rule is called from
     * @param value     a value to be validated.
     * @param results   a list with validation results to add new results.
     */
    OrRule.prototype.validate = function (path, schema, value, results) {
        if (!this._rules || this._rules.length == 0)
            return;
        var localResults = [];
        for (var i = 0; i < this._rules.length; i++) {
            var resultCount = localResults.length;
            this._rules[i].validate(path, schema, value, localResults);
            if (resultCount == localResults.length)
                return;
        }
        results.push.apply(results, localResults);
    };
    return OrRule;
}());
exports.OrRule = OrRule;
//# sourceMappingURL=OrRule.js.map