"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
class BeaconsMemoryClientV1 {
    constructor() {
        this._beacons = [];
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
        if (this.matchString(item.id, search))
            return true;
        if (this.matchString(item.udi, search))
            return true;
        if (this.matchString(item.label, search))
            return true;
        return false;
    }
    contains(array1, array2) {
        if (array1 == null || array2 == null)
            return false;
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1])
                    return true;
        }
        return false;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let org_id = filter.getAsNullableString('org_id');
        let udi = filter.getAsNullableString('udi');
        let label = filter.getAsNullableString('label');
        let udis = filter.getAsObject('udis');
        // Process udis filter
        if (_.isString(udis))
            udis = udis.split(',');
        if (!_.isArray(udis))
            udis = null;
        return (item) => {
            if (id && item.id != id)
                return false;
            if (org_id && item.org_id != org_id)
                return false;
            if (label && item.label != label)
                return false;
            if (udi && item.udi != udi)
                return false;
            if (udis && _.indexOf(udis, item.udi) < 0)
                return false;
            if (search && !this.matchSearch(item, search))
                return false;
            return true;
        };
    }
    getBeacons(correlationId, filter, paging, callback) {
        let beacons = _.filter(this._beacons, this.composeFilter(filter));
        callback(null, new pip_services3_commons_node_2.DataPage(beacons, beacons.length));
    }
    getBeaconByUdi(correlationId, udi, callback) {
        let beacon = _.find(this._beacons, (d) => d.udi == udi);
        callback(null, beacon);
    }
    getBeaconById(correlationId, beaconId, callback) {
        let beacon = _.find(this._beacons, (d) => d.id == beaconId);
        callback(null, beacon);
    }
    calculatePosition(correlationId, orgId, udis, callback) {
        let beacons = _.filter(this._beacons, b => b.org_id == orgId && _.indexOf(udis, b.udi) >= 0);
        let position = null;
        let lat = 0;
        let long = 0;
        let count = 0;
        for (let beacon of beacons) {
            if (beacon.center && beacon.center.type == 'Point'
                && _.isArray(beacon.center.coordinates)) {
                long += beacon.center.coordinates[0];
                lat += beacon.center.coordinates[1];
                count += 1;
            }
        }
        if (count > 0) {
            position = {
                type: 'Point',
                coordinates: [long / count, lat / count]
            };
        }
        callback(null, position);
    }
    createBeacon(correlationId, beacon, callback) {
        beacon.id = beacon.id || pip_services3_commons_node_3.IdGenerator.nextLong();
        this._beacons.push(beacon);
        callback(null, beacon);
    }
    updateBeacon(correlationId, beacon, callback) {
        this._beacons = _.filter(this._beacons, (d) => d.id != beacon.id);
        this._beacons.push(beacon);
        callback(null, beacon);
    }
    deleteBeaconById(correlationId, beaconId, callback) {
        let beacon = _.find(this._beacons, b => b.id == beaconId);
        this._beacons = _.filter(this._beacons, b => b.id != beaconId);
        callback(null, beacon);
    }
}
exports.BeaconsMemoryClientV1 = BeaconsMemoryClientV1;
//# sourceMappingURL=BeaconsMemoryClientV1.js.map