"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_mongodb_node_1 = require("pip-services3-mongodb-node");
class ActivitiesMongoDbPersistence extends pip_services3_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('party_activities');
        super.ensureIndex({ time: -1 });
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let criteria = [];
        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ type: { $regex: searchRegex } });
            searchCriteria.push({ 'party.name': { $regex: searchRegex } });
            searchCriteria.push({ 'ref_item.name': { $regex: searchRegex } });
            searchCriteria.push({ 'ref_party.name': { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }
        let id = filter.getAsNullableString('id') || filter.getAsNullableString('activity_id');
        if (id != null)
            criteria.push({ _id: id });
        let orgId = filter.getAsNullableString('org_id');
        if (orgId != null)
            criteria.push({ org_id: orgId });
        let type = filter.getAsNullableString('type');
        if (type != null)
            criteria.push({ type: type });
        // Decode include types
        let includeTypes = filter.getAsObject('include_types');
        if (includeTypes) {
            if (!_.isArray(includeTypes))
                includeTypes = ('' + includeTypes).split(',');
            criteria.push({ type: { $in: includeTypes } });
        }
        // Decode exclude types
        let excludeTypes = filter.getAsObject('exclude_types');
        if (excludeTypes) {
            if (!_.isArray(excludeTypes))
                excludeTypes = ('' + excludeTypes).split(',');
            criteria.push({ type: { $nin: excludeTypes } });
        }
        // Decode party_id
        let partyId = filter.getAsNullableString('party_id');
        if (partyId)
            criteria.push({ 'party.id': partyId });
        // Decode ref_item_id
        let refItemId = filter.getAsNullableString('ref_item_id');
        if (refItemId)
            criteria.push({ 'ref_item.id': refItemId });
        // Decode ref_parent_id and ref_item_id
        let refParentId = filter.getAsNullableString('ref_parent_id');
        if (refParentId)
            criteria.push({ 'ref_parents.id': refParentId });
        // Decode party
        let refPartyId = filter.getAsNullableString('ref_party_id');
        if (refPartyId)
            criteria.push({ 'ref_party.id': refPartyId });
        let fromTime = filter.getAsNullableDateTime('from_time');
        if (fromTime != null)
            criteria.push({ time: { $gte: fromTime } });
        let toTime = filter.getAsNullableDateTime('to_time');
        if (toTime != null)
            criteria.push({ time: { $lt: toTime } });
        return criteria.length > 0 ? { $and: criteria } : {};
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        let criteria = this.composeFilter(filter);
        super.getPageByFilter(correlationId, criteria, paging, '-time', { parent_ids: 0 }, callback);
    }
    create(correlationId, item, callback) {
        item.ref_parents = item.ref_parents || [];
        if (item.ref_item)
            item.ref_parents.push(item.ref_item);
        super.create(correlationId, item, callback);
    }
    deleteByFilter(correlationId, filter, callback) {
        let criteria = this.composeFilter(filter);
        this._collection.remove(criteria, { multi: true }, (err) => { callback(err); });
    }
}
exports.ActivitiesMongoDbPersistence = ActivitiesMongoDbPersistence;
//# sourceMappingURL=ActivitiesMongoDbPersistence.js.map