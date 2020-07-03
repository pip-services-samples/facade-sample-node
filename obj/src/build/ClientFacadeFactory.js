"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_clients_accounts_node_1 = require("pip-clients-accounts-node");
const pip_clients_activities_node_1 = require("pip-clients-activities-node");
const pip_clients_sessions_node_1 = require("pip-clients-sessions-node");
const pip_clients_passwords_node_1 = require("pip-clients-passwords-node");
const pip_clients_roles_node_1 = require("pip-clients-roles-node");
const pip_clients_beacons_node_1 = require("pip-clients-beacons-node");
class ClientFacadeFactory extends pip_services3_components_node_1.CompositeFactory {
    constructor() {
        super();
        this.add(new pip_clients_accounts_node_1.AccountsClientFactory());
        this.add(new pip_clients_activities_node_1.ActivitiesClientFactory());
        this.add(new pip_clients_sessions_node_1.SessionsClientFactory());
        this.add(new pip_clients_passwords_node_1.PasswordsClientFactory());
        this.add(new pip_clients_roles_node_1.RolesClientFactory());
        this.add(new pip_clients_beacons_node_1.BeaconsClientFactory());
    }
}
exports.ClientFacadeFactory = ClientFacadeFactory;
//# sourceMappingURL=ClientFacadeFactory.js.map