'use strict';

var 
    _ = require('lodash'),
    async = require('async'),

    testFw = require('pip-services-test'),
    assert = testFw.assert,
    dataset = testFw.data.minimal,
    options = require('../options.test'),
    rest = testFw.rest(options);

suite('notes.controller', function () {
    var 
        NOTE1 = {
            category: 'incoming',
            title: 'Title 1',
            content: 'Content 1'
        },
        NOTE2 = {
            category: 'deferred',
            title: 'Title 2',
            content: 'Content 2'
        },
        UPDATED_NOTE1 = {
            title: 'Updated Title 1',
            content: 'Updated Content 1'
        },
        si;

    setup(function (done) {
        testFw.database.init(options, dataset, done);
    });

    test('CRUD operations for notes', function (done) {
        var note1, note2;

        async.series([
        // Create one note
            function (callback) {
                rest.signinAsAdmin(function () {
                    rest.post('/notes',
                        NOTE1,
                        function (err, req, res, note) {
                            assert.result(err, note);

                            assert.equal(note.category, NOTE1.category);
                            assert.equal(note.title, NOTE1.title);
                            assert.equal(note.content, NOTE1.content);

                            note1 = note;

                            callback();
                        }
                    );
                });
            },
        // Create another note
            function (callback) {
                rest.signinAsAdmin(function () {
                    rest.post('/notes',
                        NOTE2,
                        function (err, req, res, note) {
                            assert.result(err, note);

                            assert.equal(note.category, NOTE2.category);
                            assert.equal(note.title, NOTE2.title);
                            assert.equal(note.content, NOTE2.content);

                            note2 = note;

                            callback();
                        }
                    );
                });
            },
        // Get all notes
            function (callback) {
                rest.signinAsAdmin(function () {
                    rest.get('/notes',
                        function (err, req, res, notes) {
                            assert.resultArray(err, notes, 2);

                            callback();
                        }
                    );
                });
            },
        // Update the note
            function (callback) {
                rest.signinAsAdmin(function () {
                    rest.put('/notes/' + note1.id,
                        UPDATED_NOTE1,
                        function (err, req, res, note) {
                            assert.result(err, note);

                            assert.equal(note.title, UPDATED_NOTE1.title);
                            assert.equal(note.content, UPDATED_NOTE1.content);

                            note1 = note;

                            callback();
                        }
                    );
                });
            },
        // Delete note
            function (callback) {
                rest.signinAsAdmin(function () {
                    rest.del('/notes/' + note1.id,
                        function (err, req, res, note) {
                            assert.resultOk(err, note);

                            callback();
                        }
                    );
                });
            },
        // Try to get delete note
            function (callback) {
                rest.signinAsAdmin(function () {
                    rest.get('/notes/' + note1.id,
                        function (err, req, res, note) {
                            assert.isNullOrEmpty(err, note);

                            callback();
                        }
                    );
                });
            }
        ], done);
    });
});