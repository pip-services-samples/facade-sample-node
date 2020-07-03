"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const AuthorizerV1_1 = require("./AuthorizerV1");
const SessionsOperationsV1_1 = require("../../operations/version1/SessionsOperationsV1");
const BeaconsOperationsV1_1 = require("../../operations/version1/BeaconsOperationsV1");
class FacadeServiceV1 extends pip_services3_rpc_node_1.RestService {
    constructor() {
        super();
        this._sessionsOperations = new SessionsOperationsV1_1.SessionsOperationsV1();
        this._beaconsOperations = new BeaconsOperationsV1_1.BeaconsOperationsV1();
        this._baseRoute = "api/1.0";
    }
    configure(config) {
        super.configure(config);
        this._sessionsOperations.configure(config);
        this._beaconsOperations.configure(config);
    }
    setReferences(references) {
        super.setReferences(references);
        this._sessionsOperations.setReferences(references);
        this._beaconsOperations.setReferences(references);
    }
    register() {
        let auth = new AuthorizerV1_1.AuthorizerV1();
        // Restore session middleware
        this.registerInterceptor('', (req, res, next) => { this._sessionsOperations.loadSession(req, res, next); });
        this.registerContentManagementRoutes(auth);
        this.registerUsersRoutes(auth);
    }
    registerContentManagementRoutes(auth) {
        // Beacons routes
        this.registerRouteWithAuth('get', '/beacons', null, auth.admin(), (req, res) => { this._beaconsOperations.getBeacons(req, res); });
        this.registerRouteWithAuth('get', '/beacons/:id', null, auth.owner('user_id'), (req, res) => { this._beaconsOperations.getBeaconById(req, res); });
        this.registerRouteWithAuth('get', '/beacons/udi/:udi', null, auth.owner('user_id'), (req, res) => { this._beaconsOperations.getBeaconByUdi(req, res); });
        this.registerRouteWithAuth('post', '/beacons', null, auth.admin(), (req, res) => { this._beaconsOperations.createBeacon(req, res); });
        this.registerRouteWithAuth('put', '/beacons', null, auth.admin(), (req, res) => { this._beaconsOperations.updateBeacon(req, res); });
        this.registerRouteWithAuth('del', '/beacons/:id', null, auth.admin(), (req, res) => { this._beaconsOperations.deleteBeaconById(req, res); });
        this.registerRouteWithAuth('post', '/beacons/position', null, auth.signed(), (req, res) => { this._beaconsOperations.calculatePosition(req, res); });
    }
    registerUsersRoutes(auth) {
        // Session Routes
        this.registerRouteWithAuth('post', '/users/signup', null, auth.anybody(), (req, res) => { this._sessionsOperations.signup(req, res); });
        this.registerRouteWithAuth('post', '/users/signin', null, auth.anybody(), (req, res) => { this._sessionsOperations.signin(req, res); });
        this.registerRouteWithAuth('post', '/users/signout', null, auth.anybody(), (req, res) => { this._sessionsOperations.signout(req, res); });
    }
}
exports.FacadeServiceV1 = FacadeServiceV1;
//# sourceMappingURL=FacadeServiceV1.js.map