// Akairo
const { Command } = require('discord-akairo')

// Mongoose
const User = require('../../database/schema/user')

// Functions
const { 
    embedConsoleError,
    embedError,
    embedStandard,
    formatNumber,
} = require('../../functions/helpers')

module.exports = class BankCommand extends Command {
    constructor() {
        super('bank', {
            aliases: ['bank'],
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
                const embed = embedStandard(`🏦 ${member}'s Server Bank Balance`).addFields({ name: 'Gold in Pocket', value: `💰 ${formatNumber(db.gold)}`, inline: true }, { name: 'Gold in Bank', value: `🏦 ${formatNumber(db.bank)}`, inline: true })
                return message.channel.send(embed)
            } else {
                const embed = embedError(`There was an error fetching that user's bank balance.`)
                return message.channel.send(embed)
            }
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}