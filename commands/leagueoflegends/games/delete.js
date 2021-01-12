// Akairo
const { Command } = require('discord-akairo')

// Mongoose
const CustomGame = require('../../../database/schema/customgame')

// Functions
const {
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
            const game = await CustomGame.findOne({ isActive: true })
    
            if(game) {
                await game.delete()
    
                const embed = embedSuccess(`🕹️ ${message.author}, the active custom game has been deleted!`)
                return message.channel.send(embed)
            } else {
                const embed = embedError(`${message.author}, there was no active custom game found to delete.`)
                return message.channel.send(embed)
            }
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}