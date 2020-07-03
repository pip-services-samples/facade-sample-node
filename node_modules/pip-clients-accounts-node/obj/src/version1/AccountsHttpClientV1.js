"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class AccountsHttpClientV1 extends pip_services3_rpc_node_1.CommandableHttpClient {
    constructor(config) {
        super('v1/accounts');
        if (config != null)
            this.configure(pip_services3_commons_node_1.ConfigParams.fromValue(config));
    }
    getAccounts(correlationId, filter, paging, callback) {
        this.callCommand('get_accounts', correlationId, {
            filter: filter,
            paging: paging
        }, callback);
    }
    getAccountById(correlationId, id, callback) {
        this.callCommand('get_account_by_id', correlationId, {
            account_id: id
        }, callback);
    }
    getAccountByLogin(correlationId, login, callback) {
        this.callCommand('get_account_by_login', correlationId, {
            login: login
        }, callback);
    }
    getAccountByIdOrLogin(correlationId, idOrLogin, callback) {
        this.callCommand('get_account_by_id_or_login', correlationId, {
            id_or_login: idOrLogin
        }, callback);
    }
    createAccount(correlationId, account, callback) {
        this.callCommand('create_account', correlationId, {
            account: account
        }, callback);
    }
    updateAccount(correlationId, account, callback) {
        this.callCommand('update_account', correlationId, {
            account: account
        }, callback);
    }
    deleteAccountById(correlationId, id, callback) {
        this.callCommand('delete_account_by_id', correlationId, {
            account_id: id
        }, callback);
    }
}
exports.AccountsHttpClientV1 = AccountsHttpClientV1;
//# sourceMappingURL=AccountsHttpClientV1.js.map