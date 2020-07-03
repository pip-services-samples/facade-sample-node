let _ = require('lodash');
let services = require('../../../src/protos/passwords_v1_grpc_pb');
let messages = require('../../../src/protos/passwords_v1_pb');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { GrpcClient } from 'pip-services3-grpc-node';

import { IPasswordsClientV1 } from './IPasswordsClientV1';
import { UserPasswordInfoV1 } from './UserPasswordInfoV1';
import { PasswordsGrpcConverterV1 } from './PasswordsGrpcConverterV1';

export class PasswordsGrpcClientV1 extends GrpcClient implements IPasswordsClientV1 {
        
    public constructor() {
        super(services.PasswordsClient);
    }

    public getPasswordInfo(correlationId: string, userId: string,
        callback: (err: any, info: UserPasswordInfoV1) => void): void {

        let request = new messages.PasswordIdRequest();
        request.setUserId(userId);

        let timing = this.instrument(correlationId, 'passwords.get_password_info');

        this.call('get_password_info',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = PasswordsGrpcConverterV1.toError(response.error);

                let result = response 
                    ? PasswordsGrpcConverterV1.toPasswordInfo(response.getInfo())
                    : null;

                callback(err, result);
            }
        );        
    }

    public setTempPassword(correlationId: string, userId: string,
        callback: (err: any, password: string) => void): void {
        let request = new messages.PasswordIdRequest();
        request.setUserId(userId);

        let timing = this.instrument(correlationId, 'passwords.set_temp_password');

        this.call('set_temp_password',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = PasswordsGrpcConverterV1.toError(response.error);

                let password = response 
                    ? response.getPassword()
                    : null;

                callback(err, password);
            }
        );        
    }

    public setPassword(correlationId: string, userId: string, password: string,
        callback: (err: any) => void): void {
        let request = new messages.PasswordIdAndValueRequest();
        request.setUserId(userId);
        request.setPassword(password);

        let timing = this.instrument(correlationId, 'passwords.set_password');

        this.call('set_password',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = PasswordsGrpcConverterV1.toError(response.error);

                callback(err);
            }
        );        
    }

    public deletePassword(correlationId: string, userId: string,
        callback: (err: any) => void): void {

        let request = new messages.PasswordIdRequest();
        request.setUserId(userId);

        let timing = this.instrument(correlationId, 'passwords.delete_password');

        this.call('delete_password',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = PasswordsGrpcConverterV1.toError(response.error);

                callback(err);
            }
        );        
    }

    public authenticate(correlationId: string, userId: string, password: string,
        callback: (err: any, authenticated: boolean) => void): void {
        let request = new messages.PasswordIdAndValueRequest();
        request.setUserId(userId);
        request.setPassword(password);

        let timing = this.instrument(correlationId, 'passwords.authenticate');

        this.call('authenticate',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = PasswordsGrpcConverterV1.toError(response.error);

                let authenticated = response 
                    ? response.getAuthenticated()
                    : null;

                callback(err, authenticated);
            }
        );        
    }

    public changePassword(correlationId: string, userId: string, oldPassword: string, newPassword: string,
        callback: (err: any) => void): void {
        let request = new messages.PasswordIdAndValuesRequest();
        request.setUserId(userId);
        request.setOldPassword(oldPassword);
        request.setNewPassword(newPassword);

        let timing = this.instrument(correlationId, 'passwords.change_password');

        this.call('change_password',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = PasswordsGrpcConverterV1.toError(response.error);

                callback(err);
            }
        );        
    }

    public validateCode(correlationId: string, userId: string, code: string,
        callback: (err: any, valid: boolean) => void): void {
        let request = new messages.PasswordIdAndCodeRequest();
        request.setUserId(userId);
        request.setCode(code);

        let timing = this.instrument(correlationId, 'passwords.validate_code');

        this.call('validate_code',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = PasswordsGrpcConverterV1.toError(response.error);

                let valid = response 
                    ? response.getValid()
                    : null;

                callback(err, valid);
            }
        );        
    }

    public resetPassword(correlationId: string, userId: string, code: string, password: string,
        callback: (err: any) => void): void {
        let request = new messages.PasswordIdAndCodeAndValueRequest();
        request.setUserId(userId);
        request.setCode(code);
        request.setPassword(password);

        let timing = this.instrument(correlationId, 'passwords.reset_password');

        this.call('reset_password',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = PasswordsGrpcConverterV1.toError(response.error);

                callback(err);
            }
        );        
    }

    public recoverPassword(correlationId: string, userId: string,
        callback: (err: any) => void): void {
        let request = new messages.PasswordIdRequest();
        request.setUserId(userId);

        let timing = this.instrument(correlationId, 'passwords.recover_password');

        this.call('recover_password',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = PasswordsGrpcConverterV1.toError(response.error);

                callback(err);
            }
        );        
    }
  
}
