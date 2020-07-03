import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams} from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { DirectClient } from 'pip-services3-rpc-node';

import { UserPasswordInfoV1 } from './UserPasswordInfoV1';
import { IPasswordsClientV1 } from './IPasswordsClientV1';
//import { IPasswordsController } from 'pip-services-passwords-node';

export class PasswordsDirectClientV1 extends DirectClient<any> implements IPasswordsClientV1 {
            
    public constructor(config?: any) {
        super();
        this._dependencyResolver.put('controller', new Descriptor("pip-services-passwords", "controller", "*", "*", "*"))

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    public getPasswordInfo(correlationId: string, userId: string,
        callback: (err: any, info: UserPasswordInfoV1) => void): void {
        let timing = this.instrument(correlationId, 'passwords.get_password_info');
        this._controller.getPasswordInfo(correlationId, userId, (err, info) => {
            timing.endTiming();
            callback(err, info);
        });
    }

    public setTempPassword(correlationId: string, userId: string,
        callback: (err: any, password: string) => void): void {
        let timing = this.instrument(correlationId, 'passwords.set_temp_password');
        this._controller.setTempPassword(correlationId, userId, (err, password) => {
            timing.endTiming();
            callback(err, password);
        });
    }

    public setPassword(correlationId: string, userId: string, password: string,
        callback: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'passwords.set_password');
        this._controller.setPassword(correlationId, userId, password, (err) => {
            timing.endTiming();
            callback(err);
        });
    }

    public deletePassword(correlationId: string, userId: string,
        callback: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'passwords.delete_password');
        this._controller.deletePassword(correlationId, userId, (err) => {
            timing.endTiming();
            callback(err);
        });
    }

    public authenticate(correlationId: string, userId: string, password: string,
        callback: (err: any, authenticated: boolean) => void): void {
        let timing = this.instrument(correlationId, 'passwords.authenticate');
        this._controller.authenticate(correlationId, userId, password, (err, authenticated) => {
            timing.endTiming();
            callback(err, authenticated);
        });
    }

    public changePassword(correlationId: string, userId: string, oldPassword: string, newPassword: string,
        callback: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'passwords.change_password');
        this._controller.changePassword(correlationId, userId, oldPassword, newPassword, (err) => {
            timing.endTiming();
            callback(err);
        });
    }

    public validateCode(correlationId: string, userId: string, code: string,
        callback: (err: any, valid: boolean) => void): void {
        let timing = this.instrument(correlationId, 'passwords.validate_code');
        this._controller.validateCode(correlationId, userId, code, (err, valid) => {
            timing.endTiming();
            callback(err, valid);
        });
    }

    public resetPassword(correlationId: string, userId: string, code: string, password: string,
        callback: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'passwords.reset_password');
        this._controller.resetPassword(correlationId, userId, code, password, (err) => {
            timing.endTiming();
            callback(err);
        });
    }

    public recoverPassword(correlationId: string, userId: string,
        callback: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'passwords.recover_password');
        this._controller.recoverPassword(correlationId, userId, (err) => {
            timing.endTiming();
            callback(err);
        });
    }
}