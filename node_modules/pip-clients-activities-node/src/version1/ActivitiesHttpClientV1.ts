import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { CommandableHttpClient } from 'pip-services3-rpc-node';

import { PartyActivityV1 } from './PartyActivityV1';
import { IActivitiesClientV1 } from './IActivitiesClientV1';

export class ActivitiesHttpClientV1 extends CommandableHttpClient implements IActivitiesClientV1 {

    constructor(config?: any) {
        super('v1/activities');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }
        
    public getPartyActivities(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<PartyActivityV1>) => void): void {
        this.callCommand(
            'get_party_activities',
            correlationId,
            {
                filter: filter,
                paging: paging
            },
            callback
        );
    }

    public logPartyActivity(correlationId: string, activity: PartyActivityV1,
        callback?: (err: any, activity: PartyActivityV1) => void): void {
        this.callCommand(
            'log_party_activity',
            correlationId,
            {
                activity: activity
            },
            callback
        );
    }

    public batchPartyActivities(correlationId: string, activities: PartyActivityV1[],
        callback?: (err: any) => void): void {
        this.callCommand(
            'batch_party_activities',
            correlationId,
            {
                activities: activities
            },
            callback
        );
    }

    public deletePartyActivities(correlationId: string, filter: FilterParams, 
        callback?: (err: any) => void): void {
        this.callCommand(
            'delete_party_activities',
            correlationId,
            {
                filter: filter
            },
            callback
        );
    }

}
