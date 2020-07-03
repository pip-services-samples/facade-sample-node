let _ = require('lodash');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReconfigurable } from 'pip-services3-commons-node';
import { StringConverter } from 'pip-services3-commons-node';

import { MessageV1 } from './MessageV1';

export class MessageResolverV1 implements IReconfigurable {
    private _config: ConfigParams = new ConfigParams();
    private _messages: { [name: string]: MessageV1 } = {};
	
	public constructor(config?: ConfigParams) {
		if (config != null)
			this.configure(config);
	}

	public configure(config: ConfigParams): void {
		this._config = config.getSection("message_templates");
	}

	public put(name: string, template: any): void {
		this._config[name] = template;
	}

    public resolve(name: string): MessageV1 {
		if (name == null)
			return null;

        // Retrieve template first
        var message = this._messages[name];
        if (message) return message;
            
        let template = this._config.get(name);
        if (_.isString(template) && template != '') {
            // Construct a message
            message = <MessageV1> {
                template: template
            };
    
            // Cache the message
            this._messages[name] = message;

            return message;
        } else {
            // Get configuration
            let config = this._config.getSection(name);
    
            // Construct a message
            message = <MessageV1> {
                template: config.getAsString('template'),
                subject: config.getAsObject('subject'),
                text: config.getAsObject('text'),
                html: config.getAsObject('html')
            };
    
            // Check and cache the message
            if (message.template || message.subject || message.text || message.html)
                this._messages[name] = message;
            else message = null;
    
            return message;
        }
    }
	
	public static fromTuples(...tuples: any[]): MessageResolverV1 {
		let result = new MessageResolverV1();
    	if (tuples == null || tuples.length == 0)
    		return result;
    	
        for (let index = 0; index < tuples.length; index += 2) {
            if (index + 1 >= tuples.length) break;

            let name = StringConverter.toString(tuples[index]);
            let template = tuples[index + 1];

            result.put(name, template);
        }
        
        return result;
	}
}
