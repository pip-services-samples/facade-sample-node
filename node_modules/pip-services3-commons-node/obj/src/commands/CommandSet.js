"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InterceptedCommand_1 = require("./InterceptedCommand");
var BadRequestException_1 = require("../errors/BadRequestException");
var ValidationException_1 = require("../validate/ValidationException");
var ValidationResult_1 = require("../validate/ValidationResult");
var ValidationResultType_1 = require("../validate/ValidationResultType");
var IdGenerator_1 = require("../data/IdGenerator");
/**
 * Contains a set of commands and events supported by a [[ICommandable commandable]] object.
 * The CommandSet supports command interceptors to extend and the command call chain.
 *
 * CommandSets can be used as alternative commandable interface to a business object.
 * It can be used to auto generate multiple external services for the business object
 * without writing much code.
 *
 * @see [[Command]]
 * @see [[Event]]
 * @see [[ICommandable]]
 *
 * ### Example ###
 *
 *     export class MyDataCommandSet extends CommandSet {
 *         private _controller: IMyDataController;
 *
 *         constructor(controller: IMyDataController) { // Any data controller interface
 *             super();
 *             this._controller = controller;
 *             this.addCommand(this.makeGetMyDataCommand());
 *         }
 *
 *         private makeGetMyDataCommand(): ICommand {
 *             return new Command(
 *               'get_mydata',
 *               null,
 *               (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
 *                   let param = args.getAsString('param');
 *                   this._controller.getMyData(correlationId, param, callback);
 *               }
 *             );
 *         }
 *     }
 */
