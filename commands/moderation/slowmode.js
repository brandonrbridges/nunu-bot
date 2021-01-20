// Akairo
const { Command } = require('discord-akairo')

// Functions
const {
    checkRole,
    embedConsoleError,
    embedError,
    embedSuccess
} = require('../../functions/helpers')

module.exports = class SlowmodeCommand extends Command {
    constructor() {
        super('slowmode', {
            aliases: ['slowmode', 'sm'],
            args: [
                {
                    id: 'time',
                    type: 'string'
                }
            ]
        })
    }

    exec(message, { time }) {
        try {
            
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}