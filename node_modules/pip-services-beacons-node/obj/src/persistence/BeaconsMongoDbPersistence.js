"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_mongodb_node_1 = require("pip-services3-mongodb-node");
const UdiConverter_1 = require("../data/version1/UdiConverter");
class BeaconsMongoDbPersistence extends pip_services3_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('beacons');
        super.ensureIndex({ org_id: 1 });
        super.ensureIndex({ udi: 1 });
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
        let criteria = [];
        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ label: { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }
        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });
        let orgId = filter.getAsNullableString('org_id');
        if (orgId != null)
            criteria.push({ org_id: orgId });
        let label = filter.getAsNullableString('label');
        if (label != null)
            criteria.push({ label: label });
        let udi = filter.getAsNullableString('udi');
        udi = this.normalizeUdi(udi);
        if (udi != null)
            criteria.push({ udi: udi });
        let udis = filter.getAsObject('udis');
        udis = this.normalizeUdis(udis);
        if (udis != null)
            criteria.push({ udi: { $in: udis } });
        return criteria.length > 0 ? { $and: criteria } : null;
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
    getOneByUdi(correlationId, udi, callback) {
        udi = this.normalizeUdi(udi);
        let criteria = {
            udi: udi
        };
        this._collection.findOne(criteria, (err, item) => {
            item = this.convertToPublic(item);
            if (item)
                this._logger.trace(correlationId, "Found beacon by %s", udi);
            else
                this._logger.trace(correlationId, "Cannot find beacon by %s", udi);
            callback(err, item);
        });
    }
}
exports.BeaconsMongoDbPersistence = BeaconsMongoDbPersistence;
//# sourceMappingURL=BeaconsMongoDbPersistence.js.map