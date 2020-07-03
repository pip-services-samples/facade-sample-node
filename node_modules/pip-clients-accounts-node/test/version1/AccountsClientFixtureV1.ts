let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { AccountV1 } from '../../src/version1/AccountV1';
import { IAccountsClientV1 } from '../../src/version1/IAccountsClientV1';
import { access } from 'fs';

let ACCOUNT1 = new AccountV1('1', 'Test Account 1', 'user1@conceptual.vision');
let ACCOUNT2 = new AccountV1('2', 'Test Account 2', 'user2@conceptual.vision');

export class AccountsClientFixtureV1 {
    private _client: IAccountsClientV1;
    
    constructor(client: IAccountsClientV1) {
        this._client = client;
    }
        
    testCrudOperations(done) {
        let account1, account2;

        async.series([
        // Create one account
            (callback) => {
                this._client.createAccount(
                    null,
                    ACCOUNT1,
                    (err, account) => {
                        assert.isNull(err);
                        
                        assert.isObject(account);
                        assert.equal(account.name, ACCOUNT1.name);
                        assert.equal(account.login, ACCOUNT1.login);

                        account1 = account;

                        callback();
                    }
                );
            },
        // Create another account
            (callback) => {
                this._client.createAccount(
                    null,
                    ACCOUNT2,
                    (err, account) => {
                        assert.isNull(err);
                        
                        assert.isObject(account);
                        assert.equal(account.name, ACCOUNT2.name);
                        assert.equal(account.login, ACCOUNT2.login);

                        account2 = account;

                        callback();
                    }
                );
            },
        // Get all accounts
            (callback) => {
                this._client.getAccounts(
                    null,
                    null,
                    null,
                    (err, page) => {
                        assert.isNull(err);
                        
                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Get random account
            (callback) => {
                this._client.getAccountByIdOrLogin(
                    null,
                    ACCOUNT1.login,
                    (err, account) => {
                        assert.isNull(err);
                        
                        assert.isObject(account);

                        callback();
                    }
                );
            },
        // Update the account
            (callback) => {
                account1.name = 'Updated Account 1';
                this._client.updateAccount(
                    null,
                    account1,
                    (err, account) => {
                        assert.isNull(err);
                        
                        assert.isObject(account);
                        assert.equal(account.name, 'Updated Account 1');
                        assert.equal(account.login, account1.login);

                        account1 = account;

                        callback();
                    }
                );
            },
        // Delete account
            (callback) => {
                this._client.deleteAccountById(
                    null,
                    account1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get deleted account
            (callback) => {
                this._client.getAccountById(
                    null,
                    account1.id,
                    (err, account) => {
                        assert.isNull(err);
                        
                        assert.isObject(account);
                        assert.isTrue(account.deleted);
                        //assert.isNull(account || null);

                        callback();
                    }
                );
            }
        ], done);
    }
}
