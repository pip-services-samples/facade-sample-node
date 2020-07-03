"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module reflect */
/** @hidden */
var _ = require('lodash');
/**
 * Helper class to perform method introspection and dynamic invocation.
 *
 * This class has symmetric implementation across all languages supported
 * by Pip.Services toolkit and used to support dynamic data processing.
 *
 * Because all languages have different casing and case sensitivity rules,
 * this MethodReflector treats all method names as case insensitive.
 *
 * ### Example ###
 *
 *     let myObj = new MyObject();
 *
 *     let methods = MethodReflector.getMethodNames();
 *     MethodReflector.hasMethod(myObj, "myMethod");
 *     MethodReflector.invokeMethod(myObj, "myMethod", 123);
 */
var MethodReflector = /** @class */ (function () {
    function MethodReflector() {
    }
    MethodReflector.matchMethod = function (methodName, methodValue, expectedName) {
        if (!_.isFunction(methodValue))
            return false;
        if (_.startsWith(methodName, '_'))
            return false;
        if (expectedName == null)
            return true;
        return methodName.toLowerCase() == expectedName;
    };
    /**
     * Checks if object has a method with specified name..
     *
     * @param obj 	an object to introspect.
     * @param name 	a name of the method to check.
     * @returns true if the object has the method and false if it doesn't.
     */
    MethodReflector.hasMethod = function (obj, name) {
        if (obj == null)
            throw new Error("Object cannot be null");
        if (name == null)
            throw new Error("Method name cannot be null");
        name = name.toLowerCase();
        for (var method in obj) {
            var methodValue = obj[method];
            if (MethodReflector.matchMethod(method, methodValue, name))
                return true;
        }
        return false;
    };
    /**
     * Invokes an object method by its name with specified parameters.
     *
     * @param obj 	an object to invoke.
     * @param name 	a name of the method to invoke.
     * @param args 	a list of method arguments.
     * @returns the result of the method invocation or null if method returns void.
     */
    MethodReflector.invokeMethod = function (obj, name) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (obj == null)
            throw new Error("Object cannot be null");
        if (name == null)
            throw new Error("Method name cannot be null");
        name = name.toLowerCase();
        for (var method in obj) {
            var methodValue = obj[method];
            try {
                if (MethodReflector.matchMethod(method, methodValue, name))
                    return methodValue.apply(obj, args);
            }
            catch (ex) {
                // Ignore exceptions
            }
        }
        return null;
    };
    /**
     * Gets names of all methods implemented in specified object.
     *
     * @param obj   an objec to introspect.
     * @returns a list with method names.
     */
    MethodReflector.getMethodNames = function (obj) {
        var methods = [];
        for (var method in obj) {
            var methodValue = obj[method];
            if (MethodReflector.matchMethod(method, methodValue, null))
                methods.push(method);
        }
        return methods;
    };
    return MethodReflector;
}());
exports.MethodReflector = MethodReflector;
//# sourceMappingURL=MethodReflector.js.map