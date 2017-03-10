'use strict';

module.exports = function (seneca, options) {
    var plugin = 'sessions';

    //seneca.use('pip-services-sessions');
    seneca.client(options.depsSeneca['pip-services-sessions']);

    function openUserSession(user, params, callback) {
        seneca.act(
            {
                role: plugin,
                cmd: 'open_user_session',

                user: user,
                address: params.address,
                client: params.client,
                platform: params.platform
            },
            callback
        );
    };

    function closeUserSession(userId, params, callback) {
        seneca.act(
            {
                role: plugin,
                cmd: 'close_user_session',

                user_id: userId,
                address: params.address,
                client: params.client,
                platform: params.platform
            },
            callback
        );
    };

    function loadUserSession(userId, sessionId, callback) {
        seneca.act(
            {
                role: plugin,
                cmd: 'load_user_session',
                user_id: userId,
                session_id: sessionId
            },
            callback
        );
    };

    return {
        openUserSession: openUserSession,
        loadUserSession: loadUserSession,
        closeUserSession: closeUserSession
    };
};
