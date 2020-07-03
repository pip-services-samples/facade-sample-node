let _ = require('lodash');
let async = require('async');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';

import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { DependencyResolver } from 'pip-services3-commons-node';
import { IdGenerator } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';

import { BeaconV1 } from '../data/version1/BeaconV1';
import { BeaconTypeV1 } from '../data/version1/BeaconTypeV1';
import { UdiConverter } from '../data/version1/UdiConverter';
import { IBeaconsController } from './IBeaconsController';
import { IBeaconsPersistence } from '../persistence/IBeaconsPersistence';
import { BeaconsCommandSet } from './BeaconsCommandSet';

export class BeaconsController implements IBeaconsController, IConfigurable, IReferenceable, ICommandable {
    private static _defaultConfig = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-beacons:persistence:*:*:1.0'
    );

    private _persistence: IBeaconsPersistence;
    private _dependencyResolver: DependencyResolver = new DependencyResolver(BeaconsController._defaultConfig);
    private _commandSet: BeaconsCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IBeaconsPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new BeaconsCommandSet(this);
        return this._commandSet;
    }

    public getBeacons(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<BeaconV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getBeaconById(correlationId: string, id: string,
        callback: (err: any, item: BeaconV1) => void): void {
        this._persistence.getOneById(correlationId, id, callback);
    }

    public getBeaconByUdi(correlationId: string, udi: string,
        callback: (err: any, item: BeaconV1) => void): void {
        udi = UdiConverter.fromString(udi);
        this._persistence.getOneByUdi(correlationId, udi, callback);
    }
    
    public calculatePosition(correlationId: string, orgId: string, udis: string[], 
        callback: (err: any, position: any) => void): void {

        let beacons: BeaconV1[];
        let position: any = null;

        if (udis == null || udis.length == 0) {
            callback(null, null);
            return;
        }
        
        async.series([
            // Retrieve beacons
            (callback) => {
                this._persistence.getPageByFilter(
                    correlationId,
                    FilterParams.fromTuples(
                        'org_id', orgId,
                        'udis', udis
                    ),
                    null,
                    (err, page) => {
                        beacons = page ? page.data : [];
                        callback(err);
                    }
                );
            },
            // Calculate position
            (callback) => {
                let lat = 0;
                let long = 0;
                let count = 0;

                for (let beacon of beacons) {
                    if (beacon.center && beacon.center.type == 'Point'
                       &&  _.isArray(beacon.center.coordinates)
                    ) {
                        long += beacon.center.coordinates[0];
                        lat += beacon.center.coordinates[1];
                        count += 1;
                    }
                }

                if (count > 0) {
                    position = {
                        type: 'Point',
                        coordinates: [long / count, lat / count]
                    };
                }

                callback();
            }
        ], (err) => {
            callback(err, err == null ? position: null);
        });
    }

    private fixBeacon(item: BeaconV1) {
        if (item == null) return;

        item.type = item.type || BeaconTypeV1.Unknown;
        item.udi = UdiConverter.fromString(item.udi);
    }

    public createBeacon(correlationId: string, item: BeaconV1,
        callback: (err: any, item: BeaconV1) => void): void {
        
        item.id = item.id || IdGenerator.nextLong();
        this.fixBeacon(item);

        this._persistence.create(correlationId, item, callback);
    }

    public updateBeacon(correlationId: string, item: BeaconV1,
        callback: (err: any, item: BeaconV1) => void): void {
        this.fixBeacon(item);
        this._persistence.update(correlationId, item, callback);
    }

    public deleteBeaconById(correlationId: string, id: string,
        callback: (err: any, item: BeaconV1) => void): void {
        this._persistence.deleteById(correlationId, id, callback);
    }
}