var CommandSet = /** @class */ (function () {
    /**
     * Creates an empty CommandSet object.
     */
    function CommandSet() {
        this._commands = [];
        this._events = [];
        this._interceptors = [];
        this._commandsByName = {};
        this._eventsByName = {};
    }
    /**
     * Gets all commands registered in this command set.
     *
     * @returns a list of commands.
     *
     * @see [[ICommand]]
     */
    CommandSet.prototype.getCommands = function () {
        return this._commands;
    };
    /**
     * Gets all events registred in this command set.
     *
     * @returns a list of events.
     *
     * @see [[IEvent]]
     */
    CommandSet.prototype.getEvents = function () {
        return this._events;
    };
    /**
     * Searches for a command by its name.
     *
     * @param commandName the name of the command to search for.
     * @returns the command, whose name matches the provided name.
     *
     * @see [[ICommand]]
     */
    CommandSet.prototype.findCommand = function (commandName) {
        return this._commandsByName[commandName];
    };
    /**
     * Searches for an event by its name in this command set.
     *
     * @param eventName the name of the event to search for.
     * @returns the event, whose name matches the provided name.
     *
     * @see [[IEvent]]
     */
    CommandSet.prototype.findEvent = function (eventName) {
        return this._eventsByName[eventName];
    };
    CommandSet.prototype.buildCommandChain = function (command) {
        var next = command;
        for (var i = this._interceptors.length - 1; i >= 0; i--)
            next = new InterceptedCommand_1.InterceptedCommand(this._interceptors[i], next);
        this._commandsByName[next.getName()] = next;
    };
    CommandSet.prototype.rebuildAllCommandChains = function () {
        this._commandsByName = {};
        for (var i = 0; i < this._commands.length; i++) {
            var command = this._commands[i];
            this.buildCommandChain(command);
        }
    };
    /**
     * Adds a [[ICommand command]] to this command set.
     *
     * @param command   the command to add.
     *
     * @see [[ICommand]]
     */
    CommandSet.prototype.addCommand = function (command) {
        this._commands.push(command);
        this.buildCommandChain(command);
    };
    /**
     * Adds multiple [[ICommand commands]] to this command set.
     *
     * @param commands the array of commands to add.
     *
     * @see [[ICommand]]
     */
    CommandSet.prototype.addCommands = function (commands) {
        for (var i = 0; i < commands.length; i++)
            this.addCommand(commands[i]);
    };
    /**
     * Adds an [[IEvent event]] to this command set.
     *
     * @param event the event to add.
     * @see [[IEvent]]
     */
    CommandSet.prototype.addEvent = function (event) {
        this._events.push(event);
        this._eventsByName[event.getName()] = event;
    };
    /**
     * Adds multiple [[IEvent events]] to this command set.
     *
     * @param events the array of events to add.
     *
     * @see [[IEvent]]
     */
    CommandSet.prototype.addEvents = function (events) {
        for (var i = 0; i < events.length; i++)
            this.addEvent(events[i]);
    };
    /**
     * Adds all of the commands and events from specified [[CommandSet command set]]
     * into this one.
     *
     * @param commandSet the CommandSet to add.
     */
    CommandSet.prototype.addCommandSet = function (commandSet) {
        this.addCommands(commandSet.getCommands());
        this.addEvents(commandSet.getEvents());
    };
    /**
     * Adds a [[IEventListener listener]] to receive notifications on fired events.
     *
     * @param listener  the listener to add.
     *
     * @see [[IEventListener]]
     */
    CommandSet.prototype.addListener = function (listener) {
        for (var i = 0; i < this._events.length; i++)
            this._events[i].addListener(listener);
    };
    /**
     * Removes previosly added [[IEventListener listener]].
     *
     * @param listener  the listener to remove.
     *
     * @see [[IEventListener]]
     */
    CommandSet.prototype.removeListener = function (listener) {
        for (var i = 0; i < this._events.length; i++)
            this._events[i].removeListener(listener);
    };
    /**
     * Adds a [[ICommandInterceptor command interceptor]] to this command set.
     *
     * @param interceptor     the interceptor to add.
     *
     * @see [[ICommandInterceptor]]
     */
    CommandSet.prototype.addInterceptor = function (interceptor) {
        this._interceptors.push(interceptor);
        this.rebuildAllCommandChains();
    };
    /**
     * Executes a [[ICommand command]] specificed by its name.
     *
     * @param correlationId (optional) transaction id to trace execution through call chain.
     * @param commandName   the name of that command that is to be executed.
     * @param args          the parameters (arguments) to pass to the command for execution.
     * @param callback      the function that is to be called once execution is complete. If an exception is raised, then
     *                      it will be called with the error (for example: a ValidationException can be thrown).
     *
     * @see [[ICommand]]
     * @see [[Parameters]]
     */
    CommandSet.prototype.execute = function (correlationId, commandName, args, callback) {
        var cref = this.findCommand(commandName);
        if (!cref) {
            var err = new BadRequestException_1.BadRequestException(correlationId, "CMD_NOT_FOUND", "Request command does not exist")
                .withDetails("command", commandName);
            callback(err, null);
        }
        if (!correlationId)
            correlationId = IdGenerator_1.IdGenerator.nextShort();
        var results = cref.validate(args);
        try {
            ValidationException_1.ValidationException.throwExceptionIfNeeded(correlationId, results, false);
            cref.execute(correlationId, args, callback);
        }
        catch (ex) {
            callback(ex, null);
        }
    };
    /**
     * Validates [[Parameters args]] for command specified by its name using defined schema.
     * If validation schema is not defined than the methods returns no errors.
     * It returns validation error if the command is not found.
     *
     * @param commandName   the name of the command for which the 'args' must be validated.
     * @param args          the parameters (arguments) to validate.
     * @returns             an array of ValidationResults. If no command is found by the given
     *                      name, then the returned array of ValidationResults will contain a
     *                      single entry, whose type will be ValidationResultType.Error.
     *
     * @see [[Command]]
     * @see [[Parameters]]
     * @see [[ValidationResult]]
     */
    CommandSet.prototype.validate = function (commandName, args) {
        var cref = this.findCommand(commandName);
        if (!cref) {
            var result = [];
            result.push(new ValidationResult_1.ValidationResult(null, ValidationResultType_1.ValidationResultType.Error, "CMD_NOT_FOUND", "Requested command does not exist", null, null));
            return result;
        }
        return cref.validate(args);
    };
    /**
     * Fires event specified by its name and notifies all registered
     * [[IEventListener listeners]]
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param eventName         the name of the event that is to be fired.
     * @param args              the event arguments (parameters).
     */
    CommandSet.prototype.notify = function (correlationId, eventName, args) {
        var event = this.findEvent(eventName);
        if (event)
            event.notify(correlationId, args);
    };
    return CommandSet;
}());
exports.CommandSet = CommandSet;
//# sourceMappingURL=CommandSet.js.map