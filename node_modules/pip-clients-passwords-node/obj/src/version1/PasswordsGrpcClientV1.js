"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let services = require('../../../src/protos/passwords_v1_grpc_pb');
let messages = require('../../../src/protos/passwords_v1_pb');
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
const PasswordsGrpcConverterV1_1 = require("./PasswordsGrpcConverterV1");
class PasswordsGrpcClientV1 extends pip_services3_grpc_node_1.GrpcClient {
    constructor() {
        super(services.PasswordsClient);
    }
    getPasswordInfo(correlationId, userId, callback) {
        let request = new messages.PasswordIdRequest();
        request.setUserId(userId);
        let timing = this.instrument(correlationId, 'passwords.get_password_info');
        this.call('get_password_info', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = PasswordsGrpcConverterV1_1.PasswordsGrpcConverterV1.toError(response.error);
            let result = response
                ? PasswordsGrpcConverterV1_1.PasswordsGrpcConverterV1.toPasswordInfo(response.getInfo())
                : null;
            callback(err, result);
        });
    }
    setTempPassword(correlationId, userId, callback) {
        let request = new messages.PasswordIdRequest();
        request.setUserId(userId);
        let timing = this.instrument(correlationId, 'passwords.set_temp_password');
        this.call('set_temp_password', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = PasswordsGrpcConverterV1_1.PasswordsGrpcConverterV1.toError(response.error);
            let password = response
                ? response.getPassword()
                : null;
            callback(err, password);
        });
    }
    setPassword(correlationId, userId, password, callback) {
        let request = new messages.PasswordIdAndValueRequest();
        request.setUserId(userId);
        request.setPassword(password);
        let timing = this.instrument(correlationId, 'passwords.set_password');
        this.call('set_password', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = PasswordsGrpcConverterV1_1.PasswordsGrpcConverterV1.toError(response.error);
            callback(err);
        });
    }
    deletePassword(correlationId, userId, callback) {
        let request = new messages.PasswordIdRequest();
        request.setUserId(userId);
        let timing = this.instrument(correlationId, 'passwords.delete_password');
        this.call('delete_password', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = PasswordsGrpcConverterV1_1.PasswordsGrpcConverterV1.toError(response.error);
            callback(err);
        });
    }
    authenticate(correlationId, userId, password, callback) {
        let request = new messages.PasswordIdAndValueRequest();
        request.setUserId(userId);
        request.setPassword(password);
        let timing = this.instrument(correlationId, 'passwords.authenticate');
        this.call('authenticate', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = PasswordsGrpcConverterV1_1.PasswordsGrpcConverterV1.toError(response.error);
            let authenticated = response
                ? response.getAuthenticated()
                : null;
            callback(err, authenticated);
        });
    }
    changePassword(correlationId, userId, oldPassword, newPassword, callback) {
        let request = new messages.PasswordIdAndValuesRequest();
        request.setUserId(userId);
        request.setOldPassword(oldPassword);
        request.setNewPassword(newPassword);
        let timing = this.instrument(correlationId, 'passwords.change_password');
        this.call('change_password', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = PasswordsGrpcConverterV1_1.PasswordsGrpcConverterV1.toError(response.error);
            callback(err);
        });
    }
    validateCode(correlationId, userId, code, callback) {
        let request = new messages.PasswordIdAndCodeRequest();
        request.setUserId(userId);
        request.setCode(code);
        let timing = this.instrument(correlationId, 'passwords.validate_code');
        this.call('validate_code', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = PasswordsGrpcConverterV1_1.PasswordsGrpcConverterV1.toError(response.error);
            let valid = response
                ? response.getValid()
                : null;
            callback(err, valid);
        });
    }
    resetPassword(correlationId, userId, code, password, callback) {
        let request = new messages.PasswordIdAndCodeAndValueRequest();
        request.setUserId(userId);
        request.setCode(code);
        request.setPassword(password);
        let timing = this.instrument(correlationId, 'passwords.reset_password');
        this.call('reset_password', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = PasswordsGrpcConverterV1_1.PasswordsGrpcConverterV1.toError(response.error);
            callback(err);
        });
    }
    recoverPassword(correlationId, userId, callback) {
        let request = new messages.PasswordIdRequest();
        request.setUserId(userId);
        let timing = this.instrument(correlationId, 'passwords.recover_password');
        this.call('recover_password', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = PasswordsGrpcConverterV1_1.PasswordsGrpcConverterV1.toError(response.error);
            callback(err);
        });
    }
}
exports.PasswordsGrpcClientV1 = PasswordsGrpcClientV1;
//# sourceMappingURL=PasswordsGrpcClientV1.js.map