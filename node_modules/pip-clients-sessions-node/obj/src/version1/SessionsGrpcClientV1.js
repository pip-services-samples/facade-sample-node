"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let services = require('../../../src/protos/sessions_v1_grpc_pb');
let messages = require('../../../src/protos/sessions_v1_pb');
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
const SessionsGrpcConverterV1_1 = require("./SessionsGrpcConverterV1");
class SessionsGrpcClientV1 extends pip_services3_grpc_node_1.GrpcClient {
    constructor() {
        super(services.SessionsClient);
    }
    getSessions(correlationId, filter, paging, callback) {
        let request = new messages.SessionPageRequest();
        SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.setMap(request.getFilterMap(), filter);
        request.setPaging(SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromPagingParams(paging));
        let timing = this.instrument(correlationId, 'sessions.get_sessions');
        this.call('get_sessions', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toError(response.error);
            let result = response
                ? SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toSessionPage(response.getPage())
                : null;
            callback(err, result);
        });
    }
    getSessionById(correlationId, sessionId, callback) {
        let request = new messages.SessionIdRequest();
        request.setSessionId(sessionId);
        let timing = this.instrument(correlationId, 'sessions.get_session_by_id');
        this.call('get_session_by_id', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toError(response.error);
            let result = response
                ? SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toSession(response.getSession())
                : null;
            callback(err, result);
        });
    }
    openSession(correlationId, userId, userName, address, client, user, data, callback) {
        let request = new messages.SessionOpenRequest();
        request.setUserId(userId);
        request.setUserName(userName);
        request.setAddress(address);
        request.setClient(client);
        request.setUser(SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toJson(user));
        request.setData(SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toJson(data));
        let timing = this.instrument(correlationId, 'sessions.open_session');
        this.call('open_session', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toError(response.error);
            let result = response
                ? SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toSession(response.getSession())
                : null;
            callback(err, result);
        });
    }
    storeSessionData(correlationId, sessionId, data, callback) {
        let request = new messages.SessionStoreDataRequest();
        request.setSessionId(sessionId);
        request.setData(SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toJson(data));
        let timing = this.instrument(correlationId, 'sessions.store_session_data');
        this.call('store_session_data', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toError(response.error);
            let result = response
                ? SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toSession(response.getSession())
                : null;
            callback(err, result);
        });
    }
    updateSessionUser(correlationId, sessionId, user, callback) {
        let request = new messages.SessionUpdateUserRequest();
        request.setSessionId(sessionId);
        request.setUser(SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toJson(user));
        let timing = this.instrument(correlationId, 'sessions.update_session_user');
        this.call('update_session_user', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toError(response.error);
            let result = response
                ? SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toSession(response.getSession())
                : null;
            callback(err, result);
        });
    }
    closeSession(correlationId, sessionId, callback) {
        let request = new messages.SessionIdRequest();
        request.setSessionId(sessionId);
        let timing = this.instrument(correlationId, 'sessions.close_session');
        this.call('close_session', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toError(response.error);
            let result = response
                ? SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toSession(response.getSession())
                : null;
            callback(err, result);
        });
    }
    closeExpiredSessions(correlationId, callback) {
        let request = new messages.SessionEmptyRequest();
        let timing = this.instrument(correlationId, 'sessions.close_expired_sessions');
        this.call('close_expired_sessions', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toError(response.error);
            callback(err);
        });
    }
    deleteSessionById(correlationId, sessionId, callback) {
        let request = new messages.SessionIdRequest();
        request.setSessionId(sessionId);
        let timing = this.instrument(correlationId, 'sessions.delete_session_by_id');
        this.call('delete_session_by_id', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toError(response.error);
            let result = response
                ? SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toSession(response.getSession())
                : null;
            callback(err, result);
        });
    }
}
exports.SessionsGrpcClientV1 = SessionsGrpcClientV1;
//# sourceMappingURL=SessionsGrpcClientV1.js.map