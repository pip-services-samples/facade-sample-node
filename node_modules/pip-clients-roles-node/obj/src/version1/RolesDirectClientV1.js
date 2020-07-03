"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
//import { IRolesController } from 'pip-services-Roles-node';
class RolesDirectClientV1 extends pip_services3_rpc_node_1.DirectClient {
    constructor(config) {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_node_2.Descriptor("pip-services-roles", "controller", "*", "*", "*"));
        if (config != null)
            this.configure(pip_services3_commons_node_1.ConfigParams.fromValue(config));
    }
    getRolesByFilter(correlationId, filter, paging, callback) {
        let timing = this.instrument(correlationId, 'roles.get_roles_by_filter');
        this._controller.getRolesByFilter(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }
    getRolesById(correlationId, userId, callback) {
        let timing = this.instrument(correlationId, 'roles.get_roles_by_id');
        this._controller.getRolesById(correlationId, userId, (err, roles) => {
            timing.endTiming();
            callback(err, roles);
        });
    }
    setRoles(correlationId, userId, roles, callback) {
        let timing = this.instrument(correlationId, 'roles.set_roles');
        this._controller.setRoles(correlationId, userId, roles, (err, roles) => {
            timing.endTiming();
            if (callback)
                callback(err, roles);
        });
    }
    grantRoles(correlationId, userId, roles, callback) {
        let timing = this.instrument(correlationId, 'roles.grant_roles');
        this._controller.grantRoles(correlationId, userId, roles, (err, roles) => {
            timing.endTiming();
            if (callback)
                callback(err, roles);
        });
    }
    revokeRoles(correlationId, userId, roles, callback) {
        let timing = this.instrument(correlationId, 'roles.revoke_roles');
        this._controller.revokeRoles(correlationId, userId, roles, (err, roles) => {
            timing.endTiming();
            if (callback)
                callback(err, roles);
        });
    }
    authorize(correlationId, userId, roles, callback) {
        let timing = this.instrument(correlationId, 'roles.authorize');
        this._controller.authorize(correlationId, userId, roles, (err, authorized) => {
            timing.endTiming();
            callback(err, authorized);
        });
    }
}
exports.RolesDirectClientV1 = RolesDirectClientV1;
//# sourceMappingURL=RolesDirectClientV1.js.map