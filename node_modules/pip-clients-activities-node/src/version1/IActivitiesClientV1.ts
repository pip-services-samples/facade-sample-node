import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';

import { PartyActivityV1 } from './PartyActivityV1';

export interface IActivitiesClientV1 {
    getPartyActivities(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<PartyActivityV1>) => void): void;

    logPartyActivity(correlationId: string, activity: PartyActivityV1,
        callback?: (err: any, activity: PartyActivityV1) => void): void;

    batchPartyActivities(correlationId: string, activities: PartyActivityV1[],
        callback?: (err: any) => void): void;

    deletePartyActivities(correlationId: string, filter: FilterParams, 
        callback?: (err: any) => void): void;
}
