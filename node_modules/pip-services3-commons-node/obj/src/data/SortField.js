"use strict";
/** @module data */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines a field name and order used to sort query results.
 *
 * @see [[SortParams]]
 *
 * ### Example ###
 *
 *     let filter = FilterParams.fromTuples("type", "Type1");
 *     let paging = new PagingParams(0, 100);
 *     let sorting = new SortingParams(new SortField("create_time", true));
 *
 *     myDataClient.getDataByFilter(filter, paging, sorting, (err, page) => {...});
 */
var SortField = /** @class */ (function () {
    /**
     * Creates a new instance and assigns its values.
     *
     * @param name 			the name of the field to sort by.
     * @param ascending 	true to sort in ascending order, and false to sort in descending order.
     */
    function SortField(name, ascending) {
        if (name === void 0) { name = null; }
        if (ascending === void 0) { ascending = true; }
        this.name = name;
        this.ascending = ascending;
    }
    return SortField;
}());
exports.SortField = SortField;
//# sourceMappingURL=SortField.js.map