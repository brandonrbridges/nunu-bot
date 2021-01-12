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

module.exports = class JoinCustomGameCommand extends Command {
    constructor() {
        super('joincustom', {
            aliases: ['joincustom']
        })
    }

    async exec(message) { 
        try {
            const discordId = message.author.id
            let game = await CustomGame.findOne({ guildId: message.guild.id, isActive: true })
    
            if(game) {
                if(!game.players.includes(discordId)) {
                    if(game.players.length <= 10) {
                        await CustomGame.findOneAndUpdate({ guildId: message.guild.id, isActive: true }, { $push: { players: discordId } }, { new: true })
                        game = await CustomGame.findOne({ guildId: message.guild.id, isActive: true }) 

                        if(game.players.length == 10) {
                            const embed = embedSuccess(`🕹️ ${message.author}, you have joined the custom game! The lobby is now full!`).addFields({ name: 'In Lobby', value: game.players.length, inline: true }, { name: 'Remaining Spots', value: (10 - game.players.length), inline: true })
                            return message.channel.send(embed)
                        } else {
                            const embed = embedSuccess(`🕹️ ${message.author}, you have joined the custom game!`).addFields({ name: 'In Lobby', value: game.players.length, inline: true }, { name: 'Remaining Spots', value: (10 - game.players.length), inline: true })
                            return message.channel.send(embed)
                        }
                    } else {
                        const embed = embedError(` ${message.author}, the game appears to already be full! There are 10 players in the custom game.`)
                        return message.channel.send(embed)    
                    }
                } else {
                    const embed = embedError(`${message.author}, you are already participating in the custom game.`)
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