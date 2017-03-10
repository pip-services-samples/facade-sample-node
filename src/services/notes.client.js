'use strict';

module.exports = function (seneca, options) {
    var plugin = 'notes';

    //seneca.use('pip-samples-notes');
    seneca.client(options.depsSeneca['pip-services-notes']);

    function getNotes(params, callback) {
        seneca.act(
            {
                role: 'notes',
                cmd: 'get_notes',

                user: params.user,
                filter: params.filter,
                paging: params.paging
            },
            callback
        );
    };

    function getNote(noteId, params, callback) {
        seneca.act(
            {
                role: 'notes',
                cmd: 'get_note_by_id',

                user: params.user,
                note_id: noteId
            },
            callback
        );
    };

    function createNote(params, callback) {
        seneca.act(
            {
                role: 'notes',
                cmd: 'create_note',

                user: params.user,
                note: params.note
            },
            callback
        );
    };

    function updateNote(noteId, params, callback) {
        seneca.act(
            {
                role: 'notes',
                cmd: 'update_note',

                user: params.user,
                note_id: noteId,
                note: params.note
            },
            callback
        );
    };

    function deleteNote(noteId, params, callback) {
        seneca.act(
            {
                role: 'notes',
                cmd: 'delete_note',

                user: params.user,
                note_id: noteId
            },
            callback
        );
    };

    return {
        getNotes: getNotes,
        getNote: getNote,
        createNote: createNote,
        updateNote: updateNote,
        deleteNote: deleteNote
    };
};
