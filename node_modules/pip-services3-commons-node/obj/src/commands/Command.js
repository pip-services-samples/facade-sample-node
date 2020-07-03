"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module commands */
/** @hidden */
var _ = require('lodash');
var InvocationException_1 = require("../errors/InvocationException");
/**
 * Concrete implementation of [[ICommand ICommand]] interface. Command allows to call a method
 * or function using Command pattern.
 *
 * ### Example ###
 *
 *     let command = new Command("add", null, (correlationId, args, callback) => {
 *         let param1 = args.getAsFloat("param1");
 *         let param2 = args.getAsFloat("param2");
 *         let result = param1 + param2;
 *         callback(null, result);
 *     });
 *
 *     command.execute(
 *       "123",
 *       Parameters.fromTuples(
 *         "param1", 2,
 *         "param2", 2
 *       ),
 *       (err, result) => {
 *         if (err) console.error(err);
 *         else console.log("2 + 2 = " + result);
 *       }
 *     );
 *
 *     // Console output: 2 + 2 = 4
 *
 * @see [[ICommand]]
 * @see [[CommandSet]]
 */
var Command = /** @class */ (function () {
    /**
     * Creates a new command object and assigns it's parameters.
     *
     * @param name      the command name.
     * @param schema    the schema to validate command arguments.
     * @param func      the function to be executed by this command.
     */
    function Command(name, schema, func) {
        if (!name)
            throw new Error("Name cannot be null");
        if (!func)
            throw new Error("Function cannot be null");
        this._name = name;
        this._schema = schema;
        if (!_.isFunction(func))
            this._function = func.execute;
        else
            this._function = func;
        if (!_.isFunction(this._function))
            throw new Error("Function doesn't have function type");
    }
    /**
     * Gets the command name.
     * @returns the name of this command.
     */
    Command.prototype.getName = function () {
        return this._name;
    };
    /**
     * Executes the command. Before execution it validates [[Parameters args]] using
     * the defined schema. The command execution intercepts exceptions raised
     * by the called function and returns them as an error in callback.
     *
     * @param correlationId (optional) transaction id to trace execution through call chain.
     * @param args          the parameters (arguments) to pass to this command for execution.
     * @param callback      function to be called when command is complete
     *
     * @see [[Parameters]]
     */
    Command.prototype.execute = function (correlationId, args, callback) {
        if (this._schema) {
            try {
                this._schema.validateAndThrowException(correlationId, args);
            }
            catch (ex) {
                callback(ex, null);
                return;
            }
        }
        try {
            this._function(correlationId, args, callback);
        }
        catch (ex) {
            var err = new InvocationException_1.InvocationException(correlationId, "EXEC_FAILED", "Execution " + this.getName() + " failed: " + ex).withDetails("command", this.getName()).wrap(ex);
            callback(err, null);
        }
    };
    /**
     * Validates the command [[Parameters args]] before execution using the defined schema.
     *
     * @param args  the parameters (arguments) to validate using this command's schema.
     * @returns     an array of ValidationResults or an empty array (if no schema is set).
     *
     * @see [[Parameters]]
     * @see [[ValidationResult]]
     */
    Command.prototype.validate = function (args) {
        if (this._schema)
            return this._schema.validate(args);
        return [];
    };
    return Command;
}());
exports.Command = Command;
//# sourceMappingURL=Command.js.map