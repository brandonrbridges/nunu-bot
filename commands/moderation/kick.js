// Akairo
const { Command } = require('discord-akairo')

// Functions
const {
    checkPermissions,
    embedConsoleError,
    embedError,
    embedSuccess,
} = require('../../functions/helpers')

module.exports = class KickCommand extends Command {
    constructor() {
        super('kick', {
            aliases: ['kick'],
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

    async exec(message, { member, reason }) {
        const permission = await checkPermissions(message, 'KICK_MEMBERS')

        try {
            if(permission) {
                if(member.kickable) {
                    member.kick({ reason })

                    const embed = embedSuccess(`👋 ${member} has been kicked from ${message.guild.name} by ${message.author}!`)
                    return message.channel.send(embed)
                } else {
                    const embed = embedError(`${message.author}, you cannot kick ${member}!`)
                    return message.channel.send(embed)
                }
            }
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}