"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let services = require('../../../src/protos/activities_v1_grpc_pb');
let messages = require('../../../src/protos/activities_v1_pb');
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
const ActivityGrpcConverterV1_1 = require("./ActivityGrpcConverterV1");
class ActivitiesGrpcClientV1 extends pip_services3_grpc_node_1.GrpcClient {
    constructor() {
        super(services.ActivitiesClient);
    }
    getPartyActivities(correlationId, filter, paging, callback) {
        let request = new messages.PartyActivityPageRequest();
        ActivityGrpcConverterV1_1.ActivityGrpcConverterV1.setMap(request.getFilterMap(), filter);
        request.setPaging(ActivityGrpcConverterV1_1.ActivityGrpcConverterV1.fromPagingParams(paging));
        let timing = this.instrument(correlationId, 'activities.get_party_activities');
        this.call('get_party_activities', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = ActivityGrpcConverterV1_1.ActivityGrpcConverterV1.toError(response.error);
            let result = response
                ? ActivityGrpcConverterV1_1.ActivityGrpcConverterV1.toPartyActivityPage(response.getPage())
                : null;
            callback(err, result);
        });
    }
    logPartyActivity(correlationId, activity, callback) {
        let request = new messages.PartyActivityLogRequest();
        request.setActivity(ActivityGrpcConverterV1_1.ActivityGrpcConverterV1.fromPartyActivity(activity));
        let timing = this.instrument(correlationId, 'activities.log_party_activity');
        this.call('log_party_activity', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = ActivityGrpcConverterV1_1.ActivityGrpcConverterV1.toError(response.error);
            let result = response
                ? ActivityGrpcConverterV1_1.ActivityGrpcConverterV1.toPartyActivity(response.getActivity())
                : null;
            callback(err, result);
        });
    }
    batchPartyActivities(correlationId, activities, callback) {
        let request = new messages.PartyActivityBatchRequest();
        request.setActivitiesList(ActivityGrpcConverterV1_1.ActivityGrpcConverterV1.fromPartyActivities(activities));
        let timing = this.instrument(correlationId, 'activities.batch_party_activities');
        this.call('batch_party_activities', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = ActivityGrpcConverterV1_1.ActivityGrpcConverterV1.toError(response.error);
            callback(err);
        });
    }
    deletePartyActivities(correlationId, filter, callback) {
        let request = new messages.PartyActivityDeleteRequest();
        ActivityGrpcConverterV1_1.ActivityGrpcConverterV1.setMap(request.getFilterMap(), filter);
        let timing = this.instrument(correlationId, 'activities.delete_party_activities');
        this.call('delete_party_activities', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = ActivityGrpcConverterV1_1.ActivityGrpcConverterV1.toError(response.error);
            callback(err);
        });
    }
}
exports.ActivitiesGrpcClientV1 = ActivitiesGrpcClientV1;
//# sourceMappingURL=ActivitiesGrpcClientV1.js.map