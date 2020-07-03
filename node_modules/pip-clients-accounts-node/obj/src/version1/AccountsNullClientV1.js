"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
class AccountsNullClientV1 {
    getAccounts(correlationId, filter, paging, callback) {
        callback(null, new pip_services3_commons_node_1.DataPage([], 0));
    }
    getAccountById(correlationId, id, callback) {
        callback(null, null);
    }
    getAccountByLogin(correlationId, login, callback) {
        callback(null, null);
    }
    getAccountByIdOrLogin(correlationId, idOrLogin, callback) {
        callback(null, null);
    }
    createAccount(correlationId, account, callback) {
        callback(null, account);
    }
    updateAccount(correlationId, account, callback) {
        callback(null, account);
    }
    deleteAccountById(correlationId, id, callback) {
        callback(null, null);
    }
}
exports.AccountsNullClientV1 = AccountsNullClientV1;
//# sourceMappingURL=AccountsNullClientV1.js.map