"use strict";
/** @module data */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Data transfer object that is used to pass results of paginated queries.
 * It contains items of retrieved page and optional total number of items.
 *
 * Most often this object type is used to send responses to paginated queries.
 * Pagination parameters are defined by [[PagingParams]] object.
 * The <code>skip</code> parameter in the PagingParams there means how many items to skip.
 * The <code>takes</code> parameter sets number of items to return in the page.
 * And the optional <code>total</code> parameter tells to return total number of items in the query.
 *
 * Remember: not all implementations support the <code>total</code> parameter
 * because its generation may lead to severe performance implications.
 *
 * @see [[PagingParams]]
 *
 * ### Example ###
 *
 *     myDataClient.getDataByFilter(
 *         "123",
 *         FilterParams.fromTuples("completed": true),
 *         new PagingParams(0, 100, true),
 *         (err: any, page: DataPage<MyData>) => {
 *             if (err == null) {
 *                 console.log("Items: ");
 *                 for (let item of page.Data) {
 *                     console.log(item);
 *                 }
 *                 console.log("Total items: " + page.total);
 *             }
 *         };
 *     );
 */
var DataPage = /** @class */ (function () {
    /**
     * Creates a new instance of data page and assigns its values.
     *
     * @param data      a list of items from the retrieved page.
     * @param total     (optional) .
     */
    function DataPage(data, total) {
        if (data === void 0) { data = null; }
        if (total === void 0) { total = null; }
        this.total = total;
        this.data = data;
    }
    return DataPage;
}());
exports.DataPage = DataPage;
//# sourceMappingURL=DataPage.js.map