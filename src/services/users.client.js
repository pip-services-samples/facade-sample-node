'use strict';

module.exports = function (seneca, options) {
    var plugin = 'users';

    //seneca.use('pip-services-users');
    seneca.client(options.depsSeneca['pip-services-users']);

    function getUser(userId, callback) {
        seneca.act(
            {
                role: plugin,
                cmd: 'get_user_by_id',

                user_id: userId
            },
            callback
        );
    };

    function createUser(user, callback) {
        seneca.act(
            {
                role: plugin,
                cmd: 'create_user',

                user: user
            },
            callback
        );
    };

    function updateUser(userId, user, callback) {
        seneca.act(
            {
                role: plugin,
                cmd: 'update_user',

                user_id: userId,
                user: user
            },
            callback
        );
    };

    function authenticate(param, callback) {
        seneca.act(
            {
                role: plugin,
                cmd: 'authenticate',

                email: param.email,
                password: param.password,
                address: param.address,
                client: param.client,
                platform: param.platform
            },
            callback
        );        
    };

    function recoverPassword(params, callback) {
        seneca.act(
            {
                role: plugin,
                cmd: 'recover_password',

                email: params.email
            },
            callback
        );
    };

    function resetPassword(params, callback) {
        seneca.act(
            {
                role: plugin,
                cmd: 'reset_password',

                email: params.email,
                code: params.code,
                password: params.password
            },
            callback
        );
    };

    function changePassword(params, callback) {
        seneca.act(
            {
                role: plugin,
                cmd: 'change_password',

                email: params.email,
                old_password: params.old_password,
                new_password: params.new_password
            },
            callback
        );
    };

    return {
        getUser: getUser,
        createUser: createUser,
        updateUser: updateUser,
        authenticate: authenticate,
        recoverPassword: recoverPassword,
        resetPassword: resetPassword,
        changePassword: changePassword
    };
};
