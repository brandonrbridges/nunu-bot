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

module.exports = class AddBalanceCommand extends Command {
    constructor() {
        super('addbalance', {
            aliases: ['addbalance', 'addbal', 'add'],
            args: [
                {
                    id: 'user',
                    type: 'user',
                },
                {
                    id: 'amount',
                    type: 'number'
                },
                {
                    id: 'reward',
                    match: 'flag',
                    flag: '--reward'
                }
            ],
        })
    }

    async exec(message, { user, amount, reward }) {
        const discordId = user.id
        const permitted = await checkPermissions(message, 'ADMINISTRATOR')

        try {
            if(permitted) {
                message.delete()

                const db = await User.findOneAndUpdate({ discordId }, { $inc: { gold: amount } }, { new: true })
                let embed

                if(!reward) {
                    embed = embedSuccess(`💰 ${user}, your balance has increased by ${formatNumber(amount)} Gold thanks to ${message.author}!\n\nYou now have ${formatNumber(db.gold)} Gold!`)
                } else {
                    embed = embedSuccess(`💰 ${user}, you have been rewarded ${formatNumber(amount)} Gold by ${message.author}!\n\nYou now have ${formatNumber(db.gold)} Gold!`)
                }

                return message.channel.send(embed)
            }
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.chanel.send(embed)
        }
    }
}