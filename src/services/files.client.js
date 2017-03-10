'use strict';

module.exports = function (seneca, options) {
    var plugin = 'files';

    //seneca.use('pip-services-files');
    seneca.client(options.depsSeneca['pip-services-files']);

    function getFile(partyId, params, callback) {
        seneca.act(
            {
                role: plugin,
                cmd: 'get_file_by_id',

                party_id: partyId,
                user: params.user,
                file_id: params.file_id
            },
            callback
        );
    };

    function createFile(partyId, params, callback) {
        seneca.act(
            {
                role: plugin,
                cmd: 'create_file',

                party_id: partyId,
                user: params.user,
                file: params.file,
                url: params.url,
                stream: params.stream,
                options: params.options
            },
            callback
        );
    };

    function getFileContent(partyId, params, callback) {
        seneca.act(
            {
                role: plugin,
                cmd: 'stream_file_content',

                party_id: partyId,
                user: params.user,
                file_id: params.file_id,
                timestamp: params.timestamp,
                stream: params.stream
            },
            callback
        );
    };

    function updateFile(partyId, params, callback) {
        seneca.act(
            {
                role: plugin,
                cmd: 'update_file',

                party_id: partyId,
                user: params.user,
                file_id: params.file_id,
                file: params.file
            },
            callback
        );
    };

    function deleteFile(partyId, params, callback) {
        seneca.act(
            {
                role: plugin,
                cmd: 'delete_file',

                party_id: partyId,
                user: params.user,
                file_id: params.file_id
            },
            callback
        );
    };

    return {
        getFile: getFile,
        createFile: createFile,
        getFileContent: getFileContent,
        updateFile: updateFile,
        deleteFile: deleteFile
    };
};
