let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { IPasswordsClientV1 } from '../../src/version1/IPasswordsClientV1';

let USER_PWD = {
    id: '1',
    password: 'password123'
};

export class PasswordsClientFixtureV1 {
    private _client: IPasswordsClientV1;
    
    constructor(client: IPasswordsClientV1) {
        this._client = client;
    }

    public testRecoverPassword(done) {
        async.series([
        // Create a new user
            (callback) => {
                this._client.setPassword(
                    null,
                    USER_PWD.id, 
                    USER_PWD.password,
                    (err) => {
                        assert.isNull(err);
                        
                        callback();
                    }
                );
            },
        // Recover password
            (callback) => {
                this._client.recoverPassword(
                    null,
                    USER_PWD.id,
                    (err) => {
                        assert.isNull(err);
                        
                        callback();
                    }
                );
            }
        ], done);
    }

    public testChangePassword(done) {
        async.series([
        // Sign up
            (callback) => {
                this._client.setPassword(
                    null,
                    USER_PWD.id, 
                    USER_PWD.password,
                    (err) => {
                        assert.isNull(err);
                        
                        callback();
                    }
                );
            },
        // Change password
            (callback) => {
                this._client.changePassword(
                    null,
                    USER_PWD.id,
                    USER_PWD.password,
                    'xxx123',
                    (err) => {
                        assert.isNull(err);
                        
                        callback();
                    }
                );
            },
        // Sign in with new password
            (callback) => {
                this._client.authenticate(
                    null,
                    USER_PWD.id,
                    'xxx123',
                    (err, authenticated) => {
                        assert.isNull(err);
                        
                        assert.isTrue(authenticated);

                        callback();
                    }
                );
            },
        // Delete password  
            (callback) => {
                this._client.deletePassword(
                    null,
                    USER_PWD.id,
                    (err) => {
                        assert.isNull(err);
                        
                        callback();
                    }
                )
            }    
        ], done);
    }

    public testSigninWithWrongPassword(done) {
        async.series([
        // Sign up
            (callback) => {
                this._client.setPassword(
                    null,
                    USER_PWD.id, 
                    USER_PWD.password,
                    (err) => {
                        assert.isNull(err);
                        
                        callback();
                    }
                );
            },
        // Sign in with wrong password
            (callback) => {
                this._client.authenticate(
                    null,
                    USER_PWD.id,
                    'xxx',
                    (err, authenticated) => {
                        assert.isNotNull(err);

                        callback();
                    }
                );
            }
        ], done);
    }
        
}
