import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';

import { PartyActivityV1 } from '../data/version1/PartyActivityV1';

export interface IActivitiesPersistence {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<PartyActivityV1>) => void): void;

    create(correlationId: string, activity: PartyActivityV1,
        callback: (err: any, activity: PartyActivityV1) => void): void;

    deleteByFilter(correlationId: string, filter: FilterParams, 
        callback: (err: any) => void): void;
}
