// Akairo
const { Command } = require('discord-akairo')

// Mongoose
const User = require('../../database/schema/user')

// Functions
const { 
    embedConsoleError,
    embedSuccess,
    formatNumber,
    checkPermissions
} = require('../../functions/helpers')

module.exports = class SetBalanceCommand extends Command {
    constructor() {
        super('setbalance', {
            aliases: ['setbalance', 'setbal', 'set'],
            args: [
                {
                    id: 'user',
                    type: 'user',
                },
                {
                    id: 'amount',
                    type: 'number'
                }
            ],
        })
    }

    async exec(message, { user, amount }) {
        const discordId = user.id
        const permitted = checkPermissions(message, 'ADMINISTRATOR')

        try {
            if(permitted) {
                await User.findOneAndUpdate({ discordId }, { $set: { gold: amount } }, { new: true })
                
                const embed = embedSuccess(`💰 ${message.author} has set ${user}'s balance to ${formatNumber(amount)} Gold!`)
                return message.channel.send(embed)
            }
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.chanel.send(embed)
        }
    }
}