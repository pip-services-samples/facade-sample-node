"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class ActivitiesHttpServiceV1 extends pip_services3_rpc_node_1.CommandableHttpService {
    constructor() {
        super('v1/activities');
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-activities', 'controller', 'default', '*', '1.0'));
    }
}
exports.ActivitiesHttpServiceV1 = ActivitiesHttpServiceV1;
//# sourceMappingURL=ActivitiesHttpServiceV1.js.map