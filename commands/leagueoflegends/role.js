const { Command } = require('discord-akairo')

module.exports = class RoleCommand extends Command {
    constructor() {
        super('roles', {
            aliases: ['roles'],
            args: [
                {
                    id: 'type',
                    type: 'string'
                },
                {
                    id: 'value',
                    type: 'string'
                }
            ]
        })
    }

    exec(message, args) {
        
    }
}