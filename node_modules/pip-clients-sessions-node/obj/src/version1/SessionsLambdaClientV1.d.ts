import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { CommandableLambdaClient } from 'pip-services3-aws-node';
import { SessionV1 } from './SessionV1';
import { ISessionsClientV1 } from './ISessionsClientV1';
export declare class SessionsLambdaClientV1 extends CommandableLambdaClient implements ISessionsClientV1 {
    constructor(config?: any);
    getSessions(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<SessionV1>) => void): void;
    getSessionById(correlationId: string, sessionId: string, callback: (err: any, session: SessionV1) => void): void;
    openSession(correlationId: string, userId: string, userName: string, address: string, client: string, user: any, data: any, callback: (err: any, session: SessionV1) => void): void;
    storeSessionData(correlationId: string, sessionId: string, data: any, callback: (err: any, session: SessionV1) => void): void;
    updateSessionUser(correlationId: string, sessionId: string, user: any, callback: (err: any, session: SessionV1) => void): void;
    closeSession(correlationId: string, sessionId: string, callback: (err: any, session: SessionV1) => void): void;
    deleteSessionById(correlationId: string, sessionId: string, callback: (err: any, session: SessionV1) => void): void;
}
