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
            let game = await CustomGame.findOne({ guildId: message.guild.id, isActive: true }) 
    
            if(game) {
                if(game.players.includes(message.author.id)) {
                    try {
                        await CustomGame.findOneAndUpdate({ guildId: message.guild.id, isActive: true }, { $pull: { players: discordId }, $set: { inProgress: false } }, { new: true })
                        game = await CustomGame.findOne({ guildId: message.guild.id, isActive: true })
        
                        const embed = embedSuccess(`🕹️ ${message.author}, you have left the custom game!`).addFields({ name: 'In Lobby', value: game.players.length, inline: true }, { name: 'Remaining Spots', value: (10 - game.players.length), inline: true })
                        return message.channel.send(embed)
                    } catch(error) {
                        const embed = embedConsoleError(error)
                        return message.channel.send(embed)
                    }
                } else {
                    const embed = embedError(`${message.author}, you are currently not listed in the custom game.`)
                    return message.channel.send(embed)
                }
            } else {
                const embed = embedError(`${message.author}, there are no active custom games at the moment.`)
                return message.channel.send(embed)
            }
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}