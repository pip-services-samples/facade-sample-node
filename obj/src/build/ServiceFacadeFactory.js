"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services_accounts_node_1 = require("pip-services-accounts-node");
const pip_services_sessions_node_1 = require("pip-services-sessions-node");
const pip_services_passwords_node_1 = require("pip-services-passwords-node");
const pip_services_roles_node_1 = require("pip-services-roles-node");
const pip_services_beacons_node_1 = require("pip-services-beacons-node");
class ServiceFacadeFactory extends pip_services3_components_node_1.CompositeFactory {
    constructor() {
        super();
        this.add(new pip_services_accounts_node_1.AccountsServiceFactory());
        this.add(new pip_services_sessions_node_1.SessionsServiceFactory());
        this.add(new pip_services_passwords_node_1.PasswordsServiceFactory());
        this.add(new pip_services_roles_node_1.RolesServiceFactory());
        this.add(new pip_services_beacons_node_1.BeaconsServiceFactory());
    }
}
exports.ServiceFacadeFactory = ServiceFacadeFactory;
//# sourceMappingURL=ServiceFacadeFactory.js.map