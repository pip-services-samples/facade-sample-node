import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams} from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { DirectClient } from 'pip-services3-rpc-node';

import { ISessionsClientV1 } from './ISessionsClientV1';
//import { ISessionsController } from 'pip-services-sessions-node';
import { SessionV1 } from './SessionV1';

export class SessionsDirectClientV1 extends DirectClient<any> implements ISessionsClientV1 {
            
    public constructor(config?: any) {
        super();
        this._dependencyResolver.put('controller', new Descriptor("pip-services-sessions", "controller", "*", "*", "*"))

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    public getSessions(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<SessionV1>) => void): void {
        let timing = this.instrument(correlationId, 'sessions.get_sessions');
        this._controller.getSessions(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }
    
    public getSessionById(correlationId: string, sessionId: string,
        callback: (err: any, session: SessionV1) => void): void {
        let timing = this.instrument(correlationId, 'sessions.get_session_by_id');
        this._controller.getSessionById(correlationId, sessionId, (err, session) => {
            timing.endTiming();
            callback(err, session);
        });
    }

    public openSession(correlationId: string, userId: string, userName: string,
        address: string, client: string, user: any, data: any,
        callback: (err: any, session: SessionV1) => void): void {
        let timing = this.instrument(correlationId, 'sessions.open_session');
        this._controller.openSession(
            correlationId, userId, userName, address, client, user, data, 
            (err, session) => {
                timing.endTiming();
                callback(err, session);
            }
        );
    }
    
    public storeSessionData(correlationId: string, sessionId: string, data: any,
        callback: (err: any, session: SessionV1) => void): void {
        let timing = this.instrument(correlationId, 'sessions.store_session_data');
        this._controller.storeSessionData(correlationId, sessionId, data, (err, session) => {
            timing.endTiming();
            callback(err, session);
        });
    }

    public updateSessionUser(correlationId: string, sessionId: string, user: any,
        callback: (err: any, session: SessionV1) => void): void {
        let timing = this.instrument(correlationId, 'sessions.update_session_user');
        this._controller.updateSessionUser(correlationId, sessionId, user, (err, session) => {
            timing.endTiming();
            callback(err, session);
        });
    }
    
    public closeSession(correlationId: string, sessionId: string,
        callback: (err: any, session: SessionV1) => void): void {
        let timing = this.instrument(correlationId, 'sessions.close_session');
        this._controller.closeSession(correlationId, sessionId, (err, session) => {
            timing.endTiming();
            callback(err, session);
        });
    }

    public deleteSessionById(correlationId: string, sessionId: string,
        callback: (err: any, session: SessionV1) => void): void {
        let timing = this.instrument(correlationId, 'sessions.delete_session_by_id');
        this._controller.deleteSessionById(correlationId, sessionId, (err, session) => {
            timing.endTiming();
            callback(err, session);
        });
    }
}