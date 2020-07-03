"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module config
 *
 * Todo: Rewrite this description
 *
 * @preferred
 * Contains the implementation of the config design pattern. The [[IConfigurable configurable interface]]
 * contains just one method - "configure", which takes ConfigParams as a parameter (extends
 * StringValueMap class). If any object needs to be configurable, we implement this interface
 * and parse the ConfigParams that the method received.
 */
var ConfigParams_1 = require("./ConfigParams");
exports.ConfigParams = ConfigParams_1.ConfigParams;
var NameResolver_1 = require("./NameResolver");
exports.NameResolver = NameResolver_1.NameResolver;
var OptionResolver_1 = require("./OptionResolver");
exports.OptionResolver = OptionResolver_1.OptionResolver;
//# sourceMappingURL=index.js.map