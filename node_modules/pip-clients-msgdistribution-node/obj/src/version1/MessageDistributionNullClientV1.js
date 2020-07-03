"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MessageDistributionNullClientV1 {
    sendMessage(correlationId, recipient, message, parameters, method, callback) {
        if (callback)
            callback(null);
    }
    sendMessages(correlationId, recipients, message, parameters, method, callback) {
        if (callback)
            callback(null);
    }
    sendMessageToRecipient(correlationId, recipientId, subscription, message, parameters, method, callback) {
        if (callback)
            callback(null);
    }
    sendMessageToRecipients(correlationId, recipientIds, subscription, message, parameters, method, callback) {
        if (callback)
            callback(null);
    }
}
exports.MessageDistributionNullClientV1 = MessageDistributionNullClientV1;
//# sourceMappingURL=MessageDistributionNullClientV1.js.map