"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const pip_services3_mongodb_node_1 = require("pip-services3-mongodb-node");
const ClientFacadeFactory_1 = require("../build/ClientFacadeFactory");
const ServiceFacadeFactory_1 = require("../build/ServiceFacadeFactory");
const FacadeFactory_1 = require("../build/FacadeFactory");
class FacadeProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("pip-facades-example", "Public facade for pip-vault 2.0");
        this._factories.add(new ClientFacadeFactory_1.ClientFacadeFactory);
        this._factories.add(new ServiceFacadeFactory_1.ServiceFacadeFactory);
        this._factories.add(new FacadeFactory_1.FacadeFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_mongodb_node_1.DefaultMongoDbFactory);
    }
}
exports.FacadeProcess = FacadeProcess;
//# sourceMappingURL=FacadeProcess.js.map