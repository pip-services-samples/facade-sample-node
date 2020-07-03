"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
class ActivitiesLambdaClientV1 extends pip_services3_aws_node_1.CommandableLambdaClient {
    constructor(config) {
        super('activities');
        if (config != null)
            this.configure(pip_services3_commons_node_1.ConfigParams.fromValue(config));
    }
    getPartyActivities(correlationId, filter, paging, callback) {
        this.callCommand('get_party_activities', correlationId, {
            filter: filter,
            paging: paging
        }, callback);
    }
    logPartyActivity(correlationId, activity, callback) {
        this.callCommand('log_party_activity', correlationId, {
            activity: activity
        }, callback);
    }
    batchPartyActivities(correlationId, activities, callback) {
        this.callCommand('batch_party_activities', correlationId, {
            activities: activities
        }, callback);
    }
    deletePartyActivities(correlationId, filter, callback) {
        this.callCommand('delete_party_activities', correlationId, {
            filter: filter
        }, callback);
    }
}
exports.ActivitiesLambdaClientV1 = ActivitiesLambdaClientV1;
//# sourceMappingURL=ActivitiesLambdaClientV1.js.map