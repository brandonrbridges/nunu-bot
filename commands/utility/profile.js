const { Command } = require('discord-akairo')

const { profile } = require('../../functions/utility')

module.exports = class ProfileCommand extends Command {
    constructor() {
        super('profile', {
            aliases: ['profile'],
            args: [
                {
                    id: 'user',
                    type: 'user',
                    default: message => message.author
                }
            ]
        })
    }

    exec(message, args) { profile(message, args.user.id) }
}