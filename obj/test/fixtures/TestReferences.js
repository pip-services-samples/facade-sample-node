"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_container_node_1 = require("pip-services3-container-node");
const TestUsers_1 = require("./TestUsers");
const ClientFacadeFactory_1 = require("../../src/build/ClientFacadeFactory");
const ServiceFacadeFactory_1 = require("../../src/build/ServiceFacadeFactory");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const FacadeServiceV1_1 = require("../../src/services/version1/FacadeServiceV1");
const pip_clients_accounts_node_1 = require("pip-clients-accounts-node");
const pip_clients_sessions_node_1 = require("pip-clients-sessions-node");
const pip_clients_beacons_node_1 = require("pip-clients-beacons-node");
class TestReferences extends pip_services3_container_node_1.ManagedReferences {
    constructor() {
        super();
        this._factory = new pip_services3_components_node_1.CompositeFactory();
        this.setupFactories();
        this.appendDependencies();
        this.configureService();
        this.createUsersAndSessions();
    }
    setupFactories() {
        this._factory.add(new ClientFacadeFactory_1.ClientFacadeFactory());
        this._factory.add(new ServiceFacadeFactory_1.ServiceFacadeFactory());
        this._factory.add(new pip_services3_rpc_node_1.DefaultRpcFactory());
    }
    append(descriptor) {
        let component = this._factory.create(descriptor);
        this.put(descriptor, component);
    }
    appendDependencies() {
        // Add factories
        this.put(null, this._factory);
        // Add service
        this.put(null, new FacadeServiceV1_1.FacadeServiceV1());
        // Add user management services
        this.put(new pip_services3_commons_node_2.Descriptor('pip-services-accounts', 'client', 'memory', 'default', '*'), new pip_clients_accounts_node_1.AccountsMemoryClientV1());
        this.put(new pip_services3_commons_node_2.Descriptor('pip-services-sessions', 'client', 'memory', 'default', '*'), new pip_clients_sessions_node_1.SessionsMemoryClientV1());
        // Add content management services
        // Beacons
        this.put(new pip_services3_commons_node_2.Descriptor('pip-services-beacons', 'client', 'memory', 'default', '*'), new pip_clients_beacons_node_1.BeaconsMemoryClientV1());
    }
    configureService() {
        // Configure Facade service
        let service = this.getOneRequired(new pip_services3_commons_node_2.Descriptor('pip-services', 'endpoint', 'http', 'default', '*'));
        service.configure(pip_services3_commons_node_1.ConfigParams.fromTuples('root_path', '', //'/api/1.0',
        'connection.protocol', 'http', 'connection.host', '0.0.0.0', 'connection.port', 3000));
    }
    createUsersAndSessions() {
        // Create accounts
        let accountsClient = this.getOneRequired(new pip_services3_commons_node_2.Descriptor('pip-services-accounts', 'client', '*', '*', '*'));
        let adminUserAccount = {
            id: TestUsers_1.TestUsers.AdminUserId,
            login: TestUsers_1.TestUsers.AdminUserLogin,
            name: TestUsers_1.TestUsers.AdminUserName,
            active: true,
            create_time: new Date()
        };
        accountsClient.createAccount(null, adminUserAccount, () => { });
        let user1Account = {
            id: TestUsers_1.TestUsers.User1Id,
            login: TestUsers_1.TestUsers.User1Login,
            name: TestUsers_1.TestUsers.User1Name,
            active: true,
            create_time: new Date()
        };
        accountsClient.createAccount(null, user1Account, () => { });
        let user2Account = {
            id: TestUsers_1.TestUsers.User2Id,
            login: TestUsers_1.TestUsers.User2Login,
            name: TestUsers_1.TestUsers.User2Name,
            active: true,
            create_time: new Date()
        };
        accountsClient.createAccount(null, user2Account, () => { });
        // Create opened sessions
        let sessionsClient = this.getOneRequired(new pip_services3_commons_node_2.Descriptor('pip-services-sessions', 'client', '*', '*', '*'));
        let adminUserData = _.clone(adminUserAccount);
        adminUserData.roles = ['admin'];
        sessionsClient.openSession(null, TestUsers_1.TestUsers.AdminUserId, TestUsers_1.TestUsers.AdminUserName, null, null, adminUserData, null, (err, session) => { session.id = TestUsers_1.TestUsers.AdminUserSessionId; });
        let user1Data = _.clone(user1Account);
        user1Data.roles = [];
        sessionsClient.openSession(null, TestUsers_1.TestUsers.User1Id, TestUsers_1.TestUsers.User1Name, null, null, user1Data, null, (err, session) => { session.id = TestUsers_1.TestUsers.User1SessionId; });
        let user2Data = _.clone(user2Account);
        user2Data.roles = [];
        sessionsClient.openSession(null, TestUsers_1.TestUsers.User2Id, TestUsers_1.TestUsers.User2Name, null, null, user2Data, null, (err, session) => { session.id = TestUsers_1.TestUsers.User2SessionId; });
    }
}
exports.TestReferences = TestReferences;
//# sourceMappingURL=TestReferences.js.map