"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class MessageDistributionHttpClientV1 extends pip_services3_rpc_node_1.CommandableHttpClient {
    constructor(config) {
        super('v1/msg_distribution');
        let thisConfig = pip_services3_commons_node_1.ConfigParams.fromValue(config);
        this._defaultParameters = thisConfig.getSection('parameters');
        if (config != null)
            this.configure(thisConfig);
    }
    sendMessage(correlationId, recipient, message, parameters, method, callback) {
        parameters = this._defaultParameters.override(parameters);
        this.callCommand('send_message', correlationId, {
            recipient: recipient,
            message: message,
            parameters: parameters,
            method: method
        }, callback);
    }
    sendMessages(correlationId, recipients, message, parameters, method, callback) {
        parameters = this._defaultParameters.override(parameters);
        this.callCommand('send_messages', correlationId, {
            recipients: recipients,
            message: message,
            parameters: parameters,
            method: method
        }, callback);
    }
    sendMessageToRecipient(correlationId, recipientId, subscription, message, parameters, method, callback) {
        parameters = this._defaultParameters.override(parameters);
        this.callCommand('send_message_to_recipient', correlationId, {
            recipient_id: recipientId,
            subscription: subscription,
            message: message,
            parameters: parameters,
            method: method
        }, callback);
    }
    sendMessageToRecipients(correlationId, recipientIds, subscription, message, parameters, method, callback) {
        parameters = this._defaultParameters.override(parameters);
        this.callCommand('send_message_to_recipients', correlationId, {
            recipient_ids: recipientIds,
            subscription: subscription,
            message: message,
            parameters: parameters,
            method: method
        }, callback);
    }
}
exports.MessageDistributionHttpClientV1 = MessageDistributionHttpClientV1;
//# sourceMappingURL=MessageDistributionHttpClientV1.js.map