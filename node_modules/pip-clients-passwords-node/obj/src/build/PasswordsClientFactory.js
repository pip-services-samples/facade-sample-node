"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_components_node_1 = require("pip-services3-components-node");
const PasswordsNullClientV1_1 = require("../version1/PasswordsNullClientV1");
const PasswordsDirectClientV1_1 = require("../version1/PasswordsDirectClientV1");
const PasswordsHttpClientV1_1 = require("../version1/PasswordsHttpClientV1");
const PasswordsLambdaClientV1_1 = require("../version1/PasswordsLambdaClientV1");
const PasswordsCommandableGrpcClientV1_1 = require("../version1/PasswordsCommandableGrpcClientV1");
const PasswordsGrpcClientV1_1 = require("../version1/PasswordsGrpcClientV1");
class PasswordsClientFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(PasswordsClientFactory.NullClientV1Descriptor, PasswordsNullClientV1_1.PasswordsNullClientV1);
        this.registerAsType(PasswordsClientFactory.DirectClientV1Descriptor, PasswordsDirectClientV1_1.PasswordsDirectClientV1);
        this.registerAsType(PasswordsClientFactory.HttpClientV1Descriptor, PasswordsHttpClientV1_1.PasswordsHttpClientV1);
        this.registerAsType(PasswordsClientFactory.LambdaClientV1Descriptor, PasswordsLambdaClientV1_1.PasswordsLambdaClientV1);
        this.registerAsType(PasswordsClientFactory.CommandableGrpcClientV1Descriptor, PasswordsCommandableGrpcClientV1_1.PasswordsCommandableGrpcClientV1);
        this.registerAsType(PasswordsClientFactory.GrpcClientV1Descriptor, PasswordsGrpcClientV1_1.PasswordsGrpcClientV1);
    }
}
exports.PasswordsClientFactory = PasswordsClientFactory;
PasswordsClientFactory.Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-passwords', 'factory', 'default', 'default', '1.0');
PasswordsClientFactory.NullClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-passwords', 'client', 'null', 'default', '1.0');
PasswordsClientFactory.DirectClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-passwords', 'client', 'direct', 'default', '1.0');
PasswordsClientFactory.HttpClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-passwords', 'client', 'http', 'default', '1.0');
PasswordsClientFactory.LambdaClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-passwords', 'client', 'lambda', 'default', '1.0');
PasswordsClientFactory.CommandableGrpcClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-passwords', 'client', 'commandable-grpc', 'default', '1.0');
PasswordsClientFactory.GrpcClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-passwords', 'client', 'grpc', 'default', '1.0');
//# sourceMappingURL=PasswordsClientFactory.js.map