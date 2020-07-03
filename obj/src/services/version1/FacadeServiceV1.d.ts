import { IReferences } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { RestService } from 'pip-services3-rpc-node';
export declare class FacadeServiceV1 extends RestService {
    private _sessionsOperations;
    private _beaconsOperations;
    constructor();
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    register(): void;
    private registerContentManagementRoutes;
    private registerUsersRoutes;
}
