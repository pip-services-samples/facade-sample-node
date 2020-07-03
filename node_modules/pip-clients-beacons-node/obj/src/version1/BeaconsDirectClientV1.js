"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class BeaconsDirectClientV1 extends pip_services3_rpc_node_1.DirectClient {
    constructor() {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-beacons', 'controller', '*', '*', '*'));
    }
    getBeacons(correlationId, filter, paging, callback) {
        let timing = this.instrument(correlationId, 'beacons.get_beacons');
        this._controller.getBeacons(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }
    getBeaconById(correlationId, id, callback) {
        let timing = this.instrument(correlationId, 'beacons.get_beacon_by_id');
        this._controller.getBeaconById(correlationId, id, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }
    getBeaconByUdi(correlationId, udi, callback) {
        let timing = this.instrument(correlationId, 'beacons.get_beacon_by_udi');
        this._controller.getBeaconByUdi(correlationId, udi, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }
    calculatePosition(correlationId, orgId, udis, callback) {
        let timing = this.instrument(correlationId, 'beacons.calculate_position');
        this._controller.calculatePosition(correlationId, orgId, udis, (err, position) => {
            timing.endTiming();
            callback(err, position);
        });
    }
    createBeacon(correlationId, item, callback) {
        let timing = this.instrument(correlationId, 'beacons.create_beacon');
        this._controller.createBeacon(correlationId, item, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }
    updateBeacon(correlationId, item, callback) {
        let timing = this.instrument(correlationId, 'beacons.update_beacon');
        this._controller.updateBeacon(correlationId, item, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }
    deleteBeaconById(correlationId, id, callback) {
        let timing = this.instrument(correlationId, 'beacons.delete_beacon_by_id');
        this._controller.deleteBeaconById(correlationId, id, (err, item) => {
            timing.endTiming();
            if (callback)
                callback(err, item);
        });
    }
}
exports.BeaconsDirectClientV1 = BeaconsDirectClientV1;
//# sourceMappingURL=BeaconsDirectClientV1.js.map