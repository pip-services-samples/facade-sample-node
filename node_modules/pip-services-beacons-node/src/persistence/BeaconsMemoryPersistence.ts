let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';

import { BeaconV1 } from '../data/version1/BeaconV1';
import { UdiConverter } from '../data/version1/UdiConverter';
import { IBeaconsPersistence } from './IBeaconsPersistence';

export class BeaconsMemoryPersistence
    extends IdentifiableMemoryPersistence<BeaconV1, string>
    implements IBeaconsPersistence {

    constructor() {
        super();
        this._maxPageSize = 1000;
    }

    private matchString(value: string, search: string): boolean {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }

    private matchSearch(item: BeaconV1, search: string): boolean {
        search = search.toLowerCase();
        if (this.matchString(item.label, search))
            return true;
        return false;
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

        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let orgId = filter.getAsNullableString('org_id');
        let label = filter.getAsNullableString('label');
        let udi = filter.getAsNullableString('udi');
        udi = this.normalizeUdi(udi);
        let udis = filter.getAsObject('udis');
        udis = this.normalizeUdis(udis);

        return (item) => {
            if (id && item.id != id)
                return false;
            if (orgId && item.org_id != orgId)
                return false;
            if (udi && item.udi != udi)
                return false;
            if (udis && _.indexOf(udis, item.udi) < 0)
                return false;
            if (label && item.label != label)
                return false;
            if (search && !this.matchSearch(item, search))
                return false;
            return true;
        };
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<BeaconV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

    public getOneByUdi(correlationId: string, udi: string,
        callback: (err: any, item: BeaconV1) => void): void {
        
        udi = this.normalizeUdi(udi);
        let item = _.find(this._items, (item) => item.udi == udi && !item.deleted);

        if (item) this._logger.trace(correlationId, "Found beacon by %s", udi);
        else this._logger.trace(correlationId, "Cannot find beacon by %s", udi);

        callback(null, item);
    }
    
}