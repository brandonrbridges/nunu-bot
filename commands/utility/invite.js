const { Command } = require('discord-akairo')

module.exports = class InviteCommand extends Command {
    constructor() {
        super('invite', {
            aliases: ['invite'],
            args: [
                {
                    id: 'member',
                    type: 'member',
                    default: message => message.member
                }
            ]
        })
    }

    exec(message, args) {
        
    }
}