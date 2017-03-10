/**
 * @file REST API for sample notes
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global */

'use strict';

var 
    commons = require('pip-services-commons'),
    response = commons.response,
    auth = commons.auth;

module.exports = function (app, senecaClients) {
    var notesClient = senecaClients.notes;

    function getNotes(req, res) {
        notesClient.getNotes(
            {
                user: req.user,
                filter: req.query,
                paging: req.query
            },
            response.sendResult(req, res)
        );
    };

    function getNote(req, res) {
        notesClient.getNote(
            req.route.params.noteId,
            {
                user: req.user
            },
            response.sendResult(req, res)
        );
    };

    function createNote(req, res) {
        notesClient.createNote(
            {
                user: req.user,
                note: req.body
            },
            response.sendResult(req, res)
        );
    };

    function updateNote(req, res) {
        notesClient.updateNote(
            req.route.params.noteId,
            {
                user: req.user,
                note: req.body
            },
            response.sendResult(req, res)
        );
    };

    function deleteNote(req, res) {
        notesClient.deleteNote(
            req.route.params.noteId,
            {
                user: req.user
            },
            response.sendOk(req, res)
        );
    };


    app.get('/notes', auth.user, getNotes);
    app.get('/notes/:noteId', auth.user, getNote);
    app.post('/notes', auth.user, createNote);
    app.put('/notes/:noteId', auth.user, updateNote);
    app.delete('/notes/:noteId', auth.user, deleteNote);
};
