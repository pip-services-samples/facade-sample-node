"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let services = require('../../../../src/protos/activities_v1_grpc_pb');
let messages = require('../../../../src/protos/activities_v1_pb');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
const ActivitiesGrpcConverterV1_1 = require("./ActivitiesGrpcConverterV1");
class ActivitiesGrpcServiceV1 extends pip_services3_grpc_node_1.GrpcService {
    constructor() {
        super(services.ActivitiesService);
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor("pip-services-activities", "controller", "default", "*", "*"));
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired('controller');
    }
    getPartyActivities(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let filter = new pip_services3_commons_node_2.FilterParams();
        ActivitiesGrpcConverterV1_1.ActivitiesGrpcConverterV1.setMap(filter, call.request.getFilterMap());
        let paging = ActivitiesGrpcConverterV1_1.ActivitiesGrpcConverterV1.toPagingParams(call.request.getPaging());
        this._controller.getPartyActivities(correlationId, filter, paging, (err, result) => {
            let error = ActivitiesGrpcConverterV1_1.ActivitiesGrpcConverterV1.fromError(err);
            let page = err == null ? ActivitiesGrpcConverterV1_1.ActivitiesGrpcConverterV1.fromPartyActivityPage(result) : null;
            let response = new messages.PartyActivityPageReply();
            response.setError(error);
            response.setPage(page);
            callback(err, response);
        });
    }
    logPartyActivity(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let activity = ActivitiesGrpcConverterV1_1.ActivitiesGrpcConverterV1.toPartyActivity(call.request.getActivity());
        this._controller.logPartyActivity(correlationId, activity, (err, result) => {
            let error = ActivitiesGrpcConverterV1_1.ActivitiesGrpcConverterV1.fromError(err);
            let activity = err == null ? ActivitiesGrpcConverterV1_1.ActivitiesGrpcConverterV1.fromPartyActivity(result) : null;
            let response = new messages.PartyActivityObjectReply();
            response.setError(error);
            if (result)
                response.setPartyActivity(activity);
            callback(err, response);
        });
    }
    batchPartyActivities(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let activities = ActivitiesGrpcConverterV1_1.ActivitiesGrpcConverterV1.toPartyActivities(call.request.getActivitiesList());
        this._controller.batchPartyActivities(correlationId, activities, (err) => {
            let error = ActivitiesGrpcConverterV1_1.ActivitiesGrpcConverterV1.fromError(err);
            let response = new messages.PartyActivityOnlyErrorReply();
            response.setError(error);
            callback(err, response);
        });
    }
    deletePartyActivities(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let filter = pip_services3_commons_node_2.FilterParams.fromValue(call.request.filterMap);
        this._controller.deletePartyActivities(correlationId, filter, (err) => {
            let error = ActivitiesGrpcConverterV1_1.ActivitiesGrpcConverterV1.fromError(err);
            let response = new messages.PartyActivityOnlyErrorReply();
            response.setError(error);
            callback(err, response);
        });
    }
    register() {
        this.registerMethod('get_party_activities', null, this.getPartyActivities);
        this.registerMethod('log_party_activity', null, this.logPartyActivity);
        this.registerMethod('batch_party_activities', null, this.batchPartyActivities);
        this.registerMethod('delete_party_activities', null, this.deletePartyActivities);
    }
}
exports.ActivitiesGrpcServiceV1 = ActivitiesGrpcServiceV1;
//# sourceMappingURL=ActivitiesGrpcServiceV1.js.map