const { Command } = require('discord-akairo')

module.exports = class PurgeCommand extends Command {
    constructor() {
        super('purge', {
            aliases: ['purge'],
            args: [
                {
                    id: 'amount',
                    type: 'number'
                }
            ]
        })
    }

    exec(message, args) {
        
    }
}