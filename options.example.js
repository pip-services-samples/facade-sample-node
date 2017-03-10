/**
 * @file Configuration Options for Sample Nodes Client Facade
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global */

'use strict';

var
    DATABASE_OPTIONS = {
        type: 'mongodb',
        uri: 'mongodb://localhost/sample_notes',
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
    },
    SERVER_URL = 'http://localhost:3000',
    CLIENT_URL = 'http://localhost:8000';


module.exports = {

    main: {
        httpPort: '3000',
        httpsPort: '3001',
        requestMaxSize: '1mb',
        sessionCookie: 'piplife'
    },

    logging: {
        level: 'ALL', // ALL, TRACE, DEBUG, INFO, WARN, ERROR, FATAL, OFF
        appenders: [
            {type: 'console'},
            {
                type: 'file',
                filename: __dirname + '/error.log',
                backups: 2,
                maxLogSize: 1000000,
                category: 'error'
            },
            {
                type: 'file',
                filename: __dirname + '/debug.log',
                backups: 2,
                maxLogSize: 10000000,
                category: 'debug'
            }
        ]
    },

    'pip-services-files': {
        storage: 'database',
        database: DATABASE_OPTIONS,
        options: {
            maxFileLength: 5 * 1024 * 1024
        }
    },

    'pip-services-email': {
        database: DATABASE_OPTIONS,
        folderOverride: __dirname + '/templates/',
        mail: {
            from: 'Somebody <somebody@gmail.com>'
        },
        content: {
            serverUrl: SERVER_URL,
            clientUrl: CLIENT_URL,
            clientName: 'Sample Notes',
            welcomeMessage: 'Congratulations with your signup with Sample Notes!',
            signature: 'Sincerely, PipServices Team'
        },
        smtp: {
            enabled: false,
            service: 'Gmail',
            host: 'smtp.gmail.com',
            secureConnection: true,
            port: 465,
            auth: {
                user: 'somebody@gmail.com',
                pass: 'pass123'
            }
        }
    },

    'pip-services-perfmon': {
        database: DATABASE_OPTIONS
    },

    'pip-services-users': {
        database: DATABASE_OPTIONS,
        options: {
            lockEnabled: false, // set to TRUE to enable locking logic
            lockTimeout: 1800000, // 30 mins
            attemptTimeout: 60000, // 1 min
            attemptCount: 4, // 4 times
            sessionTimeout: 24 * 3600000, // 24 hours
            codeExpirationTimeout: 24 * 3600000, // 24 hours
            magicCode: 'magic' // Universal code
        }
    },

    'pip-services-sessions': {
        database: DATABASE_OPTIONS
    },

    test: {
        database: DATABASE_OPTIONS
    }
};
