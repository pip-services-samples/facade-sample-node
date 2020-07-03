"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module reflect */
/** @hidden */
var _ = require('lodash');
var IntegerConverter_1 = require("../convert/IntegerConverter");
var ObjectReader_1 = require("./ObjectReader");
var ObjectWriter_1 = require("./ObjectWriter");
var RecursiveObjectReader_1 = require("./RecursiveObjectReader");
/**
 * Helper class to perform property introspection and dynamic writing.
 *
 * It is similar to [[ObjectWriter]] but writes properties recursively
 * through the entire object graph. Nested property names are defined
 * using dot notation as "object.subobject.property"
 *
 * @see [[PropertyReflector]]
 * @see [[ObjectWriter]]
 */
var RecursiveObjectWriter = /** @class */ (function () {
    function RecursiveObjectWriter() {
    }
    RecursiveObjectWriter.createProperty = function (obj, names, nameIndex) {
        // If next field is index then create an array
        var subField = names.length > nameIndex + 1 ? names[nameIndex + 1] : null;
        var subFieldIndex = IntegerConverter_1.IntegerConverter.toNullableInteger(subField);
        if (subFieldIndex != null)
            return [];
        // Else create a dictionary
        return {};
    };
    RecursiveObjectWriter.performSetProperty = function (obj, names, nameIndex, value) {
        if (nameIndex < names.length - 1) {
            var subObj = ObjectReader_1.ObjectReader.getProperty(obj, names[nameIndex]);
            if (subObj != null)
                RecursiveObjectWriter.performSetProperty(subObj, names, nameIndex + 1, value);
            else {
                subObj = RecursiveObjectWriter.createProperty(obj, names, nameIndex);
                if (subObj != null) {
                    RecursiveObjectWriter.performSetProperty(subObj, names, nameIndex + 1, value);
                    ObjectWriter_1.ObjectWriter.setProperty(obj, names[nameIndex], subObj);
                }
            }
        }
        else
            ObjectWriter_1.ObjectWriter.setProperty(obj, names[nameIndex], value);
    };
    /**
     * Recursively sets value of object and its subobjects property specified by its name.
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
    RecursiveObjectWriter.setProperty = function (obj, name, value) {
        if (obj == null || name == null)
            return;
        var names = name.split(".");
        if (names == null || names.length == 0)
            return;
        RecursiveObjectWriter.performSetProperty(obj, names, 0, value);
    };
    /**
     * Recursively sets values of some (all) object and its subobjects properties.
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
    RecursiveObjectWriter.setProperties = function (obj, values) {
        if (values == null)
            return;
        for (var key in values) {
            var value = values[key];
            RecursiveObjectWriter.setProperty(obj, key, value);
        }
    };
    /**
     * Copies content of one object to another object
     * by recursively reading all properties from source object
     * and then recursively writing them to destination object.
     *
     * @param dest 	a destination object to write properties to.
     * @param src 	a source object to read properties from
     */
    RecursiveObjectWriter.copyProperties = function (dest, src) {
        if (dest == null || src == null)
            return;
        var values = RecursiveObjectReader_1.RecursiveObjectReader.getProperties(src);
        RecursiveObjectWriter.setProperties(dest, values);
    };
    return RecursiveObjectWriter;
}());
exports.RecursiveObjectWriter = RecursiveObjectWriter;
//# sourceMappingURL=RecursiveObjectWriter.js.map