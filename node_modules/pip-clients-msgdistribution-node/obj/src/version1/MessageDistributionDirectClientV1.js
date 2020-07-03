"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
//import { IMessageDistributionController } from 'pip-services-msgdistribution-node';
class MessageDistributionDirectClientV1 extends pip_services3_rpc_node_1.DirectClient {
    constructor(config) {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_node_2.Descriptor("pip-services-msgdistribution", "controller", "*", "*", "*"));
        let thisConfig = pip_services3_commons_node_1.ConfigParams.fromValue(config);
        this._defaultParameters = thisConfig.getSection('parameters');
        if (config != null)
            this.configure(thisConfig);
    }
    sendMessage(correlationId, recipient, message, parameters, method, callback) {
        parameters = this._defaultParameters.override(parameters);
        let timing = this.instrument(correlationId, 'msg_distribution.send_message');
        this._controller.sendMessage(correlationId, recipient, message, parameters, method, (err) => {
            timing.endTiming();
            if (callback)
                callback(err);
        });
    }
    sendMessages(correlationId, recipients, message, parameters, method, callback) {
        parameters = this._defaultParameters.override(parameters);
        let timing = this.instrument(correlationId, 'msg_distribution.send_messages');
        this._controller.sendMessages(correlationId, recipients, message, parameters, method, (err) => {
            timing.endTiming();
            if (callback)
                callback(err);
        });
    }
    sendMessageToRecipient(correlationId, recipientId, subscription, message, parameters, method, callback) {
        parameters = this._defaultParameters.override(parameters);
        let timing = this.instrument(correlationId, 'msg_distribution.send_message_to_recipient');
        this._controller.sendMessageToRecipient(correlationId, recipientId, subscription, message, parameters, method, (err) => {
            timing.endTiming();
            if (callback)
                callback(err);
        });
    }
    sendMessageToRecipients(correlationId, recipientIds, subscription, message, parameters, method, callback) {
        parameters = this._defaultParameters.override(parameters);
        let timing = this.instrument(correlationId, 'msg_distribution.send_message_to_recipients');
        this._controller.sendMessageToRecipients(correlationId, recipientIds, subscription, message, parameters, method, (err) => {
            timing.endTiming();
            if (callback)
                callback(err);
        });
    }
}
exports.MessageDistributionDirectClientV1 = MessageDistributionDirectClientV1;
//# sourceMappingURL=MessageDistributionDirectClientV1.js.map