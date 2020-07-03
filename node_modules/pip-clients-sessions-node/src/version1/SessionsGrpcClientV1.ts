let _ = require('lodash');
let services = require('../../../src/protos/sessions_v1_grpc_pb');
let messages = require('../../../src/protos/sessions_v1_pb');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { GrpcClient } from 'pip-services3-grpc-node';

import { ISessionsClientV1 } from './ISessionsClientV1';
import { SessionV1 } from './SessionV1';
import { SessionsGrpcConverterV1 } from './SessionsGrpcConverterV1';

export class SessionsGrpcClientV1 extends GrpcClient implements ISessionsClientV1 {
        
    public constructor() {
        super(services.SessionsClient);
    }

    public getSessions(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, result: DataPage<SessionV1>) => void): void {

        let request = new messages.SessionPageRequest();

        SessionsGrpcConverterV1.setMap(request.getFilterMap(), filter);
        request.setPaging(SessionsGrpcConverterV1.fromPagingParams(paging));

        let timing = this.instrument(correlationId, 'sessions.get_sessions');

        this.call('get_sessions',
            correlationId, 
            request,
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = SessionsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? SessionsGrpcConverterV1.toSessionPage(response.getPage())
                    : null;

                callback(err, result);
            }
        );
    }

    public getSessionById(correlationId: string, sessionId: string,
        callback: (err: any, result: SessionV1) => void): void {

        let request = new messages.SessionIdRequest();
        request.setSessionId(sessionId);

        let timing = this.instrument(correlationId, 'sessions.get_session_by_id');

        this.call('get_session_by_id',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = SessionsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? SessionsGrpcConverterV1.toSession(response.getSession())
                    : null;

                callback(err, result);
            }
        );        
    }

    public openSession(correlationId: string, userId: string, userName: string,
        address: string, client: string, user: any, data: any,
        callback: (err: any, session: SessionV1) => void): void {

        let request = new messages.SessionOpenRequest();
        request.setUserId(userId);
        request.setUserName(userName);
        request.setAddress(address);
        request.setClient(client);
        request.setUser(SessionsGrpcConverterV1.toJson(user));
        request.setData(SessionsGrpcConverterV1.toJson(data));

        let timing = this.instrument(correlationId, 'sessions.open_session');

        this.call('open_session',
            correlationId, 
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = SessionsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? SessionsGrpcConverterV1.toSession(response.getSession())
                    : null;

                callback(err, result);
            }
        );
    }

    public storeSessionData(correlationId: string, sessionId: string, data: any,
        callback: (err: any, session: SessionV1) => void): void {

        let request = new messages.SessionStoreDataRequest();
        request.setSessionId(sessionId);
        request.setData(SessionsGrpcConverterV1.toJson(data));

        let timing = this.instrument(correlationId, 'sessions.store_session_data');

        this.call('store_session_data',
            correlationId, 
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = SessionsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? SessionsGrpcConverterV1.toSession(response.getSession())
                    : null;

                callback(err, result);
            }
        );
    }

    public updateSessionUser(correlationId: string, sessionId: string, user: any,
        callback: (err: any, session: SessionV1) => void): void {

        let request = new messages.SessionUpdateUserRequest();
        request.setSessionId(sessionId);
        request.setUser(SessionsGrpcConverterV1.toJson(user));

        let timing = this.instrument(correlationId, 'sessions.update_session_user');

        this.call('update_session_user',
            correlationId, 
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = SessionsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? SessionsGrpcConverterV1.toSession(response.getSession())
                    : null;

                callback(err, result);
            }
        );
    }

    public closeSession(correlationId: string, sessionId: string,
        callback: (err: any, result: SessionV1) => void): void {

        let request = new messages.SessionIdRequest();
        request.setSessionId(sessionId);

        let timing = this.instrument(correlationId, 'sessions.close_session');

        this.call('close_session',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = SessionsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? SessionsGrpcConverterV1.toSession(response.getSession())
                    : null;

                callback(err, result);
            }
        );        
    }

    public closeExpiredSessions(correlationId: string, 
        callback: (err: any) => void): void {

        let request = new messages.SessionEmptyRequest();

        let timing = this.instrument(correlationId, 'sessions.close_expired_sessions');

        this.call('close_expired_sessions',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = SessionsGrpcConverterV1.toError(response.error);

                callback(err);
            }
        );        
    }
    
    public deleteSessionById(correlationId: string, sessionId: string,
        callback: (err: any, result: SessionV1) => void): void {

        let request = new messages.SessionIdRequest();
        request.setSessionId(sessionId);

        let timing = this.instrument(correlationId, 'sessions.delete_session_by_id');

        this.call('delete_session_by_id',
            correlationId, 
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = SessionsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? SessionsGrpcConverterV1.toSession(response.getSession())
                    : null;

                callback(err, result);
            }
        );
    }
  
}
