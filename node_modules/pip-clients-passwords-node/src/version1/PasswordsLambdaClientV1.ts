import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { CommandableLambdaClient } from 'pip-services3-aws-node';

import { UserPasswordInfoV1 } from './UserPasswordInfoV1';
import { IPasswordsClientV1 } from './IPasswordsClientV1';

export class PasswordsLambdaClientV1 extends CommandableLambdaClient implements IPasswordsClientV1 {

    constructor(config?: any) {
        super('passwords');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }
        
    public getPasswordInfo(correlationId: string, userId: string,
        callback: (err: any, info: UserPasswordInfoV1) => void): void {
        this.callCommand(
            'get_password_info',
            correlationId,
            {
                user_id: userId
            },
            callback
        );    
    }

    public setTempPassword(correlationId: string, userId: string,
        callback: (err: any, password: string) => void): void {
        this.callCommand(
            'set_temp_password',
            correlationId,
            {
                user_id: userId
            },
            callback
        );
    }

    public setPassword(correlationId: string, userId: string, password: string,
        callback: (err: any) => void): void {
        this.callCommand(
            'set_password',
            correlationId,
            {
                user_id: userId,
                password: password
            },
            callback
        );
    }

    public deletePassword(correlationId: string, userId: string,
        callback: (err: any) => void): void {
        this.callCommand(
            'delete_password',
            correlationId,
            {
                user_id: userId
            },
            callback
        );
    }

    public authenticate(correlationId: string, userId: string, password: string,
        callback: (err: any, authenticated: boolean) => void): void {
        this.callCommand(
            'authenticate',
            correlationId,
            {
                user_id: userId,
                password: password
            },
            (err, result) => {
                let authenticated = result != null ? result.authenticated : false;
                callback(err, authenticated);
            }
        );
    }

    public changePassword(correlationId: string, userId: string, oldPassword: string, newPassword: string,
        callback: (err: any) => void): void {
        this.callCommand(
            'change_password',
            correlationId,
            {
                user_id: userId,
                old_password: oldPassword,
                new_password: newPassword
            },
            callback
        );
    }

    public validateCode(correlationId: string, userId: string, code: string,
        callback: (err: any, valid: boolean) => void): void {
        this.callCommand(
            'validate_code',
            correlationId,
            {
                user_id: userId,
                code: code
            },
            (err, result) => {
                callback(err, result != null ? result.valid : null);
            }
        );
    }

    public resetPassword(correlationId: string, userId: string, code: string, password: string,
        callback: (err: any) => void): void {
        this.callCommand(
            'reset_password',
            correlationId,
            {
                user_id: userId,
                code: code,
                password: password
            },
            callback
        );
    }

    public recoverPassword(correlationId: string, userId: string,
        callback: (err: any) => void): void {
        this.callCommand(
            'recover_password',
            correlationId,
            {
                user_id: userId
            },
            callback
        );
    }
    
}
