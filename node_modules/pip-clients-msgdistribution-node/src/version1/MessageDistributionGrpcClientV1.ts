let _ = require('lodash');
let services = require('../../../src/protos/msgdistribution_v1_grpc_pb');
let messages = require('../../../src/protos/msgdistribution_v1_pb');

import { ConfigParams } from 'pip-services3-commons-node';
import { GrpcClient } from 'pip-services3-grpc-node';

import { IMessageDistributionClientV1 } from './IMessageDistributionClientV1';
import { MessageV1 } from './MessageV1';
import { RecipientV1 } from './RecipientV1';
import { MessageDistributionGrpcConverterV1 } from './MessageDistributionGrpcConverterV1';

export class MessageDistributionGrpcClientV1 extends GrpcClient implements IMessageDistributionClientV1 {
    private _defaultParameters: ConfigParams;
        
    constructor(config?: any) {
        super(services.MessageDistributionClient);

        let thisConfig = ConfigParams.fromValue(config);
        this._defaultParameters = thisConfig.getSection('parameters');
        if (config != null) this.configure(thisConfig);
    }

    public sendMessage(correlationId: string, recipient: RecipientV1,
        message: MessageV1, parameters: ConfigParams, method: string,
        callback?: (err: any) => void) {
        parameters = this._defaultParameters.override(parameters);

        let request = new messages.SendMessageRequest();
        request.setMessage(MessageDistributionGrpcConverterV1.fromMessage(message));
        MessageDistributionGrpcConverterV1.setMap(request.getParametersMap(), parameters);
        request.setMethod(method);
        request.setRecipient(MessageDistributionGrpcConverterV1.fromRecipient(recipient));

        let timing = this.instrument(correlationId, 'msg_distribution.send_message');

        this.call('send_message',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = MessageDistributionGrpcConverterV1.toError(response.error);

                callback(err);
            }
        );        
    }
    
    public sendMessages(correlationId: string, recipients: RecipientV1[],
        message: MessageV1, parameters: ConfigParams, method: string,
        callback?: (err: any) => void): void {
        parameters = this._defaultParameters.override(parameters);

        let request = new messages.SendMessagesRequest();
        request.setMessage(MessageDistributionGrpcConverterV1.fromMessage(message));
        MessageDistributionGrpcConverterV1.setMap(request.getParametersMap(), parameters);
        request.setMethod(method);
        request.setRecipientsList(MessageDistributionGrpcConverterV1.fromRecipients(recipients));

        let timing = this.instrument(correlationId, 'msg_distribution.send_messages');

        this.call('send_messages',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = MessageDistributionGrpcConverterV1.toError(response.error);

                callback(err);
            }
        );        
    }

    public sendMessageToRecipient(correlationId: string, recipientId: string, subscription: string,
        message: MessageV1, parameters: ConfigParams, method: string,
        callback?: (err: any) => void) {
        parameters = this._defaultParameters.override(parameters);

        let request = new messages.SendMessageWithRecipientRequest();
        request.setMessage(MessageDistributionGrpcConverterV1.fromMessage(message));
        MessageDistributionGrpcConverterV1.setMap(request.getParametersMap(), parameters);
        request.setMethod(method);
        request.setSubscription(subscription);
        request.setRecipientId(recipientId);

        let timing = this.instrument(correlationId, 'msg_distribution.send_message_to_recipient');

        this.call('send_message_to_recipient',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = MessageDistributionGrpcConverterV1.toError(response.error);

                callback(err);
            }
        );        
    }

    public sendMessageToRecipients(correlationId: string, recipientIds: string[], subscription: string,
        message: MessageV1, parameters: ConfigParams, method: string,
        callback?: (err: any) => void): void {
        parameters = this._defaultParameters.override(parameters);

        let request = new messages.SendMessageWithRecipientsRequest();
        request.setMessage(MessageDistributionGrpcConverterV1.fromMessage(message));
        MessageDistributionGrpcConverterV1.setMap(request.getParametersMap(), parameters);
        request.setMethod(method);
        request.setSubscription(subscription);
        request.setRecipientIdsList(recipientIds);

        let timing = this.instrument(correlationId, 'msg_distribution.send_message_to_recipients');

        this.call('send_message_to_recipients',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = MessageDistributionGrpcConverterV1.toError(response.error);

                callback(err);
            }
        );        
    }

}
