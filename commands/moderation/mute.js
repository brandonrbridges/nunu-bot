const { Command } = require('discord-akairo')

module.exports = class MuteCommand extends Command {
    constructor() {
        super('mute', {
            aliases: ['mute'],
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