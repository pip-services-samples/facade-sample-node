"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const pip_services3_rpc_node_2 = require("pip-services3-rpc-node");
const pip_services3_rpc_node_3 = require("pip-services3-rpc-node");
class AuthorizerV1 {
    constructor() {
        this.basicAuth = new pip_services3_rpc_node_2.BasicAuthManager();
        this.roleAuth = new pip_services3_rpc_node_3.RoleAuthManager();
    }
    // Anybody who entered the system
    anybody() {
        return this.basicAuth.anybody();
    }
    // Only registered and authenticated users
    signed() {
        return this.basicAuth.signed();
    }
    // System administrator
    admin() {
        return this.roleAuth.userInRole('admin');
    }
    // Only the user session owner
    owner(idParam = 'user_id') {
        return (req, res, next) => {
            let user = req.user;
            let partyId = req.params[idParam] || req.param(idParam);
            if (user == null) {
                pip_services3_rpc_node_1.HttpResponseSender.sendError(req, res, new pip_services3_commons_node_1.UnauthorizedException(null, 'NOT_SIGNED', 'User must be signed in to perform this operation').withStatus(401));
            }
            else if (partyId == null) {
                pip_services3_rpc_node_1.HttpResponseSender.sendError(req, res, new pip_services3_commons_node_1.UnauthorizedException(null, 'NO_USER_ID', 'User id is not defined').withStatus(401));
            }
            else {
                let isOwner = partyId == user.id;
                if (!isOwner) {
                    pip_services3_rpc_node_1.HttpResponseSender.sendError(req, res, new pip_services3_commons_node_1.UnauthorizedException(null, 'NOT_OWNER', 'Only user owner access is allowed').withDetails('user_id', partyId).withStatus(403));
                }
                else {
                    next();
                }
            }
        };
    }
}
exports.AuthorizerV1 = AuthorizerV1;
//# sourceMappingURL=AuthorizerV1.js.map