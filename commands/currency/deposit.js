// Akairo
const { Command } = require('discord-akairo')

// Mongoose
const User = require('../../database/schema/user')

// Functions
const {
    embedConsoleError,
    embedError,
    embedSuccess,
    formatNumber
} = require('../../functions/helpers')

module.exports = class DepositCommand extends Command {
    constructor() {
        super('deposit', {
            aliases: ['deposit'],
            args: [
                {
                    id: 'amount',
                    type: 'number'
                }
            ]
        })
    }

    async exec(message, { amount }) {
        try {
            const user = await User.findOne({ discordId: message.author.id })

            if(amount >= 1000) {
                if(user.gold >= amount) {
                    const updated = await User.findOneAndUpdate({ discordId: message.author.id }, { $inc: { gold: -amount, bank: amount } }, { new: true })

                    const embed = embedSuccess(`${message.author}, you have deposited ${formatNumber(amount)} into your bank account successfully.`).addFields({ name: 'Gold in Pocket', value: `💰 ${formatNumber(updated.gold)}`, inline: true }, { name: 'Gold in Bank', value: `🏦 ${formatNumber(updated.bank)}`, inline: true })
                    return message.channel.send(embed)
                } else {
                    const embed = embedError(`${message.author}, you do not have enough Gold to deposit that amount.`)
                    return message.channel.send(embed)
                }
            } else {
                const embed = embedError(`${message.author}, you can only deposit 1,000 Gold or more.`)
                return message.channel.send(embed)
            }
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}