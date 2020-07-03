import { ConfigParams } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { CommandableLambdaClient } from 'pip-services3-aws-node';

import { BeaconV1 } from './BeaconV1';
import { IBeaconsClientV1 } from './IBeaconsClientV1';

export class BeaconsLambdaClientV1 extends CommandableLambdaClient implements IBeaconsClientV1 {

    public constructor(config?: any) {
        super('beacons');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    public getBeacons(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<BeaconV1>) => void): void {
        this.callCommand(
            'get_beacons',
            correlationId,
            {
                filter: filter,
                paging: paging
            },
            callback
        );
    }

    public getBeaconById(correlationId: string, id: string,
        callback: (err: any, item: BeaconV1) => void): void {
        this.callCommand(
            'get_beacon_by_id',
            correlationId,
            {
                beacon_id: id
            },
            callback
        );
    }

    public getBeaconByUdi(correlationId: string, udi: string,
        callback: (err: any, item: BeaconV1) => void): void {
        this.callCommand(
            'get_beacon_by_udi',
            correlationId,
            {
                udi: udi
            },
            callback
        );
    }

    public calculatePosition(correlationId: string, orgId: string, udis: string[], 
        callback: (err: any, position: any) => void): void {
        this.callCommand(
            'calculate_position',
            correlationId,
            {
                org_id: orgId,
                udis: udis
            },
            callback
        );
    }

    public createBeacon(correlationId: string, item: BeaconV1,
        callback: (err: any, item: BeaconV1) => void): void {
        this.callCommand(
            'create_beacon',
            correlationId,
            {
                beacon: item
            },
            callback
        );
    }

    public updateBeacon(correlationId: string, item: BeaconV1,
        callback: (err: any, item: BeaconV1) => void): void {
        this.callCommand(
            'update_beacon',
            correlationId,
            {
                beacon: item
            },
            callback
        );
    }

    public deleteBeaconById(correlationId: string, id: string,
        callback: (err: any, item: BeaconV1) => void): void {
        this.callCommand(
            'delete_beacon_by_id',
            correlationId,
            {
                beacon_id: id
            },
            callback
        );
    }
}