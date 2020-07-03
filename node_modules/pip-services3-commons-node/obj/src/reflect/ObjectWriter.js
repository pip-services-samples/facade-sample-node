"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module reflect */
/** @hidden */
var _ = require('lodash');
var PropertyReflector_1 = require("./PropertyReflector");
var IntegerConverter_1 = require("../convert/IntegerConverter");
/**
 * Helper class to perform property introspection and dynamic writing.
 *
 * In contrast to [[PropertyReflector]] which only introspects regular objects,
 * this ObjectWriter is also able to handle maps and arrays.
 * For maps properties are key-pairs identified by string keys,
 * For arrays properties are elements identified by integer index.
 *
 * This class has symmetric implementation across all languages supported
 * by Pip.Services toolkit and used to support dynamic data processing.
 *
 * Because all languages have different casing and case sensitivity rules,
 * this ObjectWriter treats all property names as case insensitive.
 *
 * @see [[PropertyReflector]]
 *
 * ### Example ###
 *
 *     let myObj = new MyObject();
 *
 *     ObjectWriter.setProperty(myObj, "myProperty", 123);
 *
 *     let myMap = { key1: 123, key2: "ABC" };
 *     ObjectWriter.setProperty(myMap, "key1", "XYZ");
 *
 *     let myArray = [1, 2, 3]
 *     ObjectWriter.setProperty(myArray, "0", 123);
 */
var ObjectWriter = /** @class */ (function () {
    function ObjectWriter() {
    }
    /**
     * Sets value of object property specified by its name.
     *
     * The object can be a user defined object, map or array.
     * The property name correspondently must be object property,
     * map key or array index.
     *
     * If the property does not exist or introspection fails
     * this method doesn't do anything and doesn't any throw errors.
     *
     * @param obj 	an object to write property to.
     * @param name 	a name of the property to set.
     * @param value a new value for the property to set.
     */
    ObjectWriter.setProperty = function (obj, name, value) {
        if (obj == null)
            throw new Error("Object cannot be null");
        if (name == null)
            throw new Error("Property name cannot be null");
        if (_.isObject(obj) && !_.isDate(obj)) {
            PropertyReflector_1.PropertyReflector.setProperty(obj, name, value);
        }
        else if (_.isArray(obj)) {
            var index = IntegerConverter_1.IntegerConverter.toNullableInteger(name);
            if (index >= 0) {
                while (index < obj.length - 1)
                    obj.push(null);
                obj[index] = value;
            }
        }
    };
    /**
     * Sets values of some (all) object properties.
     *
     * The object can be a user defined object, map or array.
     * Property values correspondently are object properties,
     * map key-pairs or array elements with their indexes.
     *
     * If some properties do not exist or introspection fails
     * they are just silently skipped and no errors thrown.
     *
     * @param obj 		 an object to write properties to.
     * @param values 	a map, containing property names and their values.
     *
     * @see [[setProperty]]
     */
    ObjectWriter.setProperties = function (obj, values) {
        if (values == null)
            return;
        for (var key in values) {
            var value = values[key];
            ObjectWriter.setProperty(obj, key, value);
        }
    };
    return ObjectWriter;
}());
exports.ObjectWriter = ObjectWriter;
//# sourceMappingURL=ObjectWriter.js.map