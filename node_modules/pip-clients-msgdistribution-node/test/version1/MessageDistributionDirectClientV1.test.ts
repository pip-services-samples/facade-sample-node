let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { EmailSettingsMemoryClientV1 } from 'pip-clients-emailsettings-node';
import { SmsSettingsMemoryClientV1 } from 'pip-clients-smssettings-node';
import { EmailNullClientV1 } from 'pip-clients-email-node';
import { SmsNullClientV1 } from 'pip-clients-sms-node';

import { MessageDistributionController } from 'pip-services-msgdistribution-node';
import { IMessageDistributionClientV1 } from '../../src/version1/IMessageDistributionClientV1';
import { MessageDistributionDirectClientV1 } from '../../src/version1/MessageDistributionDirectClientV1';
import { MessageDistributionClientFixtureV1 } from './MessageDistributionClientFixtureV1';

suite('MessageDistributionDirectClientV1', ()=> {
    let client: MessageDistributionDirectClientV1;
    let fixture: MessageDistributionClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let controller = new MessageDistributionController();
        controller.configure(new ConfigParams());

        let emailSettingsClient = new EmailSettingsMemoryClientV1();
        emailSettingsClient.setSettings(null, { id: '1', name: 'User 1', email: 'somebody@somewhere.com' });

        let smsSettingsClient = new SmsSettingsMemoryClientV1();
        smsSettingsClient.setSettings(null, { id: '1', name: 'User 1', phone: '+12345678901' });

        let emailDeliveryClient = new EmailNullClientV1();
        let smsDeliveryClient = new SmsNullClientV1();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-emailsettings', 'client', 'memory', 'default', '1.0'), emailSettingsClient,
            new Descriptor('pip-services-smssettings', 'client', 'memory', 'default', '1.0'), smsSettingsClient,
            new Descriptor('pip-services-email', 'client', 'null', 'default', '1.0'), emailDeliveryClient,
            new Descriptor('pip-services-sms', 'client', 'null', 'default', '1.0'), smsDeliveryClient,
            new Descriptor('pip-services-msgdistribution', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        client = new MessageDistributionDirectClientV1();
        client.setReferences(references);

        fixture = new MessageDistributionClientFixtureV1(client);

        client.open(null, done);
    });
    
    suiteTeardown((done) => {
        client.close(null, done);
    });

    test('Send Message', (done) => {
        fixture.testSendMessage(done);
    });

    test('Send Message to Recipient', (done) => {
        fixture.testSendMessageToRecipient(done);
    });
    
});
