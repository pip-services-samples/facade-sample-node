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
/** @module data */
var StringValueMap_1 = require("./StringValueMap");
/**
 * Data transfer object used to pass filter parameters as simple key-value pairs.
 *
 * @see [[StringValueMap]]
 *
 * ### Example ###
 *
 *     let filter = FilterParams.fromTuples(
 *         "type", "Type1",
 *         "from_create_time", new Date(2000, 0, 1),
 *         "to_create_time", new Date(),
 *         "completed", true
 *     );
 *     let paging = new PagingParams(0, 100);
 *
 *     myDataClient.getDataByFilter(filter, paging, (err, page) => {...});
 */
var FilterParams = /** @class */ (function (_super) {
    __extends(FilterParams, _super);
    /**
     * Creates a new instance and initalizes it with elements from the specified map.
     *
     * @param map 	a map to initialize this instance.
     */
    function FilterParams(map) {
        if (map === void 0) { map = null; }
        return _super.call(this, map) || this;
    }
    /**
     * Converts specified value into FilterParams.
     *
     * @param value     value to be converted
     * @returns         a newly created FilterParams.
     */
    FilterParams.fromValue = function (value) {
        return new FilterParams(value);
    };
    /**
     * Creates a new FilterParams from a list of key-value pairs called tuples.
     *
     * @param tuples    a list of values where odd elements are keys and the following even elements are values
     * @returns         a newly created FilterParams.
     */
    FilterParams.fromTuples = function () {
        var tuples = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tuples[_i] = arguments[_i];
        }
        var map = StringValueMap_1.StringValueMap.fromTuplesArray(tuples);
        return new FilterParams(map);
    };
    /**
     * Parses semicolon-separated key-value pairs and returns them as a FilterParams.
     *
     * @param line      semicolon-separated key-value list to initialize FilterParams.
     * @returns         a newly created FilterParams.
     *
     * @see [[StringValueMap.fromString]]
     */
    FilterParams.fromString = function (line) {
        var map = StringValueMap_1.StringValueMap.fromString(line);
        return new FilterParams(map);
    };
    return FilterParams;
}(StringValueMap_1.StringValueMap));
exports.FilterParams = FilterParams;
//# sourceMappingURL=FilterParams.js.map