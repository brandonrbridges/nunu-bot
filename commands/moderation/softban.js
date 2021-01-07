const { Command } = require('discord-akairo')

module.exports = class SoftBanCommand extends Command {
    constructor() {
        super('softban', {
            aliases: ['softban'],
            args: [
                {
                    id: 'member',
                    type: 'member',
                },
                {
                    id: 'duration',
                    type: 'string'
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