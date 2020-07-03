"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module refer */
var Reference_1 = require("./Reference");
var ReferenceException_1 = require("./ReferenceException");
/**
 * The most basic implementation of [[IReferences]] to store and locate component references.
 *
 * @see [[IReferences]]
 *
 * ### Example ###
 *
 *     export class MyController implements IReferenceable {
 *         public _persistence: IMyPersistence;
 *         ...
 *         public setReferences(references: IReferences): void {
 *             this._persistence = references.getOneRequired<IMyPersistence>(
 *                 new Descriptor("mygroup", "persistence", "*", "*", "1.0")
 *             );
 *         }
 *         ...
 *     }
 *
 *     let persistence = new MyMongoDbPersistence();
 *
 *     let controller = new MyController();
 *
 *     let references = References.fromTuples(
 *         new Descriptor("mygroup", "persistence", "mongodb", "default", "1.0"), persistence,
 *         new Descriptor("mygroup", "controller", "default", "default", "1.0"), controller
 *     );
 *     controller.setReferences(references);
 */
var References = /** @class */ (function () {
    /**
     * Creates a new instance of references and initializes it with references.
     *
     * @param tuples    (optional) a list of values where odd elements are locators and the following even elements are component references
     */
    function References(tuples) {
        if (tuples === void 0) { tuples = null; }
        this._references = [];
        if (tuples != null) {
            for (var index = 0; index < tuples.length; index += 2) {
                if (index + 1 >= tuples.length)
                    break;
                this.put(tuples[index], tuples[index + 1]);
            }
        }
    }
    /**
     * Puts a new reference into this reference map.
     *
     * @param locator 	a locator to find the reference by.
     * @param component a component reference to be added.
     */
    References.prototype.put = function (locator, component) {
        if (component == null)
            throw new Error("Component cannot be null");
        this._references.push(new Reference_1.Reference(locator, component));
    };
    /**
     * Removes a previously added reference that matches specified locator.
     * If many references match the locator, it removes only the first one.
     * When all references shall be removed, use [[removeAll]] method instead.
     *
     * @param locator 	a locator to remove reference
     * @returns the removed component reference.
     *
     * @see [[removeAll]]
     */
    References.prototype.remove = function (locator) {
        if (locator == null)
            return null;
        for (var index = this._references.length - 1; index >= 0; index--) {
            var reference = this._references[index];
            if (reference.match(locator)) {
                this._references.splice(index, 1);
                return reference.getComponent();
            }
        }
        return null;
    };
    /**
     * Removes all component references that match the specified locator.
     *
     * @param locator 	the locator to remove references by.
     * @returns a list, containing all removed references.
     */
    References.prototype.removeAll = function (locator) {
        var components = [];
        if (locator == null)
            return components;
        for (var index = this._references.length - 1; index >= 0; index--) {
            var reference = this._references[index];
            if (reference.match(locator)) {
                this._references.splice(index, 1);
                components.push(reference.getComponent());
            }
        }
        return components;
    };
    /**
     * Gets locators for all registered component references in this reference map.
     *
     * @returns a list with component locators.
     */
    References.prototype.getAllLocators = function () {
        var locators = [];
        for (var index = 0; index < this._references.length; index++) {
            var reference = this._references[index];
            locators.push(reference.getLocator());
        }
        return locators;
    };
    /**
     * Gets all component references registered in this reference map.
     *
     * @returns a list with component references.
     */
    References.prototype.getAll = function () {
        var components = [];
        for (var index = 0; index < this._references.length; index++) {
            var reference = this._references[index];
            components.push(reference.getComponent());
        }
        return components;
    };
    /**
     * Gets an optional component reference that matches specified locator.
     *
     * @param locator 	the locator to find references by.
     * @returns a matching component reference or null if nothing was found.
     */
    References.prototype.getOneOptional = function (locator) {
        try {
            var components = this.find(locator, false);
            return components.length > 0 ? components[0] : null;
        }
        catch (ex) {
            return null;
        }
    };
    /**
     * Gets a required component reference that matches specified locator.
     *
     * @param locator 	the locator to find a reference by.
     * @returns a matching component reference.
     * @throws a [[ReferenceException]] when no references found.
     */
    References.prototype.getOneRequired = function (locator) {
        var components = this.find(locator, true);
        return components.length > 0 ? components[0] : null;
    };
    /**
     * Gets all component references that match specified locator.
     *
     * @param locator 	the locator to find references by.
     * @returns a list with matching component references or empty list if nothing was found.
     */
    References.prototype.getOptional = function (locator) {
        try {
            return this.find(locator, false);
        }
        catch (ex) {
            return [];
        }
    };
    /**
     * Gets all component references that match specified locator.
     * At least one component reference must be present.
     * If it doesn't the method throws an error.
     *
     * @param locator 	the locator to find references by.
     * @returns a list with matching component references.
     *
     * @throws a [[ReferenceException]] when no references found.
     */
    References.prototype.getRequired = function (locator) {
        return this.find(locator, true);
    };
    /**
     * Gets all component references that match specified locator.
     *
     * @param locator 	the locator to find a reference by.
     * @param required 	forces to raise an exception if no reference is found.
     * @returns a list with matching component references.
     *
     * @throws a [[ReferenceException]] when required is set to true but no references found.
     */
    References.prototype.find = function (locator, required) {
        if (locator == null)
            throw new Error("Locator cannot be null");
        var components = [];
        // Search all references
        for (var index = this._references.length - 1; index >= 0; index--) {
            var reference = this._references[index];
            if (reference.match(locator)) {
                var component = reference.getComponent();
                components.push(component);
            }
        }
        if (components.length == 0 && required)
            throw new ReferenceException_1.ReferenceException(null, locator);
        return components;
    };
    /**
     * Creates a new References from a list of key-value pairs called tuples.
     *
     * @param tuples    a list of values where odd elements are locators and the following even elements are component references
     * @returns         a newly created References.
     *
     * @see [[fromTuplesArray]]
     */
    References.fromTuples = function () {
        var tuples = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tuples[_i] = arguments[_i];
        }
        return new References(tuples);
    };
    return References;
}());
exports.References = References;
//# sourceMappingURL=References.js.map