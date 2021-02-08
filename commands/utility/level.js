// Akairo
const { Command } = require('discord-akairo')

// Mongoose
const User = require('../../database/schema/user')

// Levels
const { levels } = require('../../database/levels')

// Functions
const {
    embedConsoleError,
    embedStandard,
    formatNumber
} = require('../../functions/helpers')

module.exports = class LevelCommand extends Command {
    constructor() {
        super('level', {
            aliases: ['level', 'rank', 'xp'],
            args: [
                {
                    id: 'user',
                    type: 'user',
                    default: message => message.author
                }
            ]
        })
    }

    async exec(message, { user }) {
        try {
            const db = await User.findOne({ discordId: user.id })

            const embed = embedStandard(`${user}'s Level`).addFields({ name: 'Level', value: db.level, inline: true }, { name: 'Experience', value: formatNumber(db.experience), inline: true }, { name: `Next Level In`, value: `Level ${db.level + 1} in ${formatNumber(levels[db.level + 1].xp - db.experience)} xp`, inline: true })
            return message.channel.send(embed)
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}