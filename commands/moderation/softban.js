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

    async exec(message, { member, duration, reason }) {
        const permission = await checkPermissions(message, 'BAN_MEMBERS')

        try {
            if(permission) {
                if(member.bannable) {
                    member.ban({ days: duration, reason })

                    const embed = embedSuccess(`👋 ${member} has been softbanned from ${message.guild.name} by ${message.author} for ${duration} days!`)
                    return message.channel.send(embed)
                } else {
                    const embed = embedError(`${message.author}, you cannot softban ${member}!`)
                    return message.channel.send(embed)
                }
            }
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}