"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
class RolesLambdaClientV1 extends pip_services3_aws_node_1.CommandableLambdaClient {
    constructor(config) {
        super('roles');
        if (config != null)
            this.configure(pip_services3_commons_node_1.ConfigParams.fromValue(config));
    }
    getRolesByFilter(correlationId, filter, paging, callback) {
        this.callCommand('get_roles_by_filter', correlationId, {
            filter: filter,
            paging: paging
        }, callback);
    }
    getRolesById(correlationId, userId, callback) {
        this.callCommand('get_roles_by_id', correlationId, {
            user_id: userId
        }, callback);
    }
    setRoles(correlationId, userId, roles, callback) {
        this.callCommand('set_roles', correlationId, {
            user_id: userId,
            roles: roles
        }, callback);
    }
    grantRoles(correlationId, userId, roles, callback) {
        this.callCommand('grant_roles', correlationId, {
            user_id: userId,
            roles: roles
        }, callback);
    }
    revokeRoles(correlationId, userId, roles, callback) {
        this.callCommand('revoke_roles', correlationId, {
            user_id: userId,
            roles: roles
        }, callback);
    }
    authorize(correlationId, userId, roles, callback) {
        this.callCommand('authorize', correlationId, {
            user_id: userId,
            roles: roles
        }, (err, result) => {
            callback(err, result ? result.authorized : null);
        });
    }
}
exports.RolesLambdaClientV1 = RolesLambdaClientV1;
//# sourceMappingURL=RolesLambdaClientV1.js.map