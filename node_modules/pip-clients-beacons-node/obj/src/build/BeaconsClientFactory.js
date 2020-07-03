"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_components_node_1 = require("pip-services3-components-node");
const BeaconsNullClientV1_1 = require("../version1/BeaconsNullClientV1");
const BeaconsMemoryClientV1_1 = require("../version1/BeaconsMemoryClientV1");
const BeaconsDirectClientV1_1 = require("../version1/BeaconsDirectClientV1");
const BeaconsHttpClientV1_1 = require("../version1/BeaconsHttpClientV1");
const BeaconsLambdaClientV1_1 = require("../version1/BeaconsLambdaClientV1");
class BeaconsClientFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(BeaconsClientFactory.NullClientV1Descriptor, BeaconsNullClientV1_1.BeaconsNullClientV1);
        this.registerAsType(BeaconsClientFactory.MemoryClientV1Descriptor, BeaconsMemoryClientV1_1.BeaconsMemoryClientV1);
        this.registerAsType(BeaconsClientFactory.DirectClientV1Descriptor, BeaconsDirectClientV1_1.BeaconsDirectClientV1);
        this.registerAsType(BeaconsClientFactory.HttpClientV1Descriptor, BeaconsHttpClientV1_1.BeaconsHttpClientV1);
        this.registerAsType(BeaconsClientFactory.LambdaClientV1Descriptor, BeaconsLambdaClientV1_1.BeaconsLambdaClientV1);
    }
}
exports.BeaconsClientFactory = BeaconsClientFactory;
BeaconsClientFactory.NullClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-beacons', 'client', 'null', '*', '1.0');
BeaconsClientFactory.MemoryClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-beacons', 'client', 'memory', '*', '1.0');
BeaconsClientFactory.DirectClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-beacons', 'client', 'direct', '*', '1.0');
BeaconsClientFactory.HttpClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-beacons', 'client', 'http', '*', '1.0');
BeaconsClientFactory.LambdaClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-beacons', 'client', 'lambda', '*', '1.0');
//# sourceMappingURL=BeaconsClientFactory.js.map