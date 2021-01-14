// Akairo
const { Command } = require('discord-akairo')

// Functions
const {

} = require('../../functions/moderation')

const {
    checkPermissions,
    embedConsoleError,
    embedError,
    embedSuccess,
} = require('../../functions/helpers')

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

    async exec(message, { member, reason }) {
        const permission = await checkPermissions(message, 'BAN_MEMBERS')

        try {
            if(permission) {
                if(member.bannable) {
                    member.ban({ reason })

                    const embed = embedSuccess(`👋 ${member} has been banned from ${message.guild.name} by ${message.author}!`)
                    return message.channel.send(embed)
                } else {
                    const embed = embedError(`${message.author}, you cannot ban ${member}!`)
                    return message.channel.send(embed)
                }
            }
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}