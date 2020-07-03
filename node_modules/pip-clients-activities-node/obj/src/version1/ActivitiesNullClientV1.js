"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
class ActivitiesNullClientV1 {
    constructor(config) { }
    getPartyActivities(correlationId, filter, paging, callback) {
        callback(null, new pip_services3_commons_node_1.DataPage([], 0));
    }
    logPartyActivity(correlationId, activity, callback) {
        if (callback)
            callback(null, activity);
    }
    batchPartyActivities(correlationId, activities, callback) {
        if (callback)
            callback(null);
    }
    deletePartyActivities(correlationId, filter, callback) {
        if (callback)
            callback(null);
    }
}
exports.ActivitiesNullClientV1 = ActivitiesNullClientV1;
//# sourceMappingURL=ActivitiesNullClientV1.js.map