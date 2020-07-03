"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const BeaconTypeV1_1 = require("../data/version1/BeaconTypeV1");
const UdiConverter_1 = require("../data/version1/UdiConverter");
const BeaconsCommandSet_1 = require("./BeaconsCommandSet");
class BeaconsController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_node_3.DependencyResolver(BeaconsController._defaultConfig);
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
            this._commandSet = new BeaconsCommandSet_1.BeaconsCommandSet(this);
        return this._commandSet;
    }
    getBeacons(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getBeaconById(correlationId, id, callback) {
        this._persistence.getOneById(correlationId, id, callback);
    }
    getBeaconByUdi(correlationId, udi, callback) {
        udi = UdiConverter_1.UdiConverter.fromString(udi);
        this._persistence.getOneByUdi(correlationId, udi, callback);
    }
    calculatePosition(correlationId, orgId, udis, callback) {
        let beacons;
        let position = null;
        if (udis == null || udis.length == 0) {
            callback(null, null);
            return;
        }
        async.series([
            // Retrieve beacons
            (callback) => {
                this._persistence.getPageByFilter(correlationId, pip_services3_commons_node_1.FilterParams.fromTuples('org_id', orgId, 'udis', udis), null, (err, page) => {
                    beacons = page ? page.data : [];
                    callback(err);
                });
            },
            // Calculate position
            (callback) => {
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
                callback();
            }
        ], (err) => {
            callback(err, err == null ? position : null);
        });
    }
    fixBeacon(item) {
        if (item == null)
            return;
        item.type = item.type || BeaconTypeV1_1.BeaconTypeV1.Unknown;
        item.udi = UdiConverter_1.UdiConverter.fromString(item.udi);
    }
    createBeacon(correlationId, item, callback) {
        item.id = item.id || pip_services3_commons_node_4.IdGenerator.nextLong();
        this.fixBeacon(item);
        this._persistence.create(correlationId, item, callback);
    }
    updateBeacon(correlationId, item, callback) {
        this.fixBeacon(item);
        this._persistence.update(correlationId, item, callback);
    }
    deleteBeaconById(correlationId, id, callback) {
        this._persistence.deleteById(correlationId, id, callback);
    }
}
exports.BeaconsController = BeaconsController;
BeaconsController._defaultConfig = pip_services3_commons_node_2.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-beacons:persistence:*:*:1.0');
//# sourceMappingURL=BeaconsController.js.map