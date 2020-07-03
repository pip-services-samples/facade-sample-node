import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { PartyActivityV1 } from './PartyActivityV1';
import { IActivitiesClientV1 } from './IActivitiesClientV1';

export class ActivitiesNullClientV1 implements IActivitiesClientV1 {
    constructor(config?: any) {}
        
    public getPartyActivities(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<PartyActivityV1>) => void): void {
        callback(null, new DataPage<PartyActivityV1>([], 0));
    }

    public logPartyActivity(correlationId: string, activity: PartyActivityV1,
        callback?: (err: any, activity: PartyActivityV1) => void): void {
        if (callback) callback(null, activity);
    }

    public batchPartyActivities(correlationId: string, activities: PartyActivityV1[],
        callback?: (err: any) => void): void {
        if (callback) callback(null);
    }

    public deletePartyActivities(correlationId: string, filter: FilterParams, 
        callback?: (err: any) => void): void {
        if (callback) callback(null);
    }
}
