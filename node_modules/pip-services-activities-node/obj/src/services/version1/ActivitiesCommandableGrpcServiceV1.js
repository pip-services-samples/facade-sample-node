"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
class ActivitiesCommandableGrpcServiceV1 extends pip_services3_grpc_node_1.CommandableGrpcService {
    constructor() {
        super('v1/activities');
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-activities', 'controller', 'default', '*', '*'));
    }
}
exports.ActivitiesCommandableGrpcServiceV1 = ActivitiesCommandableGrpcServiceV1;
//# sourceMappingURL=ActivitiesCommandableGrpcServiceV1.js.map