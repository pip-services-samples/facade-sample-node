"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
const pip_services3_commons_node_6 = require("pip-services3-commons-node");
const pip_services3_commons_node_7 = require("pip-services3-commons-node");
const pip_services3_commons_node_8 = require("pip-services3-commons-node");
const pip_services3_commons_node_9 = require("pip-services3-commons-node");
const PartyActivityV1Schema_1 = require("../data/version1/PartyActivityV1Schema");
class ActivitiesCommandSet extends pip_services3_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetPartyActivitiesCommand());
        this.addCommand(this.makeLogPartyActivityCommand());
        this.addCommand(this.makeBatchPartyActivitiesCommand());
        this.addCommand(this.makeDeletePartyActivitiesCommand());
    }
    makeGetPartyActivitiesCommand() {
        return new pip_services3_commons_node_2.Command("get_party_activities", new pip_services3_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_node_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_node_8.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services3_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getPartyActivities(correlationId, filter, paging, callback);
        });
    }
    makeLogPartyActivityCommand() {
        return new pip_services3_commons_node_2.Command("log_party_activity", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('activity', new PartyActivityV1Schema_1.PartyActivityV1Schema()), (correlationId, args, callback) => {
            let activity = args.get("activity");
            activity.time = pip_services3_commons_node_9.DateTimeConverter.toNullableDateTime(activity.time);
            this._logic.logPartyActivity(correlationId, activity, callback);
        });
    }
    makeBatchPartyActivitiesCommand() {
        return new pip_services3_commons_node_2.Command("batch_party_activities", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('activities', new pip_services3_commons_node_6.ArraySchema(new PartyActivityV1Schema_1.PartyActivityV1Schema())), (correlationId, args, callback) => {
            let activities = args.getAsArray("activities");
            _.each(activities, (a) => {
                a.time = pip_services3_commons_node_9.DateTimeConverter.toNullableDateTime(a.time);
            });
            this._logic.batchPartyActivities(correlationId, activities, (err) => {
                if (callback)
                    callback(err, null);
            });
        });
    }
    makeDeletePartyActivitiesCommand() {
        return new pip_services3_commons_node_2.Command("delete_party_activities", new pip_services3_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_node_7.FilterParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services3_commons_node_3.FilterParams.fromValue(args.get("filter"));
            this._logic.deletePartyActivities(correlationId, filter, (err) => {
                if (callback)
                    callback(err, null);
            });
        });
    }
}
exports.ActivitiesCommandSet = ActivitiesCommandSet;
//# sourceMappingURL=ActivitiesCommandSet.js.map