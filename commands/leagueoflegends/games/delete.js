// Akairo
const { Command } = require('discord-akairo')

// Mongoose
const CustomGame = require('../../../database/schema/customgame')

// Functions
const {
    checkRole,
    embedConsoleError,
    embedError,
    embedSuccess
} = require('../../../functions/helpers')

module.exports = class DeleteCustomGameCommand extends Command {
    constructor() {
        super('deletecustom', {
            aliases: ['deletecustom']
        })
    }

    async exec(message) {
        try {
            const permission = checkRole(message, 'Staff')

            if(permission) {
                const game = await CustomGame.findOne({ guildId: message.guild.id, isActive: true })
    
                if(game) {
                    message.delete()
                    
                    await game.delete()
        
                    const embed = embedSuccess(`🕹️ ${message.author}, the active custom game has been deleted!`)
                    return message.channel.send(embed)
                } else {
                    const embed = embedError(`${message.author}, there was no active custom game found to delete.`)
                    return message.channel.send(embed)
                }
            }
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}