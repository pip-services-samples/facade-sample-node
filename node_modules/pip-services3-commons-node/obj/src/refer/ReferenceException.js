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
/** @module refer */
var InternalException_1 = require("../errors/InternalException");
/**
 * Error when required component dependency cannot be found.
 */
var ReferenceException = /** @class */ (function (_super) {
    __extends(ReferenceException, _super);
    /**
     * Creates an error instance and assigns its values.
     *
     * @param correlation_id    (optional) a unique transaction id to trace execution through call chain.
     * @param locator 			the locator to find reference to dependent component.
     */
    function ReferenceException(correlationId, locator) {
        var _this = _super.call(this, correlationId, "REF_ERROR", "Failed to obtain reference to " + locator) || this;
        _this.withDetails("locator", locator);
        return _this;
    }
    return ReferenceException;
}(InternalException_1.InternalException));
exports.ReferenceException = ReferenceException;
//# sourceMappingURL=ReferenceException.js.map