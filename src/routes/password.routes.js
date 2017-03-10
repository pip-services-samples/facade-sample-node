/**
 * @file Routes for password management
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

    function recoverPassword(req, res) {
        usersClient.recoverPassword(
            {
                email: req.param('email')
            },
            response.sendOk(req, res)
        );
    };

    function resetPassword(req, res) {
        usersClient.resetPassword(
            {
                email: req.param('email'),
                code: req.param('code'),
                password: req.param('password')
            },
            response.sendOk(req, res)
        );
    };

    function changePassword(req, res) {
        usersClient.changePassword(
            {
                email: req.param('email'),
                old_password: req.param('old_password'),
                new_password: req.param('new_password')
            },
            response.sendOk(req, res)
        );
    };

    app.all('/recover_password', auth.anybody, recoverPassword);
    app.all('/reset_password', auth.anybody, resetPassword);
    app.all('/change_password', auth.anybody, changePassword);
};
