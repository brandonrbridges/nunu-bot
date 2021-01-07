const { Command } = require('discord-akairo')

module.exports = class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            args: [
                {
                    id: 'category',
                    type: 'string'
                }
            ]
        })
    }

    exec(message) {
        
    }
}