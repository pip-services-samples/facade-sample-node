/**
 * @file Routes for user session management
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global */

'use strict';

var 
    _ = require('lodash'),

    commons = require('pip-services-commons'),
    util = commons.util,
    errors = commons.errors,
    detect = commons.detect,
    response = commons.response,
    auth = commons.auth;

module.exports = function (app, senecaClients, options) {
    var 
        sessionCookie = options.main.sessionCookie,
        sessionMaxAge = options.main.sessionMaxAge || 365 * 24 * 60 * 60 * 1000, // 1 year...
        sessionsClient = senecaClients.sessions,
        usersClient = senecaClients.users;


    function setCookie(user, session, res) {
        if (sessionCookie) {
            var content = '' + (session == undefined ? '' : session.id) + ',' + user.id;
            res.cookie(sessionCookie, content, { maxAge: sessionMaxAge });
        }
    };

    function clearCookie(res) {
        if (sessionCookie)
            res.clearCookie(sessionCookie);
    };

    function parseCookie(req) {
        if (sessionCookie) {
            var cookie = req.cookies[sessionCookie];
            var cookieParts = cookie ? cookie.split(',') : [];

            if (cookieParts.length == 2)
                return {
                    session_id: cookieParts[0],
                    user_id: cookieParts[1]
                }
        }

        return {};
    };

    function openSession(user, req, res) {
        sessionsClient.openUserSession(
            user,
            {
                address: detect.detectAddress(req),
                client: detect.detectBrowser(req),
                platform: detect.detectPlatform(req)
            },
            function (err, session) {
                if (err || !session)
                    response.sendError(req, res, err);
                else {
                    // Assign to the user session id so client can retrieve it
                    user.session_id = session.id;
                    setCookie(user, session, res);
                    res.json(user);
                }
            }
        );
    };

    function signup(req, res) {
        usersClient.createUser(
            req.body,
            function (err, user) {
                if (err)
                    response.sendError(req, res, err);
                else
                    openSession(user, req, res);
            }
        );
    };

    function signin(req, res) {
        usersClient.authenticate(
            {
                email: req.param('email'),
                password: req.param('password'),
                address: detect.detectAddress(req),
                client: detect.detectBrowser(req),
                platform: detect.detectPlatform(req)
            },
            function (err, user) {
                if (err)
                    response.sendError(req, res, err);
                else
                    openSession(user, req, res);
            }
        );
    };

    function signout(req, res) {
        clearCookie(res);

        if (req.user) {
            sessionsClient.closeUserSession(
                req.user.id,
                {
                    address: detect.detectAddress(req),
                    client: detect.detectBrowser(req),
                    platform: detect.detectPlatform(req)
                },
                function (err, userSession) {
                    if (err) response.sendError(req, res, err);
                    else res.json('OK');
                }
            );
        } else
            res.json('OK');
    };

    function loadSession(req, res, next) {
        // Is user really cached? If yes, then we shall reinvalidate cache when connections are changed
        if (req.user) {
            next();
            return;
        }

        // parse headers first, and if nothing in headers get cookie
        var sessionId = req.headers['session-id'];
        var userId = req.headers['user-id'];

        // If headers are not set then try to get ids from cookies
        if (sessionId == null || userId == null) {
            var cookie = parseCookie(req);
            sessionId = cookie.session_id;
            userId = cookie.user_id;
        }

        // If user or session ids are not set then skip session loading
        if (sessionId == null || userId == null) {
            next();
            return;
        }

        sessionsClient.loadUserSession(
            userId,
            sessionId,
            function (err, session) {
                if ((err && err.code == 440) || session == null) {
                    response.sendSessionExpired(req, res, 'Session expired');
                    return;
                }

                if (session.user) {
                    req.user = session.user;
                    if (req.user)
                        req.user.session_id = session.id;
                }

                next();
            }
        );
    };

    app.use(loadSession);

    app.post('/signup', auth.anybody, signup);
    app.all('/signin', auth.anybody, signin);
    app.all('/signout', auth.anybody, signout);
};
