"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_data_node_1 = require("pip-services3-data-node");
const UdiConverter_1 = require("../data/version1/UdiConverter");
class BeaconsMemoryPersistence extends pip_services3_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
        this._maxPageSize = 1000;
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
        if (this.matchString(item.label, search))
            return true;
        return false;
    }
    normalizeUdi(udi) {
        return UdiConverter_1.UdiConverter.fromString(udi);
    }
    normalizeUdis(udis) {
        if (_.isString(udis))
            udis = udis.split(',');
        if (!_.isArray(udis))
            return null;
        for (let i = 0; i < udis.length; i++) {
            udis[i] = this.normalizeUdi(udis[i]);
        }
        return udis;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let orgId = filter.getAsNullableString('org_id');
        let label = filter.getAsNullableString('label');
        let udi = filter.getAsNullableString('udi');
        udi = this.normalizeUdi(udi);
        let udis = filter.getAsObject('udis');
        udis = this.normalizeUdis(udis);
        return (item) => {
            if (id && item.id != id)
                return false;
            if (orgId && item.org_id != orgId)
                return false;
            if (udi && item.udi != udi)
                return false;
            if (udis && _.indexOf(udis, item.udi) < 0)
                return false;
            if (label && item.label != label)
                return false;
            if (search && !this.matchSearch(item, search))
                return false;
            return true;
        };
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
    getOneByUdi(correlationId, udi, callback) {
        udi = this.normalizeUdi(udi);
        let item = _.find(this._items, (item) => item.udi == udi && !item.deleted);
        if (item)
            this._logger.trace(correlationId, "Found beacon by %s", udi);
        else
            this._logger.trace(correlationId, "Cannot find beacon by %s", udi);
        callback(null, item);
    }
}
exports.BeaconsMemoryPersistence = BeaconsMemoryPersistence;
//# sourceMappingURL=BeaconsMemoryPersistence.js.map