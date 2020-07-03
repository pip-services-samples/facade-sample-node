import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';

import { BeaconV1 } from './BeaconV1';
import { IBeaconsClientV1 } from './IBeaconsClientV1';

export class BeaconsNullClientV1 implements IBeaconsClientV1 {
    public getBeacons(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<BeaconV1>) => void): void {
        callback(null, new DataPage<BeaconV1>([], 0));
    }

    public getBeaconById(correlationId: string, id: string,
        callback: (err: any, item: BeaconV1) => void): void {
        callback(null, null);
    }

    public getBeaconByUdi(correlationId: string, udi: string,
        callback: (err: any, item: BeaconV1) => void): void {
        callback(null, null);
    }
    
    public calculatePosition(correlationId: string, orgId: string, udis: string[], 
        callback: (err: any, position: any) => void): void {
        callback(null, null);
    }

    public createBeacon(correlationId: string, item: BeaconV1,
        callback: (err: any, item: BeaconV1) => void): void {
        callback(null, item);
    }

    public updateBeacon(correlationId: string, item: BeaconV1,
        callback: (err: any, item: BeaconV1) => void): void {
        callback(null, item);
    }

    public deleteBeaconById(correlationId: string, id: string,
        callback: (err: any, item: BeaconV1) => void): void {
        if (callback) callback(null, null);
    }
}