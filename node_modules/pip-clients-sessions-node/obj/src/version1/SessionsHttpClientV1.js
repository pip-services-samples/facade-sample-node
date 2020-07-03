"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class SessionsHttpClientV1 extends pip_services3_rpc_node_1.CommandableHttpClient {
    constructor(config) {
        super('v1/sessions');
        if (config != null)
            this.configure(pip_services3_commons_node_1.ConfigParams.fromValue(config));
    }
    getSessions(correlationId, filter, paging, callback) {
        this.callCommand('get_sessions', correlationId, {
            filter: filter,
            paging: paging
        }, callback);
    }
    getSessionById(correlationId, sessionId, callback) {
        this.callCommand('get_session_by_id', correlationId, {
            session_id: sessionId
        }, callback);
    }
    openSession(correlationId, userId, userName, address, client, user, data, callback) {
        this.callCommand('open_session', correlationId, {
            user_id: userId,
            user_name: userName,
            address: address,
            client: client,
            user: user,
            data: data
        }, callback);
    }
    storeSessionData(correlationId, sessionId, data, callback) {
        this.callCommand('store_session_data', correlationId, {
            session_id: sessionId,
            data: data
        }, callback);
    }
    updateSessionUser(correlationId, sessionId, user, callback) {
        this.callCommand('update_session_user', correlationId, {
            session_id: sessionId,
            user: user
        }, callback);
    }
    closeSession(correlationId, sessionId, callback) {
        this.callCommand('close_session', correlationId, {
            session_id: sessionId
        }, callback);
    }
    deleteSessionById(correlationId, sessionId, callback) {
        this.callCommand('delete_session_by_id', correlationId, {
            session_id: sessionId
        }, callback);
    }
}
exports.SessionsHttpClientV1 = SessionsHttpClientV1;
//# sourceMappingURL=SessionsHttpClientV1.js.map