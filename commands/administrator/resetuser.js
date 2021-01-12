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

module.exports = class ResetUserCommand extends Command {
    constructor() {
        super('db', {
            aliases: ['db'],
            args: [
                {
                    id: 'user',
                    type: 'user',
                    default: message => message.author
                },
                {
                    id: 'property',
                    type: 'string'
                },
                {
                    id: 'value',
                    type: 'string'
                }
            ]
        })
    }

    async exec(message, { user, property, value }) {
        const permitted = await checkPermissions(message, 'ADMINISTRATOR')
        
        try {
            if(permitted) {
                const discordId = user.id
                await User.findOneAndUpdate({ discordId }, { $set: { [property]: value } }, { new: true })

                const embed = embedSuccess(`✅ ${user}'s Database Property (${property}) has been changed to (${value}) successfully.`)
                return message.channel.send(embed)
            }
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}