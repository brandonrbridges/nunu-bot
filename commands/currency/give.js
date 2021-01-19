// Akairo
const { Command } = require('discord-akairo')

// Mongoose
const User = require('../../database/schema/user')

// Functions
const { 
    embedConsoleError,
    embedError,
    embedSuccess,
    formatNumber, 
} = require('../../functions/helpers')

module.exports = class GiveBalanceCommand extends Command {
    constructor() {
        super('givebalance', {
            aliases: ['givebalance', 'givebal', 'give'],
            args: [
                {
                    id: 'user',
                    type: 'user',
                },
                {
                    id: 'amount',
                    type: 'number'
                }
            ]
        })
    }

    async exec(message, { user, amount }) {
        try {
            const giver = await User.findOne({ discordId: message.author.id })

            if(amount >= 1) {
                if(giver.gold >= amount) {
                    await User.findOneAndUpdate({ discordId: message.author.id }, { $inc: { gold: -amount } }, { new: true })
                    await User.findOneAndUpdate({ discordId: user.id }, { $inc: { gold: amount } }, { new: true })

                    const embed = embedSuccess(`💰 ${user}, you have received ${formatNumber(amount)} Gold from ${message.author}!`)
                    return message.channel.send(embed)
                } else {
                    const embed = embedError(`💰 ${message.author}, you are very generous. Unfortunately, **you can't afford that**.`)                
                    return message.channel.send(embed)
                }
            } else {
                const embed = embedError(`💰 ${message.author}, you cannot give zero or less. Try a higher amount.`)                
                return message.channel.send(embed)
            }
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}