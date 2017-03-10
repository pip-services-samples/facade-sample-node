/**
 * @file Configuration Options for Sample Nodes Client Facade
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global */

'use strict';

var
    SERVER_URL = 'http://localhost:3000',
    CLIENT_URL = 'http://localhost:8000',
    DATABASE_OPTIONS = {
        type: 'mongodb',
        uri: 'mongodb://localhost/pipservicestest',
        options: {
            server: {
                poolSize: 4,
                socketOptions: {
                    keepAlive: 1,
                    connectTimeoutMS: 5000
                },
                auto_reconnect: true
            }
        },
        debug: false
    };


    module.exports = {
        test: {
            database: DATABASE_OPTIONS,
            server: {
                url: SERVER_URL,
                start: false,
                restartEachTest: false
            }
        }
    };
