"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let services = require('../../../src/protos/roles_v1_grpc_pb');
let messages = require('../../../src/protos/roles_v1_pb');
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
const RolesGrpcConverterV1_1 = require("./RolesGrpcConverterV1");
class RolesGrpcClientV1 extends pip_services3_grpc_node_1.GrpcClient {
    constructor() {
        super(services.RolesClient);
    }
    getRolesByFilter(correlationId, filter, paging, callback) {
        let request = new messages.RolesPageRequest();
        RolesGrpcConverterV1_1.RolesGrpcConverterV1.setMap(request.getFilterMap(), filter);
        request.setPaging(RolesGrpcConverterV1_1.RolesGrpcConverterV1.fromPagingParams(paging));
        let timing = this.instrument(correlationId, 'roles.get_roles_by_filter');
        this.call('get_roles_by_filter', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = RolesGrpcConverterV1_1.RolesGrpcConverterV1.toError(response.error);
            let result = response
                ? RolesGrpcConverterV1_1.RolesGrpcConverterV1.toUserRolesPage(response.getPage())
                : null;
            callback(err, result);
        });
    }
    getRolesById(correlationId, userId, callback) {
        let request = new messages.RoleIdRequest();
        request.setUserId(userId);
        let timing = this.instrument(correlationId, 'roles.get_roles_by_id');
        this.call('get_roles_by_id', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = RolesGrpcConverterV1_1.RolesGrpcConverterV1.toError(response.error);
            let roles = response ? response.getRolesList() : null;
            callback(err, roles);
        });
    }
    setRoles(correlationId, userId, roles, callback) {
        let request = new messages.RolesRequest();
        request.setUserId(userId);
        request.setRolesList(roles);
        let timing = this.instrument(correlationId, 'roles.set_roles');
        this.call('set_roles', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = RolesGrpcConverterV1_1.RolesGrpcConverterV1.toError(response.error);
            let roles = response ? response.getRolesList() : null;
            callback(err, roles);
        });
    }
    grantRoles(correlationId, userId, roles, callback) {
        let request = new messages.RolesRequest();
        request.setUserId(userId);
        request.setRolesList(roles);
        let timing = this.instrument(correlationId, 'roles.grant_roles');
        this.call('grant_roles', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = RolesGrpcConverterV1_1.RolesGrpcConverterV1.toError(response.error);
            let roles = response ? response.getRolesList() : null;
            callback(err, roles);
        });
    }
    revokeRoles(correlationId, userId, roles, callback) {
        let request = new messages.RolesRequest();
        request.setUserId(userId);
        request.setRolesList(roles);
        let timing = this.instrument(correlationId, 'roles.revoke_roles');
        this.call('revoke_roles', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = RolesGrpcConverterV1_1.RolesGrpcConverterV1.toError(response.error);
            let roles = response ? response.getRolesList() : null;
            callback(err, roles);
        });
    }
    authorize(correlationId, userId, roles, callback) {
        let request = new messages.RolesRequest();
        request.setUserId(userId);
        request.setRolesList(roles);
        let timing = this.instrument(correlationId, 'roles.authorize');
        this.call('authorize', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = RolesGrpcConverterV1_1.RolesGrpcConverterV1.toError(response.error);
            let authorized = response ? response.getAuthorized() : null;
            callback(err, authorized);
        });
    }
}
exports.RolesGrpcClientV1 = RolesGrpcClientV1;
//# sourceMappingURL=RolesGrpcClientV1.js.map