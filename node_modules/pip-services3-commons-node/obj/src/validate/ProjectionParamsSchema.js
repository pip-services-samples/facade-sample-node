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
var ArraySchema_1 = require("./ArraySchema");
/**
 * Schema to validate [[ProjectionParams]]
 *
 * @see [[ProjectionParams]]
 */
var ProjectionParamsSchema = /** @class */ (function (_super) {
    __extends(ProjectionParamsSchema, _super);
    /**
     * Creates a new instance of validation schema.
     */
    function ProjectionParamsSchema() {
        return _super.call(this, TypeCode_1.TypeCode.String) || this;
    }
    return ProjectionParamsSchema;
}(ArraySchema_1.ArraySchema));
exports.ProjectionParamsSchema = ProjectionParamsSchema;
//# sourceMappingURL=ProjectionParamsSchema.js.map