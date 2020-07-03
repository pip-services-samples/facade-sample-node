"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module errors
 *
 * Todo: Rewrite this description
 *
 * @preferred
 * Portable and localizable Exceptions classes. Each Exception, in addition to a description
 * and stack trace has a unique string code, details array (which can be used for creating
 * localized strings).
 *
 * Way to use:
 * - An existing exception class can be used.
 * - A child class that extends ApplicationException can we written.
 * - A exception can be wrapped around (into?) an existing application exception.
 *
 * Exceptions are serializable. The exception classes themselves are not serializable, but
 * they can be converted to ErrorDescriptions, which are serializable in one language, transferred
 * to the receiving side, and deserialized in another language. After deserialization, the initial
 * exception class can be restored.
 *
 * Additionally: when transferring an exception from one language to another, the exception type
 * that is closest to the initial exception type is chosen from the exceptions available in the
 * target language.
 */
var ErrorCategory_1 = require("./ErrorCategory");
exports.ErrorCategory = ErrorCategory_1.ErrorCategory;
var ErrorDescription_1 = require("./ErrorDescription");
exports.ErrorDescription = ErrorDescription_1.ErrorDescription;
var ApplicationException_1 = require("./ApplicationException");
exports.ApplicationException = ApplicationException_1.ApplicationException;
var UnknownException_1 = require("./UnknownException");
exports.UnknownException = UnknownException_1.UnknownException;
var InternalException_1 = require("./InternalException");
exports.InternalException = InternalException_1.InternalException;
var InvalidStateException_1 = require("./InvalidStateException");
exports.InvalidStateException = InvalidStateException_1.InvalidStateException;
var ConfigException_1 = require("./ConfigException");
exports.ConfigException = ConfigException_1.ConfigException;
var ConnectionException_1 = require("./ConnectionException");
exports.ConnectionException = ConnectionException_1.ConnectionException;
var InvocationException_1 = require("./InvocationException");
exports.InvocationException = InvocationException_1.InvocationException;
var FileException_1 = require("./FileException");
exports.FileException = FileException_1.FileException;
var BadRequestException_1 = require("./BadRequestException");
exports.BadRequestException = BadRequestException_1.BadRequestException;
var UnauthorizedException_1 = require("./UnauthorizedException");
exports.UnauthorizedException = UnauthorizedException_1.UnauthorizedException;
var ConflictException_1 = require("./ConflictException");
exports.ConflictException = ConflictException_1.ConflictException;
var NotFoundException_1 = require("./NotFoundException");
exports.NotFoundException = NotFoundException_1.NotFoundException;
var UnsupportedException_1 = require("./UnsupportedException");
exports.UnsupportedException = UnsupportedException_1.UnsupportedException;
var ApplicationExceptionFactory_1 = require("./ApplicationExceptionFactory");
exports.ApplicationExceptionFactory = ApplicationExceptionFactory_1.ApplicationExceptionFactory;
var ErrorDescriptionFactory_1 = require("./ErrorDescriptionFactory");
exports.ErrorDescriptionFactory = ErrorDescriptionFactory_1.ErrorDescriptionFactory;
//# sourceMappingURL=index.js.map