# Client API (version 1) <br/> User Accounts Microservices Client SDK for Node.js

Node.js client API for User accounts microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [Installation](#install)
* [Getting started](#get_started)
* [AccountV1 class](#class1)
* [IAccountsClientV1 interface](#interface)
    - [getAccounts()](#operation1)
    - [getAccountById()](#operation2)
    - [getAccountByLogin()](#operation3)
    - [getAccountByIdOrLogin()](#operation4)
    - [createAccount()](#operation5)
    - [updateAccount()](#operation6)
    - [deleteAccountById()](#operation7)
* [AccountsHttpClientV1 class](#client_http)
* [AccountsSenecaClientV1 class](#client_seneca)
* [AccountsDitectClientV1 class](#client_direct)
* [AccountsMemoryClientV1 class](#client_memory)
* [AccountsNullClientV1 class](#client_null)

## <a name="install"></a> Installation

To work with the client SDK add dependency into package.json file:

```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-accounts-node": "git+ssh://git@github.com:pip-services/pip-clients-accounts-node.git",
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
var sdk = new require('pip-clients-accounts-node');

// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};

// Create the client instance
var client = sdk.AccountsHttpClientV1(config);

// Open client connection to the microservice
client.open(null, function(err) {
    if (err) {
        console.error(err);
        return; 
    }
    
    console.log('Opened connection');
        
    // Register a new account
    client.createAccount(
        null,
        { 
            name: 'Test Account',
            login: 'somebody@somewhere.com',
            password: 'test123'
        },
        function (err, account) {
            if (err) {
                console.error(err);
                return;
            }
            
            console.log('Registered user account is');
            console.log(account);
            
            // Find created account
            client.getAccountByLogin(
                null,
                'somebody@somewhere.com',
                function(err, account) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    
                    console.log('Found account is');
                    console.log(account);
                    
                    // Close connection
                    client.close(); 
                }
            );
        }
    );
});
```

## Data types

### <a name="class1"></a> AccountV1 class

Represents a account account with his ID, name, email, password and key settings.
It also tracks signup/signin dates and authentication attempts. 

**Properties:**
- id: string - unique account id
- name: string - full account name (first and last name)
- login: string - user login or primary email if controller is configured so
- create_time: Date - date and time when account account was created
- active: boolean - true if account account is active, and false for disabled accounts
- time_zone: int - account selected time_zone
- language: string - account selected language (and culture)
- theme: string - account selected application color theme
- custom_hdr: Object - custom data summary that is always returned (in list and details)
- custom_dat: Object - custom data details that is returned only when a single object is returned (details)

## <a name="interface"></a> IAccountsClientV1 interface

If you are using Typescript, you can use IAccountsClientV1 as a common interface across all client implementations. 
If you are using plain Javascript, you shall not worry about IAccountsClientV1 interface. You can just expect that
all methods defined in this interface are implemented by all client classes.

```javascript
interface IAccountsClientV1 {
    getAccounts(correlationId, filter, paging, callback);
    getAccountById(correlationId, id, callback);
    getAccountByLogin(correlationId, login, callback);
    getAccountByIdOrLoging(correlationId, idOrLogin, callback);
    createAccount(correlationId, account, callback);
    updateAccount(correlationId, , account, callback);
    deleteAccountById(correlationId, accountId, callback);
}
```

### <a name="operation1"></a> getAccounts(filter, paging, callback)

Retrieves a page of accounts by specified criteria

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- filter: object - filter parameters
  - search: string - (optional) search substring to find in source, type or message
  - id: string - (optional) account id
  - login: string - (optional) user login
  - name: stromg - (optional) user name
  - from\_create\_time: Date - (optional) start of the time range
  - to\_create\_time: Date - (optional) end of the time range
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0)
  - take: int - (optional) page length (default: 100)
  - total: boolean - (optional) include total counter into paged result (default: false)
- callback: (err, page) => void - callback function
  - err: Error - occured error or null for success
  - page: DataPage<AccountV1> - retrieved Account objects in paged format

### <a name="operation2"></a> getAccountById(correlationId, id, callback)

Gets an account by its unique id

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- id: string - (optional) unique account id
- callback: (err, account) => void - callback function
  - err: Error - occured error or null for success
  - account: AccountV1 - Account account or null if account wasn't found

### <a name="operation3"></a> getAccountByLogin(correlationId, login, callback)

Retrieves account account by user login.

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- login: string - user login
- callback: (err, account) => void - callback function
  - err: Error - occured error or null for success
  - account: AccountV1 - created Account account

### <a name="operation4"></a> getAccountByIdOrLogin(correlationId, idOrLogin, callback)

Retrieves account account by user login.

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- idOrLogin: string - unique account id
- callback: (err, account) => void - callback function
  - err: Error - occured error or null for success
  - account: AccountV1 - created Account account

### <a name="operation5"></a> createAccount(correlationId, account, callback)

Registers a new account in the system and creates an account for him.

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- account: AccountV1 - user account to be created
- callback: (err, account) => void - callback function
  - err: Error - occured error or null for success
  - account: AccountV1 - created Account account
 
### <a name="operation6"></a> updateAccount(correlationId, account, callback)

Changes account name, primary email or account settings.

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- account: AccountV1 - account account with new settings (partial updates are supported)
- callback: (err, account) => void - callback function
  - err: Error - occured error or null for success
  - account: AccountV1 - updated Account account

### <a name="operation7"></a> deleteAccount(correlationId, id, callback)

Deletes account account from the system (use it carefully!)

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- id: string - unique account id
- callback: (err, account) => void - callback function
  - err: Error - occured error or null for success
 
## <a name="client_http"></a> AccountsHttpClientV1 class

AccountsHttpClientV1 is a client that implements HTTP protocol

```javascript
class AccountsHttpClientV1 extends CommandableClientV1 implements IAccountsClientV1 {
    constructor(config?: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getAccounts(correlationId, filter, paging, callback);
    getAccountById(correlationId, id, callback);
    getAccountByLogin(correlationId, login, callback);
    getAccountByIdOrLoging(correlationId, idOrLogin, callback);
    createAccount(correlationId, account, callback);
    updateAccount(correlationId, , account, callback);
    deleteAccountById(correlationId, accountId, callback);
}
```

**Constructor config properties:** 
- connection: object - HTTP transport configuration options
  - protocol: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_seneca"></a> AccountsSenecaClientV1 class

AccountsSenecaClientV1 is a client that implements Seneca protocol

```javascript
class AccountsSenecaClientV1 extends CommandableSenecaClient implements IAccountsClientV1 {
    constructor(config?: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getAccounts(correlationId, filter, paging, callback);
    getAccountById(correlationId, id, callback);
    getAccountByLogin(correlationId, login, callback);
    getAccountByIdOrLoging(correlationId, idOrLogin, callback);
    createAccount(correlationId, account, callback);
    updateAccount(correlationId, , account, callback);
    deleteAccountById(correlationId, accountId, callback);
}
```

**Constructor config properties:** 
- connection: object - (optional) Seneca transport configuration options. See http://senecajs.org/api/ for details.
  - protocol: string - Seneca transport type 
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - Seneca port number

## <a name="client_seneca"></a> AccountsDirectClientV1 class

AccountsDirectClientV1 is a client that calls controller from the same container.
It can be used in monolytic deployments

```javascript
class AccountsDirectClientV1 extends DirectClient implements IAccountsClientV1 {
    constructor(config?: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getAccounts(correlationId, filter, paging, callback);
    getAccountById(correlationId, id, callback);
    getAccountByLogin(correlationId, login, callback);
    getAccountByIdOrLoging(correlationId, idOrLogin, callback);
    createAccount(correlationId, account, callback);
    updateAccount(correlationId, , account, callback);
    deleteAccountById(correlationId, accountId, callback);
}
```

## <a name="client_memory"></a> AccountsMemoryClientV1 class

AccountsMemoryClientV1 is a dummy client that caches accounts locally in memory.
It is intended to be used as a mock in tests.

```javascript
class AccountsMemoryClientV1 extends CommandableSenecaClient implements IAccountsClientV1 {
    constructor(config?: any);
    getAccounts(correlationId, filter, paging, callback);
    getAccountById(correlationId, id, callback);
    getAccountByLogin(correlationId, login, callback);
    getAccountByIdOrLoging(correlationId, idOrLogin, callback);
    createAccount(correlationId, account, callback);
    updateAccount(correlationId, , account, callback);
    deleteAccountById(correlationId, accountId, callback);
}
```

## <a name="client_null"></a> AccountsNullClientV1 class

AccountsNullClientV1 is a dummy client that doesn't do anything.
It is intended to be used as a dummy mock in tests.

```javascript
class AccountsNullClientV1 implements IAccountsClientV1 {
    constructor(config?: any);
    getAccounts(correlationId, filter, paging, callback);
    getAccountById(correlationId, id, callback);
    getAccountByLogin(correlationId, login, callback);
    getAccountByIdOrLoging(correlationId, idOrLogin, callback);
    createAccount(correlationId, account, callback);
    updateAccount(correlationId, , account, callback);
    deleteAccountById(correlationId, accountId, callback);
}
```

