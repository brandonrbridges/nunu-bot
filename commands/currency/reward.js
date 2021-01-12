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

module.exports = class RewardBalanceCommand extends Command {
    constructor() {
        super('rewardbalance', {
            aliases: ['rewardbalance', 'rewardbal', 'reward'],
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
        const permitted = await checkPermissions(message, 'ADMINISTRATOR')

        try {
            if(permitted) {
                const db = await User.findOneAndUpdate({ discordId }, { $inc: { gold: amount } }, { new: true })
                
                const embed = embedSuccess(`💰 ${user}, you have been rewarded ${formatNumber(amount)} Gold!\n\nYou now have ${db.gold} Gold!`)
                return message.channel.send(embed)
            }
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.chanel.send(embed)
        }
    }
}