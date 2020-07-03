import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';
import { PartyActivityV1 } from '../data/version1/PartyActivityV1';
import { IActivitiesPersistence } from './IActivitiesPersistence';
export declare class ActivitiesMemoryPersistence extends IdentifiableMemoryPersistence<PartyActivityV1, string> implements IActivitiesPersistence {
    constructor();
    private matchString;
    private matchSearch;
    private equalIds;
    private includeId;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<PartyActivityV1>) => void): void;
    create(correlationId: string, item: PartyActivityV1, callback: (err: any, item: PartyActivityV1) => void): void;
    deleteByFilter(correlationId: string, filter: FilterParams, callback: (err: any) => void): void;
}
