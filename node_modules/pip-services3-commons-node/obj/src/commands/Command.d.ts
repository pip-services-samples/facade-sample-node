import { ICommand } from './ICommand';
import { Schema } from '../validate/Schema';
import { Parameters } from '../run/Parameters';
import { ValidationResult } from '../validate/ValidationResult';
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
export declare class Command implements ICommand {
    private _name;
    private readonly _schema;
    private readonly _function;
    /**
     * Creates a new command object and assigns it's parameters.
     *
     * @param name      the command name.
     * @param schema    the schema to validate command arguments.
     * @param func      the function to be executed by this command.
     */
    constructor(name: string, schema: Schema, func: any);
    /**
     * Gets the command name.
     * @returns the name of this command.
     */
    getName(): string;
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
    execute(correlationId: string, args: Parameters, callback: (err: any, result: any) => void): void;
    /**
     * Validates the command [[Parameters args]] before execution using the defined schema.
     *
     * @param args  the parameters (arguments) to validate using this command's schema.
     * @returns     an array of ValidationResults or an empty array (if no schema is set).
     *
     * @see [[Parameters]]
     * @see [[ValidationResult]]
     */
    validate(args: Parameters): ValidationResult[];
}
