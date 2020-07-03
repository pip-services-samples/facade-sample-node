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
var ValidationResultType_1 = require("./ValidationResultType");
var BadRequestException_1 = require("../errors/BadRequestException");
/**
 * Errors in schema validation.
 *
 * Validation errors are usually generated based in [[ValidationResult]].
 * If using strict mode, warnings will also raise validation exceptions.
 *
 * @see [[BadRequestException]]
 * @see [[ValidationResult]]
 */
var ValidationException = /** @class */ (function (_super) {
    __extends(ValidationException, _super);
    /**
     * Creates a new instance of validation exception and assigns its values.
     *
     * @param category          (optional) a standard error category. Default: Unknown
     * @param correlation_id    (optional) a unique transaction id to trace execution through call chain.
     * @param results           (optional) a list of validation results
     * @param message           (optional) a human-readable description of the error.
     *
     * @see [[ValidationResult]]
     */
    function ValidationException(correlationId, message, results) {
        var _this = _super.call(this, correlationId, "INVALID_DATA", message || ValidationException.composeMessage(results)) || this;
        if (results)
            _this.withDetails("results", results);
        return _this;
    }
    /**
     * Composes human readable error message based on validation results.
     *
     * @param results   a list of validation results.
     * @returns a composed error message.
     *
     * @see [[ValidationResult]]
     */
    ValidationException.composeMessage = function (results) {
        var builder = "Validation failed";
        if (results && results.length > 0) {
            var first = true;
            for (var i = 0; i < results.length; i++) {
                var result = results[i];
                if (result.getType() == ValidationResultType_1.ValidationResultType.Information)
                    continue;
                builder += first ? ": " : ", ";
                builder += result.getMessage();
                first = false;
            }
        }
        return builder;
    };
    /**
     * Creates a new ValidationException based on errors in validation results.
     * If validation results have no errors, than null is returned.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param results           list of validation results that may contain errors
     * @param strict            true to treat warnings as errors.
     * @returns a newly created ValidationException or null if no errors in found.
     *
     * @see [[ValidationResult]]
     */
    ValidationException.fromResults = function (correlationId, results, strict) {
        var hasErrors = false;
        for (var i = 0; i < results.length; i++) {
            var result = results[i];
            if (result.getType() == ValidationResultType_1.ValidationResultType.Error)
                hasErrors = true;
            if (strict && result.getType() == ValidationResultType_1.ValidationResultType.Warning)
                hasErrors = true;
        }
        return hasErrors ? new ValidationException(correlationId, null, results) : null;
    };
    /**
     * Throws ValidationException based on errors in validation results.
     * If validation results have no errors, than no exception is thrown.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param results           list of validation results that may contain errors
     * @param strict            true to treat warnings as errors.
     *
     * @see [[ValidationResult]]
     * @see [[ValidationException]]
     */
    ValidationException.throwExceptionIfNeeded = function (correlationId, results, strict) {
        var ex = ValidationException.fromResults(correlationId, results, strict);
        if (ex)
            throw ex;
    };
    ValidationException.SerialVersionUid = -1459801864235223845;
    return ValidationException;
}(BadRequestException_1.BadRequestException));
exports.ValidationException = ValidationException;
//# sourceMappingURL=ValidationException.js.map