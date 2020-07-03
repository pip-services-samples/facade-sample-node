let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';

import { BeaconV1 } from '../data/version1/BeaconV1';
import { UdiConverter } from '../data/version1/UdiConverter';
import { IBeaconsPersistence } from './IBeaconsPersistence';

export class BeaconsMongoDbPersistence
    extends IdentifiableMongoDbPersistence<BeaconV1, string>
    implements IBeaconsPersistence {

    constructor() {
        super('beacons');
        super.ensureIndex({ org_id: 1 });
        super.ensureIndex({ udi: 1 });
    }

    private normalizeUdi(udi: string): string {
        return UdiConverter.fromString(udi);
    }

    private normalizeUdis(udis: any): string[] {
        if (_.isString(udis))
            udis = udis.split(',');

        if (!_.isArray(udis))
            return null;

        for (let i = 0; i < udis.length; i++) {
            udis[i] = this.normalizeUdi(udis[i]);
        }

        return udis;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let criteria = [];

        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ label: { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

        let orgId = filter.getAsNullableString('org_id');
        if (orgId != null)
            criteria.push({ org_id: orgId });

        let label = filter.getAsNullableString('label');
        if (label != null)
            criteria.push({ label: label });

        let udi = filter.getAsNullableString('udi');
        udi = this.normalizeUdi(udi);
        if (udi != null)
            criteria.push({ udi: udi });

        let udis = filter.getAsObject('udis');
        udis = this.normalizeUdis(udis);
        if (udis != null)
            criteria.push({ udi: { $in: udis } });

        return criteria.length > 0 ? { $and: criteria } : null;
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<BeaconV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

    public getOneByUdi(correlationId: string, udi: string,
        callback: (err: any, item: BeaconV1) => void): void {
        
        udi = this.normalizeUdi(udi);
        let criteria = {
            udi: udi
        };

        this._collection.findOne(criteria, (err, item) => {
            item = this.convertToPublic(item);

            if (item) this._logger.trace(correlationId, "Found beacon by %s", udi);
            else this._logger.trace(correlationId, "Cannot find beacon by %s", udi);

            callback(err, item);
        });
    }
    
}