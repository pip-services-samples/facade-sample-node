"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class PasswordsHttpClientV1 extends pip_services3_rpc_node_1.CommandableHttpClient {
    constructor(config) {
        super('v1/passwords');
        if (config != null)
            this.configure(pip_services3_commons_node_1.ConfigParams.fromValue(config));
    }
    getPasswordInfo(correlationId, userId, callback) {
        this.callCommand('get_password_info', correlationId, {
            user_id: userId
        }, callback);
    }
    setTempPassword(correlationId, userId, callback) {
        this.callCommand('set_temp_password', correlationId, {
            user_id: userId
        }, callback);
    }
    setPassword(correlationId, userId, password, callback) {
        this.callCommand('set_password', correlationId, {
            user_id: userId,
            password: password
        }, callback);
    }
    deletePassword(correlationId, userId, callback) {
        this.callCommand('delete_password', correlationId, {
            user_id: userId
        }, callback);
    }
    authenticate(correlationId, userId, password, callback) {
        this.callCommand('authenticate', correlationId, {
            user_id: userId,
            password: password
        }, (err, result) => {
            let authenticated = result != null ? result.authenticated : false;
            callback(err, authenticated);
        });
    }
    changePassword(correlationId, userId, oldPassword, newPassword, callback) {
        this.callCommand('change_password', correlationId, {
            user_id: userId,
            old_password: oldPassword,
            new_password: newPassword
        }, callback);
    }
    validateCode(correlationId, userId, code, callback) {
        this.callCommand('validate_code', correlationId, {
            user_id: userId,
            code: code
        }, (err, result) => {
            callback(err, result != null ? result.valid : null);
        });
    }
    resetPassword(correlationId, userId, code, password, callback) {
        this.callCommand('reset_password', correlationId, {
            user_id: userId,
            code: code,
            password: password
        }, callback);
    }
    recoverPassword(correlationId, userId, callback) {
        this.callCommand('recover_password', correlationId, {
            user_id: userId
        }, callback);
    }
}
exports.PasswordsHttpClientV1 = PasswordsHttpClientV1;
//# sourceMappingURL=PasswordsHttpClientV1.js.map