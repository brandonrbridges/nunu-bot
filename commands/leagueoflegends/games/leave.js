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

module.exports = class LeaveCustomGameCommand extends Command {
    constructor() {
        super('leavecustom', {
            aliases: ['leavecustom']
        })
    }

    async exec(message) {
        try {
            const discordId = message.author.id
            const game = await CustomGame.findOne({ isActive: true }) 
    
            if(game) {
                if(game.players.includes(message.author.id)) {
                    try {
                        await CustomGame.findOneAndUpdate({ isActive: true }, { $pull: { players: discordId } }, { new: true })
        
                        const embed = embedSuccess(`🕹️ ${message.author}, you have left the custom game!`)
                        return message.channel.send(embed)
                    } catch(error) {
                        const embed = embedConsoleError(error)
                        return message.channel.send(embed)
                    }
                } else {
                    const embed = embedError(`🕹️ ${message.author}, you are currently not listed in the custom game.`)
                    return message.channel.send(embed)
                }
            } else {
                const embed = embedError(`🕹️ ${message.author}, there are no active custom games at the moment.`)
                return message.channel.send(embed)
            }
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}