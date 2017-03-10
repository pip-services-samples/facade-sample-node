/**
 * @file Routes for user management
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global */

'use strict';

var 
    _ = require('lodash'),

    commons = require('pip-services-commons'),
    response = commons.response,
    auth = commons.auth;

module.exports = function (app, senecaClients) {
    var usersClient = senecaClients.users;

    function getCurrentUser(req, res) {
        if (req.user) {
            usersClient.getUser(
                req.user.id,
                response.sendResult(req, res)
            );
        } else {
            res.json(null);
        }
    };

    function updateCurrentUser(req, res) {
        var user = req.body;

        if (req.user) {
            usersClient.updateUser(
                req.user.id,
                user,
                response.sendResult(req, res)
            );
        } else {
            res.json(null);
        }
    };

    app.get('/user', auth.user, getCurrentUser);
    app.put('/user', auth.user, updateCurrentUser);
};
