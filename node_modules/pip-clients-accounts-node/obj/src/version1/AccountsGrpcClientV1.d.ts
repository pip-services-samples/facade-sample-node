import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { GrpcClient } from 'pip-services3-grpc-node';
import { IAccountsClientV1 } from './IAccountsClientV1';
import { AccountV1 } from './AccountV1';
export declare class AccountsGrpcClientV1 extends GrpcClient implements IAccountsClientV1 {
    constructor();
    getAccounts(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, result: DataPage<AccountV1>) => void): void;
    getAccountById(correlationId: string, accountId: string, callback: (err: any, result: AccountV1) => void): void;
    getAccountByLogin(correlationId: string, login: string, callback: (err: any, result: AccountV1) => void): void;
    getAccountByIdOrLogin(correlationId: string, idOrLogin: string, callback: (err: any, result: AccountV1) => void): void;
    createAccount(correlationId: string, account: AccountV1, callback: (err: any, result: AccountV1) => void): void;
    updateAccount(correlationId: string, account: AccountV1, callback: (err: any, result: AccountV1) => void): void;
    deleteAccountById(correlationId: string, accountId: string, callback: (err: any, result: AccountV1) => void): void;
}
