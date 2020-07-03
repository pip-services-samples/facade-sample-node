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
/** @module run */
var AnyValueMap_1 = require("../data/AnyValueMap");
var JsonConverter_1 = require("../convert/JsonConverter");
var RecursiveObjectReader_1 = require("../reflect/RecursiveObjectReader");
var RecursiveObjectWriter_1 = require("../reflect/RecursiveObjectWriter");
var ObjectWriter_1 = require("../reflect/ObjectWriter");
/**
 * Contains map with execution parameters.
 *
 * In general, this map may contain non-serializable values.
 * And in contrast with other maps, its getters and setters
 * support dot notation and able to access properties
 * in the entire object graph.
 *
 * This class is often use to pass execution and notification
 * arguments, and parameterize classes before execution.
 *
 * @see [[IParameterized]]
 * @see [[AnyValueMap]]
 */
var Parameters = /** @class */ (function (_super) {
    __extends(Parameters, _super);
    /**
     * Creates a new instance of the map and assigns its value.
     *
     * @param value     (optional) values to initialize this map.
     */
    function Parameters(map) {
        if (map === void 0) { map = null; }
        return _super.call(this, map) || this;
    }
    /**
     * Gets a map element specified by its key.
     *
     * The key can be defined using dot notation
     * and allows to recursively access elements of elements.
     *
     * @param key     a key of the element to get.
     * @returns       the value of the map element.
     */
    Parameters.prototype.get = function (key) {
        if (key == null)
            return null;
        else if (key.indexOf('.') > 0)
            return RecursiveObjectReader_1.RecursiveObjectReader.getProperty(this, key);
        else
            return _super.prototype.get.call(this, key);
    };
    /**
     * Puts a new value into map element specified by its key.
     *
     * The key can be defined using dot notation
     * and allows to recursively access elements of elements.
     *
     * @param key       a key of the element to put.
     * @param value     a new value for map element.
     */
    Parameters.prototype.put = function (key, value) {
        if (key == null)
            return null;
        else if (key.indexOf('.') > 0)
            RecursiveObjectWriter_1.RecursiveObjectWriter.setProperty(this, key, value);
        else
            _super.prototype.put.call(this, key, value);
        return value;
    };
    /**
     * Converts map element into an Parameters or returns null if conversion is not possible.
     *
     * @param key       a key of element to get.
     * @returns Parameters value of the element or null if conversion is not supported.
     */
    Parameters.prototype.getAsNullableParameters = function (key) {
        var value = this.getAsNullableMap(key);
        return value != null ? new Parameters(value) : null;
    };
    /**
     * Converts map element into an Parameters or returns empty Parameters if conversion is not possible.
     *
     * @param key       a key of element to get.
     * @returns Parameters value of the element or empty Parameters if conversion is not supported.
     */
    Parameters.prototype.getAsParameters = function (key) {
        var value = this.getAsMap(key);
        return new Parameters(value);
    };
    /**
     * Converts map element into an Parameters or returns default value if conversion is not possible.
     *
     * @param key       a key of element to get.
     * @param defaultValue  the default value
     * @returns Parameters value of the element or default value if conversion is not supported.
     */
    Parameters.prototype.getAsParametersWithDefault = function (key, defaultValue) {
        var result = this.getAsNullableParameters(key);
        return result != null ? result : defaultValue;
    };
    /**
     * Checks if this map contains an element with specified key.
     *
     * The key can be defined using dot notation
     * and allows to recursively access elements of elements.
     *
     * @param key     a key to be checked
     * @returns       true if this map contains the key or false otherwise.
     */
    Parameters.prototype.containsKey = function (key) {
        return RecursiveObjectReader_1.RecursiveObjectReader.hasProperty(this, key.toString());
    };
    /**
     * Overrides parameters with new values from specified Parameters
     * and returns a new Parameters object.
     *
     * @param parameters		Parameters with parameters to override the current values.
     * @param recursive			(optional) true to perform deep copy, and false for shallow copy. Default: false
     * @returns					a new Parameters object.
     *
     * @see [[setDefaults]]
     */
    Parameters.prototype.override = function (parameters, recursive) {
        if (recursive === void 0) { recursive = false; }
        var result = new Parameters();
        if (recursive) {
            RecursiveObjectWriter_1.RecursiveObjectWriter.copyProperties(result, this);
            RecursiveObjectWriter_1.RecursiveObjectWriter.copyProperties(result, parameters);
        }
        else {
            ObjectWriter_1.ObjectWriter.setProperties(result, this);
            ObjectWriter_1.ObjectWriter.setProperties(result, parameters);
        }
        return result;
    };
    /**
     * Set default values from specified Parameters and returns a new Parameters object.
     *
     * @param defaultParameters	Parameters with default parameter values.
     * @param recursive			(optional) true to perform deep copy, and false for shallow copy. Default: false
     * @returns						a new Parameters object.
     *
     * @see [[override]]
     */
    Parameters.prototype.setDefaults = function (defaultParameters, recursive) {
        if (recursive === void 0) { recursive = false; }
        var result = new Parameters();
        if (recursive) {
            RecursiveObjectWriter_1.RecursiveObjectWriter.copyProperties(result, defaultParameters);
            RecursiveObjectWriter_1.RecursiveObjectWriter.copyProperties(result, this);
        }
        else {
            ObjectWriter_1.ObjectWriter.setProperties(result, defaultParameters);
            ObjectWriter_1.ObjectWriter.setProperties(result, this);
        }
        return result;
    };
    /**
     * Assigns (copies over) properties from the specified value to this map.
     *
     * @param value 	value whose properties shall be copied over.
     */
    Parameters.prototype.assignTo = function (value) {
        if (value == null)
            return;
        RecursiveObjectWriter_1.RecursiveObjectWriter.copyProperties(value, this);
    };
    /**
     * Picks select parameters from this Parameters and returns them as a new Parameters object.
     *
     * @param paths 	keys to be picked and copied over to new Parameters.
     * @returns a new Parameters object.
     */
    Parameters.prototype.pick = function () {
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i] = arguments[_i];
        }
        var result = new Parameters();
        for (var index = 0; index < paths.length; index++) {
            var path = paths[index];
            if (this.containsKey(path))
                result.put(path, this.get(path));
        }
        return result;
    };
    /**
     * Omits selected parameters from this Parameters and returns the rest as a new Parameters object.
     *
     * @param paths 	keys to be omitted from copying over to new Parameters.
     * @returns a new Parameters object.
     */
    Parameters.prototype.omit = function () {
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i] = arguments[_i];
        }
        var result = new Parameters(this);
        for (var index = 0; index < paths.length; index++) {
            var path = paths[index];
            result.remove(path);
        }
        return result;
    };
    /**
     * Converts this map to JSON object.
     *
     * @returns	a JSON representation of this map.
     */
    Parameters.prototype.toJson = function () {
        return JsonConverter_1.JsonConverter.toJson(this);
    };
    /**
     * Creates a new Parameters object filled with key-value pairs from specified object.
     *
     * @param value		an object with key-value pairs used to initialize a new Parameters.
     * @returns			a new Parameters object.
     */
    Parameters.fromValue = function (value) {
        return new Parameters(value);
    };
    /**
     * Creates a new Parameters object filled with provided key-value pairs called tuples.
     * Tuples parameters contain a sequence of key1, value1, key2, value2, ... pairs.
     *
     * @param tuples	the tuples to fill a new Parameters object.
     * @returns			a new Parameters object.
     *
     * @see [[AnyValueMap.fromTuplesArray]]
     */
    Parameters.fromTuples = function () {
        var tuples = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tuples[_i] = arguments[_i];
        }
        var map = AnyValueMap_1.AnyValueMap.fromTuples.apply(AnyValueMap_1.AnyValueMap, tuples);
        return new Parameters(map);
    };
    /**
     * Merges two or more Parameters into one. The following Parameters override
     * previously defined parameters.
     *
     * @param configs 	a list of Parameters objects to be merged.
     * @returns			a new Parameters object.
     *
     * @see [[AnyValueMap.fromMaps]]
     */
    Parameters.mergeParams = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        var map = AnyValueMap_1.AnyValueMap.fromMaps.apply(AnyValueMap_1.AnyValueMap, parameters);
        return new Parameters(map);
    };
    /**
     * Creates new Parameters from JSON object.
     *
     * @param json 	a JSON string containing parameters.
     * @returns a new Parameters object.
     *
     * @see [[JsonConverter.toNullableMap]]
     */
    Parameters.fromJson = function (json) {
        var map = JsonConverter_1.JsonConverter.toNullableMap(json);
        return new Parameters(map);
    };
    /**
     * Creates new Parameters from ConfigMap object.
     *
     * @param config 	a ConfigParams that contain parameters.
     * @returns			a new Parameters object.
     *
     * @see [[ConfigParams]]
     */
    Parameters.fromConfig = function (config) {
        var result = new Parameters();
        if (config == null)
            return result;
        for (var key in config) {
            if (config.hasOwnProperty(key))
                result.put(key, config[key]);
        }
        return result;
    };
    return Parameters;
}(AnyValueMap_1.AnyValueMap));
exports.Parameters = Parameters;
//# sourceMappingURL=Parameters.js.map