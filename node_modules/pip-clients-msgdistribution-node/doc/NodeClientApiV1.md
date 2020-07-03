# Client API (version 1) <br/> Message Distribution Microservices Client SDK for Node.js

Node.js client API for Message distribution microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [Installation](#install)
* [Getting started](#get_started)
* [MessageV1 class](#class1)
* [IMessageDistributionClientV1 interface](#interface)
    - [sendMessageToRecipient()](#operation1)
    - [sendMessageToRecipient()](#operation2)
* [MessageDistributionHttpClientV1 class](#client_http)
* [MessageDistributionSenecaClientV1 class](#client_seneca)
* [MessageDistributionDirectClientV1 class](#client_direct)
* [MessageDistributionNullClientV1 class](#client_null)
* [Message Templates](#templates)

## <a name="install"></a> Installation

To work with the client SDK add dependency into package.json file:

```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-msgdistribution-node": "^1.0.*",
        ...
    }
}
```

Then download the dependency using **npm**:

```javascript
# Installing dependencies
npm install

# Updating dependencies
npm update
```

## <a name="get_started"></a> Getting started

This is a simple example on how to work with the microservice using REST client:

```javascript
// Get Client SDK for Version 1 
var sdk = new require('pip-clients-msgdistribution-node');

// Client configuration
var config = {
    parameters: {
        server_url: 'http://localhost:3000',
        client_url: 'http://localhost:8000',
        client_name: 'PipServices Sample',
        welcome_message: 'Congratulations with your signup in {{ clientName }}!',
        signature: 'Sincerely, {{ clientName }} Team'
    }
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8005
    }
};

// Create the client instance
var client = sdk.MessageDistributionHttpClientV1(config);

// Open client connection to the microservice
client.open(null, function(err) {
    if (err) {
        console.error(err);
        return; 
    }
    
    console.log('Opened connection');
        
    // Send email message to address
    client.sendMessage(
        null,
        '1',
        null,
        { 
            subject: 'Test',
            text: 'This is a test message. Please, ignore it'
        },
        null,
        'all',
        function (err) {
            if (err) console.error(err);
            else console.log('Message was successfully sent');
        }
    );

    // Send email message to address using template
    client.sendMessage(
        null,
        '1',
        null,
        { 
            subject: 'Test message',
            text: 'Today date is {{today}}',
            html: '<p>Today date is {{today}}</p>',
        },
        {
            user_name: 'Somebody',
            today: new Date.toISOString()
        },
        'all',
        function (err) {
            if (err) console.error(err);
            else console.log('Message was successfully sent');
        }
    );
    
});
```

## Data types

### <a name="class1"></a> MessageV1 class

Message object with sender and recipient addresses, subject and content

**Properties:**
    - from: string - (optional) sender address
    - cc: string or [string] - (optional) one or several addresses of CC: recipients
    - bcc: string or [string] - (optional) one or several addresses of BCC: recipients
    - reply_to: string - (optional) response email address
    - subject: any - (optional) message subject
    - text: any - (optional) message plain text body 
    - html: any - (optional) message html body

## <a name="interface"></a> IMessageDistributionClientV1 interface

If you are using Typescript, you can use IMessageDistributionClientV1 as a common interface across all client implementations. 
If you are using plain Javascript, you shall not worry about IMessageDistributionClient interface. You can just expect that
all methods defined in this interface are implemented by all client classes.

```javascript
interface IMessageDistributionClientV1 {
    sendMessageToRecipient(correlationId, recipientId, subscription, message, parameters, method, callback);
    sendMessageToRecipients(correlationId, recipientIds, subscription, message, parameters, method, callback);
}
```

### <a name="operation1"></a> sendMessageToRecipient(correlationId, recipient, subscription, message, parameters, method, callback)

Sends message to specified recipient

**Arguments:**
- correlationId: string - id that uniquely identifies transaction
- recipientId: string - recipient id
- subscription: string - message type to be filtered by subscriptions
- message: MessageV1 - message to be sent
- parameters: Object - (optional) template parameters
- method: string - 'email', 'sms' or 'all'
- callback: (err) => void - callback function
  - err: Error - occured error or null for success

### <a name="operation2"></a> sendMessageToRecipients(correlationId, recipients, subscription, message, parameters, method, callback)

Sends email message to multiple recipients

**Arguments:**
- correlationId: string - id that uniquely identifies transaction
- recipientIds: string[] - array of recipient ids
- subscription: string - message type to be filtered by subscriptions
- message: MessageV1 - message to be sent
- parameters: Object - (optional) template parameters
- method: string - 'email', 'sms' or 'all'
- callback: (err) => void - callback function
  - err: Error - occured error or null for success


## <a name="client_http"></a> MessageDistributionHttpClientV1 class

MessageDistributionHttpClientV1 is a client that implements HTTPprotocol

```javascript
class MessageDistributionHttpClientV1 extends CommandableHttpClient implements IMessageDistributionClientV1 {
    constructor(config?: any);
    setReferences(refs);
    open(correlationId, callback);
    close(correlationId, callback);
    sendMessageToRecipient(correlationId, recipientId, subscription, message, parameters, method, callback);
    sendMessageToRecipients(correlationId, recipientIds, subscription, message, parameters, method, callback);
}
```

**Constructor config properties:** 
- parameters: Object - (optional) default parameters to augment content passed in each request
- connection: object - HTTP transport configuration options
  - protocol: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_seneca"></a> MessageDistributionSenecaClientV1 class

MessageDistributionSenecaClientV1 is a client that implements Seneca protocol

```javascript
class MessageDistributionSenecaClientV1 extends CommandableSenecaClient implements IMessageDistributionClientV1 {
    constructor(config?: any);        
    setReferences(refs);
    open(correlationId, callback);
    close(correlationId, callback);
    sendMessageToRecipient(correlationId, recipientId, subscription, message, parameters, method, callback);
    sendMessageToRecipients(correlationId, recipientIds, subscription, message, parameters, method, callback);
}
```

**Constructor config properties:** 
- parameters: Object - (optional) default parameters to augment content passed in each request
- connection: object - (optional) Seneca transport configuration options. See http://senecajs.org/api/ for details.
  - protocol: string - Seneca transport type 
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - Seneca port number

## <a name="client_direct"></a> MessageDistributionDirectClientV1 class

MessageDistributionDirectClientV1 is a client that calls controller from the same container.
It is intended to be used in monolythic deployments.

```javascript
class MessageDistributionDirectClientV1 extends DirectClient implements IMessageDistributionClientV1 {
    constructor();
    setReferences(refs);
    open(correlationId, callback);
    close(correlationId, callback);
    sendMessageToRecipient(correlationId, recipientId, subscription, message, parameters, method, callback);
    sendMessageToRecipients(correlationId, recipientIds, subscription, message, parameters, method, callback);
}
```

## <a name="client_null"></a> MessageDistributionNullClientV1 class

MessageDistributionNullClientV1 is a dummy client that mimics the real client but doesn't call a microservice. 
It can be useful in testing scenarios to cut dependencies on external microservices.

```javascript
class MessageDistributionNullClientV1 implements IMessageDistributionClientV1 {
    constructor();
    sendMessageToRecipient(correlationId, recipientId, subscription, message, parameters, method, callback);
    sendMessageToRecipients(correlationId, recipientIds, subscription, message, parameters, method, callback);
}
```

## <a name="templates"></a> Message Templates

Templates use handlebars format and can be assigned corresponding message properties.
Inside, it shall use {{ content_prop }} syntax to include properties from **parameters** argument.

Example of the html template
```html
Dear {{ name }},
<p/>
{{ welcome_message }}
<p/>
To continue, please, verify your email address. Your verification code is {{ code }}.
<p/>
Click on the 
<a href="{{ client_url }}/#/verify_email?server_url={{ server_url }}&email={{ email }}&code={{ code }}">link</a>
to complete verification procedure
<p/>
---<br/>
{{ signature }}
```