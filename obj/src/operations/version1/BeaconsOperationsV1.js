"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class BeaconsOperationsV1 extends pip_services3_rpc_node_1.RestOperations {
    constructor() {
        super();
        this._dependencyResolver.put('beacons', new pip_services3_commons_node_1.Descriptor('pip-services-beacons', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._beaconsClient = this._dependencyResolver.getOneRequired('beacons');
    }
    getBeacons(req, res) {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        this._beaconsClient.getBeacons(null, filter, paging, (err, page) => {
            if (err) {
                this.sendError(req, res, err);
            }
            else {
                res.json(page);
                this.sendResult(req, res);
            }
        });
    }
    getBeaconById(req, res) {
        let id = req.route.params.id;
        this._beaconsClient.getBeaconById(null, id, (err, item) => {
            if (err) {
                this.sendError(req, res, err);
            }
            else {
                res.json(item);
                this.sendResult(req, res);
            }
        });
    }
    getBeaconByUdi(req, res) {
        let udi = req.route.params.udi;
        this._beaconsClient.getBeaconByUdi(null, udi, (err, item) => {
            if (err) {
                this.sendError(req, res, err);
            }
            else {
                res.json(item);
                this.sendResult(req, res);
            }
        });
    }
    createBeacon(req, res) {
        let data = req.body;
        this._beaconsClient.createBeacon(null, data, (err, item) => {
            if (err) {
                this.sendError(req, res, err);
            }
            else {
                res.json(item);
                this.sendResult(req, res);
            }
        });
    }
    updateBeacon(req, res) {
        let data = req.body;
        this._beaconsClient.updateBeacon(null, data, (err, item) => {
            if (err) {
                this.sendError(req, res, err);
            }
            else {
                res.json(item);
                this.sendResult(req, res);
            }
        });
    }
    deleteBeaconById(req, res) {
        let id = req.route.params.id;
        this._beaconsClient.deleteBeaconById(null, id, (err, item) => {
            if (err) {
                this.sendError(req, res, err);
            }
            else {
                res.json(item);
                this.sendResult(req, res);
            }
        });
    }
    calculatePosition(req, res) {
        let orgId = req.route.params.org_id || req.body.org_id;
        let udis = req.route.params.udis || req.body.udis;
        if (_.isString(udis))
            udis = udis.split(',');
        if (!_.isArray(udis))
            udis = null;
        this._beaconsClient.calculatePosition(null, orgId, udis, (err, position) => {
            if (err) {
                this.sendError(req, res, err);
            }
            else {
                res.json(position);
                this.sendResult(req, res);
            }
        });
    }
}
exports.BeaconsOperationsV1 = BeaconsOperationsV1;
//# sourceMappingURL=BeaconsOperationsV1.js.map