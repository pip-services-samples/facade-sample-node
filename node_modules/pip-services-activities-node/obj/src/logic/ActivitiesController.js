"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const ActivitiesCommandSet_1 = require("./ActivitiesCommandSet");
class ActivitiesController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_node_2.DependencyResolver(ActivitiesController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new ActivitiesCommandSet_1.ActivitiesCommandSet(this);
        return this._commandSet;
    }
    getPartyActivities(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    logPartyActivity(correlationId, activity, callback) {
        activity.time = pip_services3_commons_node_3.DateTimeConverter.toNullableDateTime(activity.time);
        activity.time = activity.time || new Date();
        this._persistence.create(correlationId, activity, callback);
    }
    batchPartyActivities(correlationId, activities, callback) {
        async.each(activities, (activity, callback) => {
            this._persistence.create(correlationId, activity, callback);
        }, (err) => {
            if (callback)
                callback(err);
        });
    }
    deletePartyActivities(correlationId, filter, callback) {
        this._persistence.deleteByFilter(correlationId, filter, callback);
    }
}
exports.ActivitiesController = ActivitiesController;
ActivitiesController._defaultConfig = pip_services3_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-activities:persistence:*:*:1.0');
//# sourceMappingURL=ActivitiesController.js.map