import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { CommandableLambdaClient } from 'pip-services3-aws-node';
import { BeaconV1 } from './BeaconV1';
import { IBeaconsClientV1 } from './IBeaconsClientV1';
export declare class BeaconsLambdaClientV1 extends CommandableLambdaClient implements IBeaconsClientV1 {
    constructor(config?: any);
    getBeacons(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<BeaconV1>) => void): void;
    getBeaconById(correlationId: string, id: string, callback: (err: any, item: BeaconV1) => void): void;
    getBeaconByUdi(correlationId: string, udi: string, callback: (err: any, item: BeaconV1) => void): void;
    calculatePosition(correlationId: string, orgId: string, udis: string[], callback: (err: any, position: any) => void): void;
    createBeacon(correlationId: string, item: BeaconV1, callback: (err: any, item: BeaconV1) => void): void;
    updateBeacon(correlationId: string, item: BeaconV1, callback: (err: any, item: BeaconV1) => void): void;
    deleteBeaconById(correlationId: string, id: string, callback: (err: any, item: BeaconV1) => void): void;
}
