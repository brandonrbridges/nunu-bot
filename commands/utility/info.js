// Akairo
const { Command } = require('discord-akairo')

// Mongoose
const User = require('../../database/schema/user')

// Functions
const {
    embedConsoleError,
    embedStandard
} = require('../../functions/helpers')

// Moment
const moment = require('moment')

module.exports = class InfoCommand extends Command {
    constructor() {
        super('info', {
            aliases: ['info'],
            args: [
                {
                    id: 'member',
                    type: 'member',
                    default: message => message.member
                }
            ]
        })
    }

    async exec(message, { member }) {
        try {
            const user = await User.findOne({ discordId: member.id })
            const embed = embedStandard(`🔎 Information on ${member}`)
                .addField(`Joined ${moment(member.joinedTimestamp).fromNow()}`, moment(member.joinedTimestamp).format('DD/MM/YY HH:mm:ss'), true)
                .addField(`Highest Role`, member.roles.highest, true)
                .addField('Level', user.level, true)
            return message.channel.send(embed)
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}