/**
 * @file Sample notes application launcher
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global */

'use strict';

var 
    _ = require('lodash'),
    log = require('pip-services-logging');

//********** Preparing options ************

// Load global options
var options = require('./options.js') || {};

options = _.defaults(options,
    {
        main: {
            httpPort: 3000,
            requestMaxSize: '1mb',
            sessionCookie: 'notes sample',
            connectTimeout: 60000,
            debug: true
        },
        logging: {
            level: 'ALL',
            appenders: [
                { type: 'console' }
            ]
        },
        debug: {
            undead: true,
            dumpExceptions: true, 
            showStack: true
        }
    }
);

// Init logging
log.init(options.logging);
delete options.logging;

//*************** Handling process signals **************

// Log uncaught exceptions
process.on('uncaughtException', function (err) {
    log.fatal(err);
    log.shutdown(function () {
        process.exit(1);
    });
});

// Gracefully shutdown
process.on('exit', function (code) {
    log.warn('HTTP server stopped with code ' + code);
    log.shutdown(function () {
        process.exit(1);
    });
});


//**************** Configure Express *******************

var
    express = require('express'),
    connectTimeout = require('connect-timeout'),
    cors = require('cors'),
    app = express();

// Configures express application
app.configure(function () {
    app.use(connectTimeout(options.main.connectTimeout));
    app.use(log.connect());
    app.use(express.cookieParser());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(cors());
    app.use(express.errorHandler(options.debug));    
});


//************ Load Seneca Plugins ***************

var
    seneca = require('seneca')(options),
    senecaClients = {};

// Load seneca plugins

//seneca.use('pip-services-email');
//seneca.client(options.depsSeneca['pip-services-email']);

senecaClients.sessions = require('./src/services/sessions.client')(seneca, options);
senecaClients.users = require('./src/services/users.client')(seneca, options);
senecaClients.files = require('./src/services/files.client')(seneca, options);
senecaClients.notes = require('./src/services/notes.client')(seneca, options);

seneca.listen(options.main.senecaListener);

//************ Load REST API **************

// Instantiate routes
require('./src/routes/session.routes')(app, senecaClients, options);
require('./src/routes/about.routes')(app, senecaClients);
require('./src/routes/users.routes')(app, senecaClients);
require('./src/routes/password.routes')(app, senecaClients);
require('./src/routes/files.routes')(app, senecaClients);
require('./src/routes/notes.routes')(app, senecaClients);


//************ Starting Server *************

var
    http = require('http'),        
    httpPort = options.main.httpPort,
    httpServer = http.createServer(app);

httpServer.listen(httpPort, function (err) {
    if (err) {
        log.error('Failed start HTTP server on port ' + httpPort);
        log.error(err);
        log.shutdown(function () {
            process.exit(1);
        });
        return;
    }

    log.debug('Express HTTP server listening on port ' + httpPort);
});
