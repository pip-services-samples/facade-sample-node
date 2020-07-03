"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class SessionsDirectClientV1 extends pip_services3_rpc_node_1.DirectClient {
    constructor(config) {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_node_2.Descriptor("pip-services-sessions", "controller", "*", "*", "*"));
        if (config != null)
            this.configure(pip_services3_commons_node_1.ConfigParams.fromValue(config));
    }
    getSessions(correlationId, filter, paging, callback) {
        let timing = this.instrument(correlationId, 'sessions.get_sessions');
        this._controller.getSessions(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }
    getSessionById(correlationId, sessionId, callback) {
        let timing = this.instrument(correlationId, 'sessions.get_session_by_id');
        this._controller.getSessionById(correlationId, sessionId, (err, session) => {
            timing.endTiming();
            callback(err, session);
        });
    }
    openSession(correlationId, userId, userName, address, client, user, data, callback) {
        let timing = this.instrument(correlationId, 'sessions.open_session');
        this._controller.openSession(correlationId, userId, userName, address, client, user, data, (err, session) => {
            timing.endTiming();
            callback(err, session);
        });
    }
    storeSessionData(correlationId, sessionId, data, callback) {
        let timing = this.instrument(correlationId, 'sessions.store_session_data');
        this._controller.storeSessionData(correlationId, sessionId, data, (err, session) => {
            timing.endTiming();
            callback(err, session);
        });
    }
    updateSessionUser(correlationId, sessionId, user, callback) {
        let timing = this.instrument(correlationId, 'sessions.update_session_user');
        this._controller.updateSessionUser(correlationId, sessionId, user, (err, session) => {
            timing.endTiming();
            callback(err, session);
        });
    }
    closeSession(correlationId, sessionId, callback) {
        let timing = this.instrument(correlationId, 'sessions.close_session');
        this._controller.closeSession(correlationId, sessionId, (err, session) => {
            timing.endTiming();
            callback(err, session);
        });
    }
    deleteSessionById(correlationId, sessionId, callback) {
        let timing = this.instrument(correlationId, 'sessions.delete_session_by_id');
        this._controller.deleteSessionById(correlationId, sessionId, (err, session) => {
            timing.endTiming();
            callback(err, session);
        });
    }
}
exports.SessionsDirectClientV1 = SessionsDirectClientV1;
//# sourceMappingURL=SessionsDirectClientV1.js.map