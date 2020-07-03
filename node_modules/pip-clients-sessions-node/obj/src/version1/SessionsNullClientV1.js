"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const SessionV1_1 = require("./SessionV1");
class SessionsNullClientV1 {
    getSessions(correlationId, filter, paging, callback) {
        callback(null, new pip_services3_commons_node_1.DataPage([], 0));
    }
    getSessionById(correlationId, sessionId, callback) {
        callback(null, null);
    }
    openSession(correlationId, userId, userName, address, client, user, data, callback) {
        let session = new SessionV1_1.SessionV1(null, userId, userName, address, client);
        session.user = user;
        session.data = data;
        callback(null, session);
    }
    storeSessionData(correlationId, sessionId, data, callback) {
        callback(null, null);
    }
    updateSessionUser(correlationId, sessionId, user, callback) {
        callback(null, null);
    }
    closeSession(correlationId, sessionId, callback) {
        callback(null, null);
    }
    deleteSessionById(correlationId, sessionId, callback) {
        callback(null, null);
    }
}
exports.SessionsNullClientV1 = SessionsNullClientV1;
//# sourceMappingURL=SessionsNullClientV1.js.map