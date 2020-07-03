"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_components_node_1 = require("pip-services3-components-node");
const MessageDistributionNullClientV1_1 = require("../version1/MessageDistributionNullClientV1");
const MessageDistributionDirectClientV1_1 = require("../version1/MessageDistributionDirectClientV1");
const MessageDistributionHttpClientV1_1 = require("../version1/MessageDistributionHttpClientV1");
const MessageDistributionLambdaClientV1_1 = require("../version1/MessageDistributionLambdaClientV1");
const MessageDistributionCommandableGrpcClientV1_1 = require("../version1/MessageDistributionCommandableGrpcClientV1");
const MessageDistributionGrpcClientV1_1 = require("../version1/MessageDistributionGrpcClientV1");
class MessageDistributionClientFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(MessageDistributionClientFactory.NullClientV1Descriptor, MessageDistributionNullClientV1_1.MessageDistributionNullClientV1);
        this.registerAsType(MessageDistributionClientFactory.DirectClientV1Descriptor, MessageDistributionDirectClientV1_1.MessageDistributionDirectClientV1);
        this.registerAsType(MessageDistributionClientFactory.HttpClientV1Descriptor, MessageDistributionHttpClientV1_1.MessageDistributionHttpClientV1);
        this.registerAsType(MessageDistributionClientFactory.LambdaClientV1Descriptor, MessageDistributionLambdaClientV1_1.MessageDistributionLambdaClientV1);
        this.registerAsType(MessageDistributionClientFactory.CommandableGrpcClientV1Descriptor, MessageDistributionCommandableGrpcClientV1_1.MessageDistributionCommandableGrpcClientV1);
        this.registerAsType(MessageDistributionClientFactory.GrpcClientV1Descriptor, MessageDistributionGrpcClientV1_1.MessageDistributionGrpcClientV1);
    }
}
exports.MessageDistributionClientFactory = MessageDistributionClientFactory;
MessageDistributionClientFactory.Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-msgdistribution', 'factory', 'default', 'default', '1.0');
MessageDistributionClientFactory.NullClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-msgdistribution', 'client', 'null', 'default', '1.0');
MessageDistributionClientFactory.DirectClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-msgdistribution', 'client', 'direct', 'default', '1.0');
MessageDistributionClientFactory.HttpClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-msgdistribution', 'client', 'http', 'default', '1.0');
MessageDistributionClientFactory.LambdaClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-msgdistribution', 'client', 'lambda', 'default', '1.0');
MessageDistributionClientFactory.CommandableGrpcClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-msgdistribution', 'client', 'commandable-grpc', 'default', '1.0');
MessageDistributionClientFactory.GrpcClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-msgdistribution', 'client', 'grpc', 'default', '1.0');
//# sourceMappingURL=MessageDistributionClientFactory.js.map