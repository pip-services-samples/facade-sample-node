"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module reflect
 *
 * Todo: Rewrite this descriptor
 *
 * @preferred
 * Contains classes for data reflection. Reflects objects into parameters, methods.
 * Most programming languages contain reflections, but they are all implemented
 * differently. In the PipService framework, dynamic data types are often used. So as
 * to not rewrite these dynamic data types differently for each language,
 * this cross-language reflection package was written. All dynamic data types that are
 * built on top of this package are portable from one language to another.
 */
var MethodReflector_1 = require("./MethodReflector");
exports.MethodReflector = MethodReflector_1.MethodReflector;
var ObjectReader_1 = require("./ObjectReader");
exports.ObjectReader = ObjectReader_1.ObjectReader;
var ObjectWriter_1 = require("./ObjectWriter");
exports.ObjectWriter = ObjectWriter_1.ObjectWriter;
var PropertyReflector_1 = require("./PropertyReflector");
exports.PropertyReflector = PropertyReflector_1.PropertyReflector;
var RecursiveObjectReader_1 = require("./RecursiveObjectReader");
exports.RecursiveObjectReader = RecursiveObjectReader_1.RecursiveObjectReader;
var RecursiveObjectWriter_1 = require("./RecursiveObjectWriter");
exports.RecursiveObjectWriter = RecursiveObjectWriter_1.RecursiveObjectWriter;
var TypeDescriptor_1 = require("./TypeDescriptor");
exports.TypeDescriptor = TypeDescriptor_1.TypeDescriptor;
var TypeMatcher_1 = require("./TypeMatcher");
exports.TypeMatcher = TypeMatcher_1.TypeMatcher;
var TypeReflector_1 = require("./TypeReflector");
exports.TypeReflector = TypeReflector_1.TypeReflector;
//# sourceMappingURL=index.js.map