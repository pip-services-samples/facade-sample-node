let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { DataPage } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { IRolesClientV1 } from '../../src/version1/IRolesClientV1';

let ROLES = ['Role 1', 'Role 2', 'Role 3'];

export class RolesClientFixtureV1 {
    private _client: IRolesClientV1;
    
    constructor(client: IRolesClientV1) {
        this._client = client;
    }

    public testGetAndSetRoles(done) {
        async.series([
        // Update party roles
            (callback) => {
                this._client.setRoles(
                    null,
                    '1',
                    ROLES,
                    (err, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 3);

                        callback();
                    }
                );
            },
        // Read and check party roles
            (callback) => {
                this._client.getRolesById(
                    null,
                    '1',
                    (err, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 3);

                        callback();
                    }
                );
            },
            (callback) => {
                this._client.getRolesByFilter(
                    null,
                    FilterParams.fromTuples('roles', ROLES),
                    null,
                    (err, page) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                );
            }
        ], done);
    }

    public testGrantAndRevokeRoles(done) {
        async.series([
        // Grant roles first time
            (callback) => {
                this._client.grantRoles(
                    null,
                    '1',
                    ['Role 1'],
                    (err, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 1);
                        assert.sameMembers(roles, ['Role 1']);

                        callback(err);
                    }
                );
            },
        // Grant roles second time
            (callback) => {
                this._client.grantRoles(
                    null,
                    '1',
                    ['Role 1', 'Role 2', 'Role 3'],
                    (err, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 3);
                        assert.sameMembers(roles, ['Role 1', 'Role 2', 'Role 3']);

                        callback(err);
                    }
                );
            },
        // Revoke roles first time
            (callback) => {
                this._client.revokeRoles(
                    null,
                    '1',
                    ['Role 1'],
                    (err, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 2);
                        assert.sameMembers(roles, ['Role 2', 'Role 3']);

                        callback(err);
                    }
                );
            },
        // Get roles
            (callback) => {
                this._client.getRolesById(
                    null,
                    '1',
                    (err, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 2);
                        assert.sameMembers(roles, ['Role 2', 'Role 3']);

                        callback(err);
                    });
            },
        // Revoke roles second time
            (callback) => {
                this._client.revokeRoles(
                    null,
                    '1',
                    ['Role 1', 'Role 2'],
                    (err, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 1);
                        assert.sameMembers(roles, ['Role 3']);

                        callback(err);
                    }
                );
            }
        ], done);
    }

    public testAuthorize(done) {
        async.series([
        // Grant roles
            (callback) => {
                this._client.grantRoles(
                    null,
                    '1',
                    ['Role 1', 'Role 2'],
                    (err, roles) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(roles, 2);

                        callback(err);
                    }
                );
            },
        // Authorize positively
            (callback) => {
                this._client.authorize(
                    null,
                    '1',
                    ['Role 1'],
                    (err, authorized) => {
                        assert.isNull(err);

                        assert.isTrue(authorized);

                        callback(err);
                    }
                );
            },
        // Authorize negatively
            (callback) => {
                this._client.authorize(
                    null,
                    '1',
                    ['Role 2', 'Role 3'],
                    (err, authorized) => {
                        assert.isNull(err);

                        assert.isFalse(authorized);

                        callback(err);
                    }
                );
            }
        ], done);
    }
        
}
