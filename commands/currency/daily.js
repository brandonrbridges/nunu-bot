// Akairo
const { Command } = require('discord-akairo')

// Mongoose
const User = require('../../database/schema/user')

// Functions
const { 
    embedConsoleError,
    embedSuccess,
    embedError,
    formatNumber
} = require('../../functions/helpers')

// Moment
const moment = require('moment')

module.exports = class DailyCommand extends Command {
    constructor() {
        super('daily', {
            aliases: ['daily']
        })
    }

    async exec(message) {
        const discordId = message.author.id
        
        try {
            const user = await User.findOne({ discordId })

            if(!user.hasUsedDaily) {
                if(message.member.premiumSinceTimestamp) {
                    await User.findOneAndUpdate({ discordId }, { $inc: { gold: 1500, blueEssence: 200 }, $set: { hasUsedDaily: true } }, { new: true })
                    const embed = embedSuccess(`💰 ${message.author}, you have received the following perks for being a Nitro Booster!`).addFields({ name: 'Gold', value: formatNumber(1500), inline: true }, { name: 'Blue Essence', value: 200, inline: true })
                    return message.channel.send(embed)
                } else {
                    await User.findOneAndUpdate({ discordId }, { $inc: { gold: 500 }, $set: { hasUsedDaily: true } }, { new: true })
                    const embed = embedSuccess(`💰 ${message.author}, you have received 500 Gold!`).addField('💡 Did you know?', `If you Nitro Boost this server, when you use ${prefix}daily, you will gain **an additional ${formatNumber(1000)} and 200 Blue Essence**?`)
                    return message.channel.send(embed)
                }
            } else {
                const remainingHours = moment().endOf('day').fromNow('true')
                const remainingMinutes = moment().endOf('hour').fromNow('true')

                const embed = embedError(`${message.author}, you have already used daily today!`)
                return message.channel.send(embed)
            }
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}