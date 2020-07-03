let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';

import { MessageV1 } from '../../src/version1/MessageV1';
import { MessageResolverV1 } from '../../src/version1/MessageResolverV1';

suite('MessageResolverV1', () => {
    let resolver: MessageResolverV1;

    setup(() => {
        resolver = new MessageResolverV1();
    });

    test('Resolve hardcoded template', () => {
        resolver.configure(ConfigParams.fromTuples(
            'message_templates.template1.subject', 'Subject1',
            'message_templates.template1.text', 'Text1',
            'message_templates.template1.html', 'Html1'
        ));

        let message = resolver.resolve('template1');

        assert.isObject(message);
        assert.equal(message.subject, 'Subject1');
        assert.equal(message.text, 'Text1');
        assert.equal(message.html, 'Html1');
    });

    test('Resolve missing template', () => {
        resolver.configure(ConfigParams.fromTuples(
            'message_templates.template1.subject', 'Subject1',
            'message_templates.template1.text', 'Text1',
            'message_templates.template1.html', 'Html1'
        ));

        let message = resolver.resolve('template2');

        assert.isNull(message);
    });

    test('Resolve template by id', () => {
        resolver.configure(ConfigParams.fromTuples(
            'message_templates.template1', '123'
        ));

        let message = resolver.resolve('template1');
        
        assert.isObject(message);
        assert.equal(message.template, '123');
    });
    
});
