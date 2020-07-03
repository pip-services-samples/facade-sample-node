"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
//import { IPasswordsController } from 'pip-services-passwords-node';
class PasswordsDirectClientV1 extends pip_services3_rpc_node_1.DirectClient {
    constructor(config) {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_node_2.Descriptor("pip-services-passwords", "controller", "*", "*", "*"));
        if (config != null)
            this.configure(pip_services3_commons_node_1.ConfigParams.fromValue(config));
    }
    getPasswordInfo(correlationId, userId, callback) {
        let timing = this.instrument(correlationId, 'passwords.get_password_info');
        this._controller.getPasswordInfo(correlationId, userId, (err, info) => {
            timing.endTiming();
            callback(err, info);
        });
    }
    setTempPassword(correlationId, userId, callback) {
        let timing = this.instrument(correlationId, 'passwords.set_temp_password');
        this._controller.setTempPassword(correlationId, userId, (err, password) => {
            timing.endTiming();
            callback(err, password);
        });
    }
    setPassword(correlationId, userId, password, callback) {
        let timing = this.instrument(correlationId, 'passwords.set_password');
        this._controller.setPassword(correlationId, userId, password, (err) => {
            timing.endTiming();
            callback(err);
        });
    }
    deletePassword(correlationId, userId, callback) {
        let timing = this.instrument(correlationId, 'passwords.delete_password');
        this._controller.deletePassword(correlationId, userId, (err) => {
            timing.endTiming();
            callback(err);
        });
    }
    authenticate(correlationId, userId, password, callback) {
        let timing = this.instrument(correlationId, 'passwords.authenticate');
        this._controller.authenticate(correlationId, userId, password, (err, authenticated) => {
            timing.endTiming();
            callback(err, authenticated);
        });
    }
    changePassword(correlationId, userId, oldPassword, newPassword, callback) {
        let timing = this.instrument(correlationId, 'passwords.change_password');
        this._controller.changePassword(correlationId, userId, oldPassword, newPassword, (err) => {
            timing.endTiming();
            callback(err);
        });
    }
    validateCode(correlationId, userId, code, callback) {
        let timing = this.instrument(correlationId, 'passwords.validate_code');
        this._controller.validateCode(correlationId, userId, code, (err, valid) => {
            timing.endTiming();
            callback(err, valid);
        });
    }
    resetPassword(correlationId, userId, code, password, callback) {
        let timing = this.instrument(correlationId, 'passwords.reset_password');
        this._controller.resetPassword(correlationId, userId, code, password, (err) => {
            timing.endTiming();
            callback(err);
        });
    }
    recoverPassword(correlationId, userId, callback) {
        let timing = this.instrument(correlationId, 'passwords.recover_password');
        this._controller.recoverPassword(correlationId, userId, (err) => {
            timing.endTiming();
            callback(err);
        });
    }
}
exports.PasswordsDirectClientV1 = PasswordsDirectClientV1;
//# sourceMappingURL=PasswordsDirectClientV1.js.map