import { IReferences } from 'pip-services3-commons-node';
import { GrpcService } from 'pip-services3-grpc-node';
export declare class ActivitiesGrpcServiceV1 extends GrpcService {
    private _controller;
    constructor();
    setReferences(references: IReferences): void;
    private getPartyActivities;
    private logPartyActivity;
    private batchPartyActivities;
    private deletePartyActivities;
    register(): void;
}
