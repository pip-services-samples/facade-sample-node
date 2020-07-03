"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module data */
var IntegerConverter_1 = require("../convert/IntegerConverter");
var BooleanConverter_1 = require("../convert/BooleanConverter");
var AnyValueMap_1 = require("./AnyValueMap");
/**
 * Data transfer object to pass paging parameters for queries.
 *
 * The page is defined by two parameters:
 * - the <code>skip</code> parameter defines number of items to skip.
 * - the <code>take</code> parameter sets how many items to return in a page.
 * - additionally, the optional <code>total</code> parameter tells to return total number of items in the query.
 *
 * Remember: not all implementations support the <code>total</code> parameter
 * because its generation may lead to severe performance implications.
 *
 * ### Example ###
 *
 *     let filter = FilterParams.fromTuples("type", "Type1");
 *     let paging = new PagingParams(0, 100);
 *
 *     myDataClient.getDataByFilter(filter, paging, (err, page) => {...});
 */
var PagingParams = /** @class */ (function () {
    /**
     * Creates a new instance and sets its values.
     *
     * @param skip 		the number of items to skip.
     * @param take 		the number of items to return.
     * @param total 	true to return the total number of items.
     */
    function PagingParams(skip, take, total) {
        if (skip === void 0) { skip = null; }
        if (take === void 0) { take = null; }
        if (total === void 0) { total = null; }
        this.skip = IntegerConverter_1.IntegerConverter.toNullableInteger(skip);
        this.take = IntegerConverter_1.IntegerConverter.toNullableInteger(take);
        this.total = BooleanConverter_1.BooleanConverter.toBooleanWithDefault(total, false);
    }
    /**
     * Gets the number of items to skip.
     *
     * @param minSkip 	the minimum number of items to skip.
     * @returns 		the number of items to skip.
     */
    PagingParams.prototype.getSkip = function (minSkip) {
        if (this.skip == null)
            return minSkip;
        if (this.skip < minSkip)
            return minSkip;
        return this.skip;
    };
    /**
     * Gets the number of items to return in a page.
     *
     * @param maxTake 	the maximum number of items to return.
     * @returns 		the number of items to return.
     */
    PagingParams.prototype.getTake = function (maxTake) {
        if (this.take == null)
            return maxTake;
        if (this.take < 0)
            return 0;
        if (this.take > maxTake)
            return maxTake;
        return this.take;
    };
    /**
     * Converts specified value into PagingParams.
     *
     * @param value     value to be converted
     * @returns         a newly created PagingParams.
     */
    PagingParams.fromValue = function (value) {
        if (value instanceof PagingParams)
            return value;
        var map = AnyValueMap_1.AnyValueMap.fromValue(value);
        return PagingParams.fromMap(map);
    };
    /**
     * Creates a new PagingParams from a list of key-value pairs called tuples.
     *
     * @param tuples    a list of values where odd elements are keys and the following even elements are values
     * @returns         a newly created PagingParams.
     */
    PagingParams.fromTuples = function () {
        var tuples = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tuples[_i] = arguments[_i];
        }
        var map = AnyValueMap_1.AnyValueMap.fromTuplesArray(tuples);
        return PagingParams.fromMap(map);
    };
    /**
     * Creates a new PagingParams and sets it parameters from the specified map
     *
     * @param map    	a AnyValueMap or StringValueMap to initialize this PagingParams
     * @returns         a newly created PagingParams.
     */
    PagingParams.fromMap = function (map) {
        var skip = map.getAsNullableInteger("skip");
        var take = map.getAsNullableInteger("take");
        var total = map.getAsBooleanWithDefault("total", false);
        return new PagingParams(skip, take, total);
    };
    return PagingParams;
}());
exports.PagingParams = PagingParams;
//# sourceMappingURL=PagingParams.js.map