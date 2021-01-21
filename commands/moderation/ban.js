// Akairo
const { Command } = require('discord-akairo')

// Mongoose
const User = require('../../database/schema/user') 

// Functions
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
                },
                {
                    id: 'force',
                    match: 'flag',
                    flag: '--force'
                }
            ]
        })
    }

    async exec(message, { member, reason, force }) {
        const permission = await checkPermissions(message, 'BAN_MEMBERS')

        const user = await User.findOne({ discordId: member.id })

        try {
            if(permission) {
                if(member.bannable) {
                    if(force) {
                        member.ban({ reason })

                        const embed = embedSuccess(`👋 ${member} was force banned from ${message.guild.name} by ${message.author}!`)
                        return message.channel.send(embed)
                    }

                    if(user.infractions.length >= 3) {
                        member.ban({ reason })

                        const embed = embedSuccess(`👋 ${member} has been banned from ${message.guild.name} by ${message.author}!`)
                        return message.channel.send(embed)
                    } else {
                        const embed = embedError(`${message.author}, I cannot ban ${member} until they have had at least 3 warnings!`)
                    return message.channel.send(embed)    
                    }
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