"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let services = require('../../../src/protos/msgdistribution_v1_grpc_pb');
let messages = require('../../../src/protos/msgdistribution_v1_pb');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
const MessageDistributionGrpcConverterV1_1 = require("./MessageDistributionGrpcConverterV1");
class MessageDistributionGrpcClientV1 extends pip_services3_grpc_node_1.GrpcClient {
    constructor(config) {
        super(services.MessageDistributionClient);
        let thisConfig = pip_services3_commons_node_1.ConfigParams.fromValue(config);
        this._defaultParameters = thisConfig.getSection('parameters');
        if (config != null)
            this.configure(thisConfig);
    }
    sendMessage(correlationId, recipient, message, parameters, method, callback) {
        parameters = this._defaultParameters.override(parameters);
        let request = new messages.SendMessageRequest();
        request.setMessage(MessageDistributionGrpcConverterV1_1.MessageDistributionGrpcConverterV1.fromMessage(message));
        MessageDistributionGrpcConverterV1_1.MessageDistributionGrpcConverterV1.setMap(request.getParametersMap(), parameters);
        request.setMethod(method);
        request.setRecipient(MessageDistributionGrpcConverterV1_1.MessageDistributionGrpcConverterV1.fromRecipient(recipient));
        let timing = this.instrument(correlationId, 'msg_distribution.send_message');
        this.call('send_message', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = MessageDistributionGrpcConverterV1_1.MessageDistributionGrpcConverterV1.toError(response.error);
            callback(err);
        });
    }
    sendMessages(correlationId, recipients, message, parameters, method, callback) {
        parameters = this._defaultParameters.override(parameters);
        let request = new messages.SendMessagesRequest();
        request.setMessage(MessageDistributionGrpcConverterV1_1.MessageDistributionGrpcConverterV1.fromMessage(message));
        MessageDistributionGrpcConverterV1_1.MessageDistributionGrpcConverterV1.setMap(request.getParametersMap(), parameters);
        request.setMethod(method);
        request.setRecipientsList(MessageDistributionGrpcConverterV1_1.MessageDistributionGrpcConverterV1.fromRecipients(recipients));
        let timing = this.instrument(correlationId, 'msg_distribution.send_messages');
        this.call('send_messages', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = MessageDistributionGrpcConverterV1_1.MessageDistributionGrpcConverterV1.toError(response.error);
            callback(err);
        });
    }
    sendMessageToRecipient(correlationId, recipientId, subscription, message, parameters, method, callback) {
        parameters = this._defaultParameters.override(parameters);
        let request = new messages.SendMessageWithRecipientRequest();
        request.setMessage(MessageDistributionGrpcConverterV1_1.MessageDistributionGrpcConverterV1.fromMessage(message));
        MessageDistributionGrpcConverterV1_1.MessageDistributionGrpcConverterV1.setMap(request.getParametersMap(), parameters);
        request.setMethod(method);
        request.setSubscription(subscription);
        request.setRecipientId(recipientId);
        let timing = this.instrument(correlationId, 'msg_distribution.send_message_to_recipient');
        this.call('send_message_to_recipient', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = MessageDistributionGrpcConverterV1_1.MessageDistributionGrpcConverterV1.toError(response.error);
            callback(err);
        });
    }
    sendMessageToRecipients(correlationId, recipientIds, subscription, message, parameters, method, callback) {
        parameters = this._defaultParameters.override(parameters);
        let request = new messages.SendMessageWithRecipientsRequest();
        request.setMessage(MessageDistributionGrpcConverterV1_1.MessageDistributionGrpcConverterV1.fromMessage(message));
        MessageDistributionGrpcConverterV1_1.MessageDistributionGrpcConverterV1.setMap(request.getParametersMap(), parameters);
        request.setMethod(method);
        request.setSubscription(subscription);
        request.setRecipientIdsList(recipientIds);
        let timing = this.instrument(correlationId, 'msg_distribution.send_message_to_recipients');
        this.call('send_message_to_recipients', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = MessageDistributionGrpcConverterV1_1.MessageDistributionGrpcConverterV1.toError(response.error);
            callback(err);
        });
    }
}
exports.MessageDistributionGrpcClientV1 = MessageDistributionGrpcClientV1;
//# sourceMappingURL=MessageDistributionGrpcClientV1.js.map