import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams} from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { DirectClient } from 'pip-services3-rpc-node';

import { IActivitiesClientV1 } from './IActivitiesClientV1';
//import { IActivitiesController } from 'pip-services-activities-node';
import { PartyActivityV1 } from './PartyActivityV1';

export class ActivitiesDirectClientV1 extends DirectClient<any> implements IActivitiesClientV1 {
            
    public constructor() {
        super();
        this._dependencyResolver.put('controller', new Descriptor("pip-services-activities", "controller", "*", "*", "*"))
    }

    public getPartyActivities(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<PartyActivityV1>) => void): void {
        let timing = this.instrument(correlationId, 'activities.get_party_activities');
        this._controller.getPartyActivities(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }

    public logPartyActivity(correlationId: string, activity: PartyActivityV1,
        callback?: (err: any, activity: PartyActivityV1) => void): void {
        let timing = this.instrument(correlationId, 'activities.log_party_activity');
        this._controller.logPartyActivity(correlationId, activity, (err, activity) => {
            timing.endTiming();
            if (callback) callback(err, activity);
        });
    }

    public batchPartyActivities(correlationId: string, activities: PartyActivityV1[],
        callback?: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'activities.batch_party_activities');
        this._controller.batchPartyActivities(correlationId, activities, (err) => {
            timing.endTiming();
            if (callback) callback(err);
        });
    }

    public deletePartyActivities(correlationId: string, filter: FilterParams, 
        callback?: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'activities.delete_party_activities');
        this._controller.deletePartyActivities(correlationId, filter, (err) => {
            timing.endTiming();
            if (callback) callback(err);
        });
    }

}