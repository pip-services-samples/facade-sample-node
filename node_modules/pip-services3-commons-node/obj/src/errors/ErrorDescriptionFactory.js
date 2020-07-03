"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module errors */
var ErrorCategory_1 = require("./ErrorCategory");
var ErrorDescription_1 = require("./ErrorDescription");
var ApplicationException_1 = require("./ApplicationException");
/**
 * Factory to create serializeable [[ErrorDescription]] from [[ApplicationException]]
 * or from arbitrary errors.
 *
 * The ErrorDescriptions are used to pass errors through the wire between microservices
 * implemented in different languages. They allow to restore exceptions on the receiving side
 * close to the original type and preserve additional information.
 *
 * @see [[ErrorDescription]]
 * @see [[ApplicationException]]
 */
var ErrorDescriptionFactory = /** @class */ (function () {
    function ErrorDescriptionFactory() {
    }
    /**
     * Creates a serializable ErrorDescription from error object.
     *
     * @param error  	an error object
     * @returns a serializeable ErrorDescription object that describes the error.
     */
    ErrorDescriptionFactory.create = function (error) {
        var description = new ErrorDescription_1.ErrorDescription();
        if (error instanceof ApplicationException_1.ApplicationException) {
            var ex = error;
            description.category = ex.category;
            description.status = ex.status;
            description.code = ex.code;
            description.message = ex.message;
            description.details = ex.details;
            description.correlation_id = ex.correlation_id;
            description.cause = ex.getCauseString();
            description.stack_trace = ex.getStackTraceString();
        }
        else {
            error = error || {};
            description.type = error.name;
            description.category = ErrorCategory_1.ErrorCategory.Unknown;
            description.status = 500;
            description.code = "UNKNOWN";
            description.message = error.message || error.toString();
            description.stack_trace = error.stack;
        }
        return description;
    };
    return ErrorDescriptionFactory;
}());
exports.ErrorDescriptionFactory = ErrorDescriptionFactory;
//# sourceMappingURL=ErrorDescriptionFactory.js.map