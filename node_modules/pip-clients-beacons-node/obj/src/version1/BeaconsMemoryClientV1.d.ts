import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IBeaconsClientV1 } from './IBeaconsClientV1';
import { BeaconV1 } from './BeaconV1';
export declare class BeaconsMemoryClientV1 implements IBeaconsClientV1 {
    private _beacons;
    private matchString;
    private matchSearch;
    private contains;
    private composeFilter;
    getBeacons(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<BeaconV1>) => void): void;
    getBeaconByUdi(correlationId: string, udi: string, callback: (err: any, beacon: BeaconV1) => void): void;
    getBeaconById(correlationId: string, beaconId: string, callback: (err: any, beacon: BeaconV1) => void): void;
    calculatePosition(correlationId: string, orgId: string, udis: string[], callback: (err: any, position: any) => void): void;
    createBeacon(correlationId: string, beacon: BeaconV1, callback: (err: any, beacon: BeaconV1) => void): void;
    updateBeacon(correlationId: string, beacon: BeaconV1, callback: (err: any, beacon: BeaconV1) => void): void;
    deleteBeaconById(correlationId: string, beaconId: string, callback: (err: any, beacon: BeaconV1) => void): void;
}
