const { Command } = require('discord-akairo')

// const {  } = require('')

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

    exec(message, args) {
        fetchUser(args.user.id)
        .then(user => {

        })
        .catch(error => {

        })
    }
}