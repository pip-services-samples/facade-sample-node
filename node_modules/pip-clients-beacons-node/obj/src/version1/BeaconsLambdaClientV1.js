"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
class BeaconsLambdaClientV1 extends pip_services3_aws_node_1.CommandableLambdaClient {
    constructor(config) {
        super('beacons');
        if (config != null)
            this.configure(pip_services3_commons_node_1.ConfigParams.fromValue(config));
    }
    getBeacons(correlationId, filter, paging, callback) {
        this.callCommand('get_beacons', correlationId, {
            filter: filter,
            paging: paging
        }, callback);
    }
    getBeaconById(correlationId, id, callback) {
        this.callCommand('get_beacon_by_id', correlationId, {
            beacon_id: id
        }, callback);
    }
    getBeaconByUdi(correlationId, udi, callback) {
        this.callCommand('get_beacon_by_udi', correlationId, {
            udi: udi
        }, callback);
    }
    calculatePosition(correlationId, orgId, udis, callback) {
        this.callCommand('calculate_position', correlationId, {
            org_id: orgId,
            udis: udis
        }, callback);
    }
    createBeacon(correlationId, item, callback) {
        this.callCommand('create_beacon', correlationId, {
            beacon: item
        }, callback);
    }
    updateBeacon(correlationId, item, callback) {
        this.callCommand('update_beacon', correlationId, {
            beacon: item
        }, callback);
    }
    deleteBeaconById(correlationId, id, callback) {
        this.callCommand('delete_beacon_by_id', correlationId, {
            beacon_id: id
        }, callback);
    }
}
exports.BeaconsLambdaClientV1 = BeaconsLambdaClientV1;
//# sourceMappingURL=BeaconsLambdaClientV1.js.map