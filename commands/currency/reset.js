// Akairo
const { Command } = require('discord-akairo')

// Mongoose
const User = require('../../database/schema/user')

// Functions
const { 
    embedConsoleError,
    embedSuccess,
    checkPermissions
} = require('../../functions/helpers')

module.exports = class ResetDailiesCommand extends Command {
    constructor() {
        super('resetdailies', {
            aliases: ['resetdailies', 'resetdaily']
        })
    }

    async exec(message) {
        const permitted = await checkPermissions(message, 'ADMINISTRATOR')
        
        try {
            if(permitted) {
                const users = await User.find({ hasUsedDaily: true })

                users.forEach(async user => {
                    try {
                        await User.findOneAndUpdate({ discordId: user.discordId }, { hasUsedDaily: false }, { new: true })
                    } catch(error) {
                        const embed = embedConsoleError(error)
                        return message.channel.send(embed)
                    }
                })

                const embed = embedSuccess('✅ Everyone can use the daily command again today!')
                return message.channel.send(embed)
            }
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}