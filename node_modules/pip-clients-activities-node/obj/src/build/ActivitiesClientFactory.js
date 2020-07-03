"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_components_node_1 = require("pip-services3-components-node");
const ActivitiesNullClientV1_1 = require("../version1/ActivitiesNullClientV1");
const ActivitiesDirectClientV1_1 = require("../version1/ActivitiesDirectClientV1");
const ActivitiesHttpClientV1_1 = require("../version1/ActivitiesHttpClientV1");
const ActivitiesCommandableGrpcClientV1_1 = require("../version1/ActivitiesCommandableGrpcClientV1");
const ActivitiesGrpcClientV1_1 = require("../version1/ActivitiesGrpcClientV1");
const ActivitiesLambdaClientV1_1 = require("../version1/ActivitiesLambdaClientV1");
class ActivitiesClientFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(ActivitiesClientFactory.NullClientV1Descriptor, ActivitiesNullClientV1_1.ActivitiesNullClientV1);
        this.registerAsType(ActivitiesClientFactory.DirectClientV1Descriptor, ActivitiesDirectClientV1_1.ActivitiesDirectClientV1);
        this.registerAsType(ActivitiesClientFactory.HttpClientV1Descriptor, ActivitiesHttpClientV1_1.ActivitiesHttpClientV1);
        this.registerAsType(ActivitiesClientFactory.CommandableGrpcClientV1Descriptor, ActivitiesCommandableGrpcClientV1_1.ActivitiesCommandableGrpcClientV1);
        this.registerAsType(ActivitiesClientFactory.GrpcClientV1Descriptor, ActivitiesGrpcClientV1_1.ActivitiesGrpcClientV1);
        this.registerAsType(ActivitiesClientFactory.LambdaClientV1Descriptor, ActivitiesLambdaClientV1_1.ActivitiesLambdaClientV1);
    }
}
exports.ActivitiesClientFactory = ActivitiesClientFactory;
ActivitiesClientFactory.Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-activities', 'factory', 'default', 'default', '1.0');
ActivitiesClientFactory.NullClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-activities', 'client', 'null', 'default', '1.0');
ActivitiesClientFactory.DirectClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-activities', 'client', 'direct', 'default', '1.0');
ActivitiesClientFactory.HttpClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-activities', 'client', 'http', 'default', '1.0');
ActivitiesClientFactory.CommandableGrpcClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-activities', 'client', 'commandable-grpc', 'default', '1.0');
ActivitiesClientFactory.GrpcClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-activities', 'client', 'grpc', 'default', '1.0');
ActivitiesClientFactory.LambdaClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-activities', 'client', 'lambda', 'default', '1.0');
//# sourceMappingURL=ActivitiesClientFactory.js.map