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
/** @module validate */
var TypeCode_1 = require("../convert/TypeCode");
var MapSchema_1 = require("./MapSchema");
/**
 * Schema to validate [[FilterParams]].
 *
 * @see [[FilterParams]]
 */
var FilterParamsSchema = /** @class */ (function (_super) {
    __extends(FilterParamsSchema, _super);
    /**
     * Creates a new instance of validation schema.
     */
    function FilterParamsSchema() {
        return _super.call(this, TypeCode_1.TypeCode.String, null) || this;
    }
    return FilterParamsSchema;
}(MapSchema_1.MapSchema));
exports.FilterParamsSchema = FilterParamsSchema;
//# sourceMappingURL=FilterParamsSchema.js.map