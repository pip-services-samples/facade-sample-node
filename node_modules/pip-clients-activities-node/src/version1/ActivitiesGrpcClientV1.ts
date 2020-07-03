let _ = require('lodash');
let services = require('../../../src/protos/activities_v1_grpc_pb');
let messages = require('../../../src/protos/activities_v1_pb');

import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams} from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { GrpcClient } from 'pip-services3-grpc-node';

import { IActivitiesClientV1 } from './IActivitiesClientV1';
//import { IActivitiesController } from 'pip-services-activities-node';
import { PartyActivityV1 } from './PartyActivityV1';
import { ActivityGrpcConverterV1 } from './ActivityGrpcConverterV1';

export class ActivitiesGrpcClientV1 extends GrpcClient implements IActivitiesClientV1 {
            
    public constructor() {
        super(services.ActivitiesClient);
    }

    public getPartyActivities(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<PartyActivityV1>) => void): void {
        let request = new messages.PartyActivityPageRequest();

        ActivityGrpcConverterV1.setMap(request.getFilterMap(), filter);
        request.setPaging(ActivityGrpcConverterV1.fromPagingParams(paging));

        let timing = this.instrument(correlationId, 'activities.get_party_activities');

        this.call('get_party_activities',
            correlationId, 
            request,
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = ActivityGrpcConverterV1.toError(response.error);

                let result = response 
                    ? ActivityGrpcConverterV1.toPartyActivityPage(response.getPage())
                    : null;

                callback(err, result);
            }
        );
    }

    public logPartyActivity(correlationId: string, activity: PartyActivityV1,
        callback?: (err: any, activity: PartyActivityV1) => void): void {

        let request = new messages.PartyActivityLogRequest();
        request.setActivity(ActivityGrpcConverterV1.fromPartyActivity(activity));

        let timing = this.instrument(correlationId, 'activities.log_party_activity');

        this.call('log_party_activity',
            correlationId, 
            request,
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = ActivityGrpcConverterV1.toError(response.error);

                let result = response 
                    ? ActivityGrpcConverterV1.toPartyActivity(response.getActivity())
                    : null;

                callback(err, result);
            }
        );

    }

    public batchPartyActivities(correlationId: string, activities: PartyActivityV1[],
        callback?: (err: any) => void): void {

        let request = new messages.PartyActivityBatchRequest();
        request.setActivitiesList(ActivityGrpcConverterV1.fromPartyActivities(activities));

        let timing = this.instrument(correlationId, 'activities.batch_party_activities');

        this.call('batch_party_activities',
            correlationId, 
            request,
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = ActivityGrpcConverterV1.toError(response.error);

                callback(err);
            }
        );
    }

    public deletePartyActivities(correlationId: string, filter: FilterParams, 
        callback?: (err: any) => void): void {

        let request = new messages.PartyActivityDeleteRequest();
        ActivityGrpcConverterV1.setMap(request.getFilterMap(), filter);

        let timing = this.instrument(correlationId, 'activities.delete_party_activities');

        this.call('delete_party_activities',
            correlationId, 
            request,
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = ActivityGrpcConverterV1.toError(response.error);

                callback(err);
            }
        );

    }

}