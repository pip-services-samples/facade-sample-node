"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module refer */
/** @hidden */
var _ = require('lodash');
/**
 * Helper class that sets and unsets references to components.
 *
 * @see [[IReferenceable]]
 * @see [[IUnreferenceable]]
 */
var Referencer = /** @class */ (function () {
    function Referencer() {
    }
    /**
     * Sets references to specific component.
     *
     * To set references components must implement [[IReferenceable]] interface.
     * If they don't the call to this method has no effect.
     *
     * @param references 	the references to be set.
     * @param component 	the component to set references to.
     *
     * @see [[IReferenceable]]
     */
    Referencer.setReferencesForOne = function (references, component) {
        if (_.isFunction(component.setReferences))
            component.setReferences(references);
    };
    /**
     * Sets references to multiple components.
     *
     * To set references components must implement [[IReferenceable]] interface.
     * If they don't the call to this method has no effect.
     *
     * @param references 	the references to be set.
     * @param components 	a list of components to set the references to.
     *
     * @see [[IReferenceable]]
     */
    Referencer.setReferences = function (references, components) {
        for (var index = 0; index < components.length; index++)
            Referencer.setReferencesForOne(references, components[index]);
    };
    /**
     * Unsets references in specific component.
     *
     * To unset references components must implement [[IUnreferenceable]] interface.
     * If they don't the call to this method has no effect.
     *
     * @param component 	the component to unset references.
     *
     * @see [[IUnreferenceable]]
     */
    Referencer.unsetReferencesForOne = function (component) {
        if (_.isFunction(component.unsetReferences))
            component.unsetReferences();
    };
    /**
     * Unsets references in multiple components.
     *
     * To unset references components must implement [[IUnreferenceable]] interface.
     * If they don't the call to this method has no effect.
     *
     * @param components 	the list of components, whose references must be cleared.
     *
     * @see [[IUnreferenceable]]
     */
    Referencer.unsetReferences = function (components) {
        for (var index = 0; index < components.length; index++)
            Referencer.unsetReferencesForOne(components[index]);
    };
    return Referencer;
}());
exports.Referencer = Referencer;
//# sourceMappingURL=Referencer.js.map