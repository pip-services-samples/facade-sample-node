"use strict";
/** @module errors */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Serializeable error description. It is use to pass information about errors
 * between microservices implemented in different languages. On the receiving side
 * [[ErrorDescription]] is used to recreate exception object close to its original type
 * without missing additional details.
 *
 * @see [[ApplicationException]]
 * @see [[ApplicationExceptionFactory]]
 */
var ErrorDescription = /** @class */ (function () {
    function ErrorDescription() {
    }
    return ErrorDescription;
}());
exports.ErrorDescription = ErrorDescription;
//# sourceMappingURL=ErrorDescription.js.map