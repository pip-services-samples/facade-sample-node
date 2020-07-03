import { ConfigParams } from 'pip-services3-commons-node';

import { MessageV1 } from './MessageV1';
import { RecipientV1 } from './RecipientV1';

export interface IMessageDistributionClientV1 {
    sendMessage(correlationId: string, recipient: RecipientV1,
        message: MessageV1, parameters: ConfigParams, method: string,
        callback?: (err: any) => void);
    
    sendMessages(correlationId: string, recipients: RecipientV1[],
        message: MessageV1, parameters: ConfigParams, method: string,
        callback?: (err: any) => void): void;

    sendMessageToRecipient(correlationId: string, recipientId: string, subscription: string,
        message: MessageV1, parameters: ConfigParams, method: string,
        callback?: (err: any) => void);
    
    sendMessageToRecipients(correlationId: string, recipientIds: string[], subscription: string,
        message: MessageV1, parameters: ConfigParams, method: string,
        callback?: (err: any) => void): void;
}
