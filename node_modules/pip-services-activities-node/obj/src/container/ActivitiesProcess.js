"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const ActivitiesServiceFactory_1 = require("../build/ActivitiesServiceFactory");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
class ActivitiesProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("activities", "Party activities microservice");
        this._factories.add(new ActivitiesServiceFactory_1.ActivitiesServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_grpc_node_1.DefaultGrpcFactory);
    }
}
exports.ActivitiesProcess = ActivitiesProcess;
//# sourceMappingURL=ActivitiesProcess.js.map