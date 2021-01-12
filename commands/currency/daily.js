// Akairo
const { Command } = require('discord-akairo')

// Mongoose
const User = require('../../database/schema/user')

// Functions
const { 
    embedConsoleError,
    embedSuccess,
    embedError
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
                const amount = 500
                await User.findOneAndUpdate({ discordId }, { $inc: { gold: amount }, $set: { hasUsedDaily: true } }, { new: true })

                const embed = embedSuccess(`💰 ${message.author}, ${amount} Gold has been added to your balance!`)
                return message.channel.send(embed)
            } else {
                const remainingHours = moment().endOf('day').fromNow('true')
                const remainingMinutes = moment().endOf('hour').fromNow('true')

                const embed = embedError(`⛔ ${message.author}, you have already used daily today! Please wait ${remainingHours} ${remainingMinutes}.`)
                return message.channel.send(embed)
            }
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}