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
import { MessageDistributionCommandableGrpcServiceV1 } from 'pip-services-msgdistribution-node';
import { IMessageDistributionClientV1 } from '../../src/version1/IMessageDistributionClientV1';
import { MessageDistributionCommandableGrpcClientV1 } from '../../src/version1/MessageDistributionCommandableGrpcClientV1';
import { MessageDistributionClientFixtureV1 } from './MessageDistributionClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('MessageDistributionCommandableGrpcClientV1', ()=> {
    let service: MessageDistributionCommandableGrpcServiceV1;
    let client: MessageDistributionCommandableGrpcClientV1;
    let fixture: MessageDistributionClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let controller = new MessageDistributionController();

        let emailSettingsClient = new EmailSettingsMemoryClientV1();
        emailSettingsClient.setSettings(null, { id: '1', name: 'User 1', email: 'somebody@somewhere.com' });

        let smsSettingsClient = new SmsSettingsMemoryClientV1();
        smsSettingsClient.setSettings(null, { id: '1', name: 'User 1', phone: '+12345678901' });

        let emailDeliveryClient = new EmailNullClientV1();
        let smsDeliveryClient = new SmsNullClientV1();

        service = new MessageDistributionCommandableGrpcServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-emailsettings', 'client', 'memory', 'default', '1.0'), emailSettingsClient,
            new Descriptor('pip-services-smssettings', 'client', 'memory', 'default', '1.0'), smsSettingsClient,
            new Descriptor('pip-services-email', 'client', 'null', 'default', '1.0'), emailDeliveryClient,
            new Descriptor('pip-services-sms', 'client', 'null', 'default', '1.0'), smsDeliveryClient,
            new Descriptor('pip-services-msgdistribution', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-msgdistribution', 'service', 'commandable-grpc', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new MessageDistributionCommandableGrpcClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new MessageDistributionClientFixtureV1(client);

        service.open(null, (err) => {
            client.open(null, done);
        });
    });
    
    suiteTeardown((done) => {
        client.close(null);
        service.close(null, done);
    });

    test('Send Message to Address', (done) => {
        fixture.testSendMessage(done);
    });

    test('Send Message to Recipients', (done) => {
        fixture.testSendMessageToRecipient(done);
    });

});
