"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_couchbase_node_1 = require("pip-services3-couchbase-node");
class ActivitiesCouchbasePersistence extends pip_services3_couchbase_node_1.IdentifiableCouchbasePersistence {
    constructor() {
        super('users', 'party_activities');
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
        let refItemId = filter.getAsNullableString('ref_item_id');
        let refParentId = filter.getAsNullableString('ref_parent_id');
        let refPartyId = filter.getAsNullableString('ref_party_id');
        let fromTime = filter.getAsNullableDateTime('from_time');
        let toTime = filter.getAsNullableDateTime('to_time');
        // Process include_types filter
        if (_.isString(includeTypes))
            includeTypes = includeTypes.split(',');
        if (!_.isArray(includeTypes))
            includeTypes = null;
        // Process exclude_types filter
        if (_.isString(excludeTypes))
            excludeTypes = excludeTypes.split(',');
        if (!_.isArray(excludeTypes))
            excludeTypes = null;
        let filters = [];
        if (id != null)
            filters.push("id='" + id + "'");
        if (orgId != null)
            filters.push("org_id='" + orgId + "'");
        if (type != null)
            filters.push("type='" + type + "'");
        if (includeTypes != null) {
            filters.push("type IN ['" + includeTypes.join("','") + "']");
        }
        if (excludeTypes != null) {
            filters.push("type NOT IN ['" + excludeTypes.join("','") + "']");
        }
        if (search != null) {
            filters.push("(type LIKE '%" + search + "%' OR party.name LIKE '%" + search + "%' OR ref_item.name LIKE '%" + search + "% OR ref_party.name LIKE '%" + search + "%')");
        }
        if (partyId != null)
            filters.push("party.id='" + partyId + "'");
        if (refItemId != null)
            filters.push("ref_item.id='" + refItemId + "'");
        if (refParentId != null)
            filters.push("ref_parents.id='" + refParentId + "'");
        if (refPartyId != null)
            filters.push("ref_party.id='" + refPartyId + "'");
        if (fromTime != null)
            filters.push("time>='" + fromTime + "'");
        if (toTime != null)
            filters.push("time<'" + toTime + "'");
        return filters.length > 0 ? filters.join(" AND ") : null;
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        let criteria = this.composeFilter(filter);
        super.getPageByFilter(correlationId, criteria, paging, 'time DESC', null, callback);
    }
    create(correlationId, item, callback) {
        item.ref_parents = item.ref_parents || [];
        if (item.ref_item)
            item.ref_parents.push(item.ref_item);
        super.create(correlationId, item, callback);
    }
}
exports.ActivitiesCouchbasePersistence = ActivitiesCouchbasePersistence;
//# sourceMappingURL=ActivitiesCouchbasePersistence.js.map