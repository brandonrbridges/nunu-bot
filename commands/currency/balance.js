// Akairo
const { Command } = require('discord-akairo')

// Mongoose
const User = require('../../database/schema/user')

// Functions
const { 
    embedConsoleError,
    embedError,
    embedStandard,
    embedSuccess,
    formatNumber,
} = require('../../functions/helpers')

module.exports = class BalanceCommand extends Command {
    constructor() {
        super('balance', {
            aliases: ['balance', 'bal'],
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
            const discordId = user.id
            const member = message.guild.members.cache.get(discordId)
            const db = await User.findOne({ discordId })

            if(member && db) {
                const embed = embedStandard(`💰 ${member}'s Server Balance`).addFields({ name: 'Gold', value: db.gold, inline: true }, { name: 'Blue Essence', value: db.blueEssence, inline: true }, { name: 'Orange Essence', value: db.orangeEssence, inline: true })
                return message.channel.send(embed)
            } else {
                const embed = embedError(`There was an error fetching that user's profile.`)
                return message.channel.send(embed)
            }
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}