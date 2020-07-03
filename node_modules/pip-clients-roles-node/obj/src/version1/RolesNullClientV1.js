"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
class RolesNullClientV1 {
    getRolesByFilter(correlationId, filter, paging, callback) {
        callback(null, new pip_services3_commons_node_1.DataPage([], 0));
    }
    getRolesById(correlationId, userId, callback) {
        callback(null, []);
    }
    setRoles(correlationId, userId, roles, callback) {
        if (callback)
            callback(null, roles || []);
    }
    grantRoles(correlationId, userId, roles, callback) {
        if (callback)
            callback(null, roles);
    }
    revokeRoles(correlationId, userId, roles, callback) {
        if (callback)
            callback(null, []);
    }
    authorize(correlationId, userId, roles, callback) {
        callback(null, true);
    }
}
exports.RolesNullClientV1 = RolesNullClientV1;
//# sourceMappingURL=RolesNullClientV1.js.map