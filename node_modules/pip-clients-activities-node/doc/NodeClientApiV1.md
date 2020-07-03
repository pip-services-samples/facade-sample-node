# Client API (version 1) <br/> Party Activities Microservices Client SDK for Node.js

Node.js client API for Party activities microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [Installation](#install)
* [Getting started](#get_started)
* [ReferenceV1 class](#class1)
* [PartyActivityV1 class](#class2)
* [IActivitiesClientV1 interface](#interface)
    - [getPartyActivities()](#operation1)
    - [logPartyActivity()](#operation2)
    - [batchPartyActivities()](#operation3)
    - [deletePartyActivities()](#operation4)
* [ActivitiesHttpClientV1 class](#client_rest)
* [ActivitiesSenecaClientV1 class](#client_seneca)
* [ActivitiesDirectClientV1 class](#client_direct)
* [ActivitiesNullClientV1 class](#client_null)

## <a name="install"></a> Installation

To work with the client SDK add dependency into package.json file:

```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-activities-node": "^1.0.*",
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
var sdk = new require('pip-clients-activities-node');

// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};

// Create the client instance
var client = sdk.ActivitiesHttpClientV1(config);

// Open client connection to the microservice
client.open(correlationId, null, function(err) {
    if (err) {
        console.error(err);
        return; 
    }
    
    console.log('Opened connection');
        
    // Log party activity
    client.logPartyActivity(
        null,
        { 
            type: 'signup',
            party: {
                id: '123',
                name: 'Test User'
            }
        },
        function (err, activity) {
            if (err) {
                console.error(err);
                return;
            }
            
            console.log('Logged party activity is');
            console.log(activity);
            
            var now = new Date();
    
            // Get the list system activities
            client.getPartyActivities(
                null,
                {
                    party_id: '123',
                    start: new Date(now.getTime() - 24 * 3600 * 1000),
                    end: now
                },
                {
                    paging: true,
                    skip: 0,
                    take: 10
                }
                function (err, page) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    
                    console.log('Activities performed by party were');
                    console.log(page.data);
                    
                    // Close connection
                    client.close(correlationId, ); 
                }
            );
        }
    );
});
```

### <a name="class1"></a> ReferenceV1 class

Represents a reference to a particular item specified by id, type and name. 

**Properties:**
- id: string - unique item id
- type: string - item type
- name: string - item name

### <a name="class2"></a> PartyActivityV1 class

Represents a record of a party activity performed in the past. 
Each activity record is related to:
- Party who performed the activity
- Object related to the activity. For instance, object that was create or deleted by the party
- Parent of the related objects. If related object is a part of a bigger hierarchy it helps to collect change history across all child objects
- 3rd party related to the activity. For instance, if 3rd party offered or was offered to share work on specific object

**Properties:**
- id: string - unique record id
- time: Date - date and time when activity took place (default: current time)
- type: string - activity type: 'signup', 'signin', 'created', etc.
- party: Reference - reference to the party who performed the activity
- ref_item: Reference - reference to an item related to this activity
- ref_parties: Reference[] - array of the item parent references to enable hierarchical search
- ref_party: Reference - reference to a 3rd party related to this activity
- details: Object - additional details related to this activity, like % of completion or new status

## <a name="interface"></a> IActivitiesClientV1 interface

If you are using Typescript, you can use IActivitiesClientV1 as a common interface across all client implementations. 
If you are using plain Javascript, you shall not worry about IActivitiesClientV1 interface. You can just expect that
all methods defined in this interface are implemented by all client classes.

```javascript
interface IActivitiesClientV1 {
    getPartyActivities(correlationId, filter, paging, callback);
    logPartyActivity(correlationId, activity, callback);
    batchPartyActivities(correlationId, activities, callback);
    deletePartyActivities(correlationId, filter, callback);
}
```

### <a name="operation1"></a> getPartyActivities(correlationId, filter, paging, callback)

Retrieves a list of party activities by specified criteria

**Arguments:** 
- correlationId: string - (optional) unique id that identifies distributed transaction
- filter: object - filter parameters
  - id: string - (optional) unique section id
  - search: string - (optional) search by id substring
  - type: string - (optional) type of activities
  - include_types: string[] - (optional) array of activities types to include into results
  - exclude_types: string[] - (optional) array of activities types to exclude from results
  - party_id: string - (optional) unique id of party who performed the activity
  - ref_id: string - (optional) unique id of related object
  - parent_id: string - (optional) unique if of parent of related object
  - ref_party_id: string - (optional) unique id of 3rd party
  - from_time: Date - (optional) start of the time range
  - to_time: Date - (optional) end of the time range
- paging: object - paging parameters
  - paging: bool - (optional) true to enable paging and return total count
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result
- callback: (err, page) => void - callback function
  - err: Error - occured error or null for success
  - page: PartyActivityPage - retrieved PartyActivity objects in paged format

### <a name="operation2"></a> logPartyActivity(correlationId, activity, callback)

Log a single party activity

**Arguments:** 
- correlationId: string - (optional) unique id that identifies distributed transaction
- activity: PartyActivity - party activity to be logged
- callback: (err, activity) => void - callback function
  - err: Error - occured error or null for success
  - activity: PartyActivity - logged party activity

### <a name="operation3"></a> batchPartyActivities(correlationId, activities, callback)

Log multiple party activities

**Arguments:** 
- correlationId: string - (optional) unique id that identifies distributed transaction
- activities: [PartyActivity] - array of party activities to be logged
- callback: (err) => void - callback function
  - err: Error - occured error or null for success

### <a name="operation4"></a> deletePartyActivities(correlationId, filter, callback)

Deletes party activities that satisfy specified criteria.
This operation is used to clean up the history if party or related objects are removed.

**Params properties:** 
- correlationId: string - (optional) unique id that identifies distributed transaction
- filter: object - filter parameters
  - id: string - (optional) unique section id
  - search: string - (optional) search by id substring
  - type: string - (optional) type of activities
  - include_types: string[] - (optional) array of activities types to include into results
  - exclude_types: string[] - (optional) array of activities types to exclude from results
  - party_id: string - (optional) unique id of party who performed the activity
  - ref_id: string - (optional) unique id of related object
  - parent_id: string - (optional) unique if of parent of related object
  - ref_party_id: string - (optional) unique id of 3rd party
  - from_time: Date - (optional) start of the time range
  - to_time: Date - (optional) end of the time range
- callback: (err) => void - callback function
  - err: Error - occured error or null for success
 
## <a name="client_rest"></a> ActivitiesHttpClientV1 class

ActivitiesHttpClientV1 is a client that implements HTTP protocol

```javascript
class ActivitiesHttpClientV1 extends CommandableHttpClient implements IActivitiesClientV1 {
    constructor(config: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getPartyActivities(filter, paging, callback);
    logPartyActivity(activity, callback);
    batchPartyActivities(activities, callback);
    deletePartyActivities(filter, callback);
}
```

**Constructor config properties:** 
- connection: object - HTTP transport configuration options
  - protocol: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_seneca"></a> ActivitiesSenecaClientV1 class

ActivitiesSenecaClientV1 is a client that implements Seneca protocol

```javascript
class ActivitiesSenecaClientV1 extends CommandableSenecaClient implements IActivitiesClientV1 {
    constructor(config: any);        
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getPartyActivities(correlationId, filter, paging, callback);
    logPartyActivity(correlationId, activity, callback);
    batchPartyActivities(correlationId, activities, callback);
    deletePartyActivities(correlationId, filter, callback);
}
```

**Constructor config properties:** 
- connection: object - (optional) Seneca transport configuration options. See http://senecajs.org/api/ for details.
  - protocol: string - Seneca transport type 
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - Seneca port number

## <a name="client_direct"></a> ActivitiesDirectClientV1 class

ActivitiesDirectClientV1 is a client that calls controller directly from the same container.
It can be used for monolytic deployment scenarios.

```javascript
class ActivitiesDirectClientV1 extends DirectClient implements IActivitiesClientV1 {
    constructor();        
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getPartyActivities(correlationId, filter, paging, callback);
    logPartyActivity(correlationId, activity, callback);
    batchPartyActivities(correlationId, activities, callback);
    deletePartyActivities(correlationId, filter, callback);
}
```

## <a name="client_null"></a> ActivitiesNullClientV1 class

ActivitiesNullClientV1 is a dummy client that mimics the real client but doesn't call a microservice. 
It can be useful in testing scenarios to cut dependencies on external microservices.

```javascript
class ActivitiesNullClientV1 implements IActivitiesClientV1 {
    constructor();
    getPartyActivities(correlationId, filter, paging, callback);
    logPartyActivity(correlationId, activity, callback);
    batchPartyActivities(correlationId, activities, callback);
    deletePartyActivities(correlationId, filter, callback);
}
```
