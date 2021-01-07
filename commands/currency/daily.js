const { Command } = require('discord-akairo')

module.exports = class DailyCommand extends Command {
    constructor() {
        super('daily', {
            aliases: ['daily']
        })
    }

    exec(message) {
        
    }
}