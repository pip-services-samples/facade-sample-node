/**
 * @file REST API for files (attachments)
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global */

'use strict';

var
    _ = require('lodash'),

    commons = require('pip-services-commons'),
    errors = commons.errors,
    response = commons.response,
    auth = commons.auth;

module.exports = function (app, senecaClients) {
    var
        filesClient = senecaClients.files;

    function getFile(req, res) {
        filesClient.getFile(
            req.route.params.partyId,
            {
                user: req.user,
                file_id: req.route.params.fileId
            },
            response.sendResult(req, res)
        );
    };

    function createFile(req, res) {
        var
            partyId = req.route.params.partyId,
            userId = req.user ? req.user.id : null,
            file = {
                name: req.query.name,
                content_type: req.get('content-type'),
                party_id: partyId,
                creator_id: userId
            },
            options = {
                avatar: false,
                allowLarge: req.user.paid || req.user.admin,
                length: req.headers['content-length']
            };

        filesClient.createFile(
            req.route.params.partyId,
            {
                user: req.user,
                file: file,
                url: req.query.url,
                stream: req,
                options: options
            },
            response.sendResult(req, res)
        );
    };

    function getFileContent(req, res) {
        filesClient.getFileContent(
            req.route.params.partyId,
            {
                user: req.user,
                file_id: req.route.params.fileId,
                timestamp: req.param('timestamp'),
                stream: res
            },
            function (err, result) {
                if (err || result == null || !result.found) {
                    err = err || errors.createBadRequest('ERROR_FIL_NOT_FOUND', "File was not found");
                    response.sendInternalError(req, res, err);
                }
            }
        );
    };

    function updateFile(req, res) {
        filesClient.updateFile(
            req.route.params.partyId,
            {
                user: req.user,
                file_id: req.route.params.fileId,
                file: req.body
            },
            response.sendResult(req, res)
        );
    };

    function deleteFile(req, res) {
        filesClient.deleteFile(
            req.route.params.partyId,
            {
                user: req.user,
                file_id: req.route.params.fileId
            },
            response.sendOk(req, res)
        );
    };

    app.post('/files', auth.user, createFile);
    app.get('/files/:fileId', auth.user, getFile);
    app.get('/files/:fileId/content', auth.user, getFileContent);
    app.put('/files/:fileId', auth.user, updateFile);
    app.delete('/files/:fileId', auth.user, deleteFile);
};
