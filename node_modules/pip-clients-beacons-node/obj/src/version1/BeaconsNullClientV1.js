"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
class BeaconsNullClientV1 {
    getBeacons(correlationId, filter, paging, callback) {
        callback(null, new pip_services3_commons_node_1.DataPage([], 0));
    }
    getBeaconById(correlationId, id, callback) {
        callback(null, null);
    }
    getBeaconByUdi(correlationId, udi, callback) {
        callback(null, null);
    }
    calculatePosition(correlationId, orgId, udis, callback) {
        callback(null, null);
    }
    createBeacon(correlationId, item, callback) {
        callback(null, item);
    }
    updateBeacon(correlationId, item, callback) {
        callback(null, item);
    }
    deleteBeaconById(correlationId, id, callback) {
        if (callback)
            callback(null, null);
    }
}
exports.BeaconsNullClientV1 = BeaconsNullClientV1;
//# sourceMappingURL=BeaconsNullClientV1.js.map