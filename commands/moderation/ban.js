const { Command } = require('discord-akairo')

module.exports = class BanCommand extends Command {
    constructor() {
        super('ban', {
            aliases: ['ban'],
            args: [
                {
                    id: 'member',
                    type: 'member',
                },
                {
                    id: 'reason',
                    type: 'string'
                }
            ]
        })
    }

    exec(message, args) {
        
    }
}