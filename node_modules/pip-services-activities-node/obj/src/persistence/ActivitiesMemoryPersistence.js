"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_data_node_1 = require("pip-services3-data-node");
class ActivitiesMemoryPersistence extends pip_services3_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    matchString(value, search) {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }
    matchSearch(item, search) {
        search = search.toLowerCase();
        if (this.matchString(item.type, search))
            return true;
        if (item.party && this.matchString(item.party.name, search))
            return true;
        if (item.ref_item && this.matchString(item.ref_item.name, search))
            return true;
        if (item.ref_party && this.matchString(item.ref_party.name, search))
            return true;
        if (this.matchString(item.type, search))
            return true;
        return false;
    }
    equalIds(reference, id) {
        return (reference != null) ? reference.id == id : false;
    }
    includeId(references, id) {
        if (references == null)
            return false;
        for (let i = 0; i < references.length; i++) {
            let ref = references[i];
            if (ref && ref.id == id)
                return true;
        }
        return false;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id') || filter.getAsNullableString('activity_id');
        let orgId = filter.getAsNullableString('org_id');
        let type = filter.getAsNullableString('type');
        let includeTypes = filter.getAsObject('include_types');
        let excludeTypes = filter.getAsObject('exclude_types');
        let partyId = filter.getAsNullableString('party_id');
        let refParentId = filter.getAsNullableString('ref_parent_id');
        let refPartyId = filter.getAsNullableString('ref_party_id');
        let refItemId = filter.getAsNullableString('ref_item_id');
        let fromTime = filter.getAsNullableDateTime('from_time');
        let toTime = filter.getAsNullableDateTime('to_time');
        // Convert string parameters to arrays
        if (includeTypes && !_.isArray(includeTypes))
            includeTypes = ('' + includeTypes).split(',');
        if (excludeTypes && !_.isArray(excludeTypes))
            excludeTypes = ('' + excludeTypes).split(',');
        return (item) => {
            if (search != null && !this.matchSearch(item, search))
                return false;
            if (id != null && id != item.id)
                return false;
            if (orgId != null && orgId != item.org_id)
                return false;
            if (type != null && type != item.type)
                return false;
            if (includeTypes && !_.include(includeTypes, item.id))
                return false;
            if (excludeTypes && _.include(excludeTypes, item.id))
                return false;
            if (refParentId && !this.includeId(item.ref_parents, refParentId))
                return false;
            if (refItemId && !this.includeId(item.ref_parents, refItemId))
                return false;
            if (partyId && !this.equalIds(item.party, partyId))
                return false;
            if (refPartyId && !this.equalIds(item.ref_party, refPartyId))
                return false;
            if (refItemId && !this.equalIds(item.ref_item, refItemId))
                return false;
            if (fromTime != null && item.time >= fromTime)
                return false;
            if (toTime != null && item.time < toTime)
                return false;
            return true;
        };
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
    create(correlationId, item, callback) {
        item.ref_parents = item.ref_parents || [];
        if (item.ref_item)
            item.ref_parents.push(item.ref_item);
        super.create(correlationId, item, callback);
    }
    deleteByFilter(correlationId, filter, callback) {
        this._items = _.filter(this._items, this.composeFilter(filter));
        callback(null);
    }
}
exports.ActivitiesMemoryPersistence = ActivitiesMemoryPersistence;
//# sourceMappingURL=ActivitiesMemoryPersistence.js.map