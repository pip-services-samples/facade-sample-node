let _ = require('lodash');

import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams} from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdGenerator } from 'pip-services3-commons-node';
import { DirectClient } from 'pip-services3-rpc-node';

import { IBeaconsClientV1 } from './IBeaconsClientV1';
import { BeaconV1 } from './BeaconV1';

export class BeaconsMemoryClientV1 implements IBeaconsClientV1 {
    private _beacons: BeaconV1[] = [];
            
    private matchString(value: string, search: string): boolean {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }

    private matchSearch(item: BeaconV1, search: string): boolean {
        search = search.toLowerCase();
        if (this.matchString(item.id, search))
            return true;
        if (this.matchString(item.udi, search))
            return true;
        if (this.matchString(item.label, search))
            return true;
        return false;
    }

    private contains(array1, array2) {
        if (array1 == null || array2 == null) return false;
        
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1]) 
                    return true;
        }
        
        return false;
    }
    
    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let org_id = filter.getAsNullableString('org_id');
        let udi = filter.getAsNullableString('udi');
        let label = filter.getAsNullableString('label');
        let udis = filter.getAsObject('udis');
        
        // Process udis filter
        if (_.isString(udis))
            udis = udis.split(',');
        if (!_.isArray(udis))
            udis = null;

        return (item) => {
            if (id && item.id != id) 
                return false;
            if (org_id && item.org_id != org_id) 
                return false;
            if (label && item.label != label) 
                return false;
            if (udi && item.udi != udi) 
                return false;
            if (udis && _.indexOf(udis, item.udi) < 0)
                return false;
            if (search && !this.matchSearch(item, search)) 
                return false;
            return true; 
        };
    }

    public getBeacons(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<BeaconV1>) => void): void {
        
        let beacons = _.filter(this._beacons, this.composeFilter(filter));
        callback(null, new DataPage<BeaconV1>(beacons, beacons.length));
    }

    public getBeaconByUdi(correlationId: string, udi: string, 
        callback: (err: any, beacon: BeaconV1) => void): void {

        let beacon = _.find(this._beacons, (d) => d.udi == udi);
        callback(null, beacon);
    }

    public getBeaconById(correlationId: string, beaconId: string, 
        callback: (err: any, beacon: BeaconV1) => void): void {

        let beacon = _.find(this._beacons, (d) => d.id == beaconId);
        callback(null, beacon);
    }

    public calculatePosition(correlationId: string, orgId: string, udis: string[], 
        callback: (err: any, position: any) => void): void {

        let beacons = _.filter(this._beacons, b => b.org_id == orgId && _.indexOf(udis, b.udi) >= 0);

        let position: any = null;
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

        callback(null, position);
    }

    public createBeacon(correlationId: string, beacon: BeaconV1, 
        callback: (err: any, beacon: BeaconV1) => void): void {

        beacon.id = beacon.id || IdGenerator.nextLong();

        this._beacons.push(beacon);
        callback(null, beacon);
    }

    public updateBeacon(correlationId: string, beacon: BeaconV1, 
        callback: (err: any, beacon: BeaconV1) => void): void {

        this._beacons = _.filter(this._beacons, (d) => d.id != beacon.id);
        this._beacons.push(beacon);
        
        callback(null, beacon);
    }

    public deleteBeaconById(correlationId: string, beaconId: string,
        callback: (err: any, beacon: BeaconV1) => void): void {

        let beacon = _.find(this._beacons, b => b.id == beaconId);
        this._beacons = _.filter(this._beacons, b => b.id != beaconId);
        
        callback(null, beacon);
    }

}