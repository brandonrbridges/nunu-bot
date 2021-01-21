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

module.exports = class CreateCustomGameCommand extends Command {
    constructor() {
        super('createcustom', {
            aliases: ['createcustom']
        })
    }
    
    async exec(message) { 
        try {
            const permission = await checkRole(message, 'Staff')

            if(permission) {
                const existing = await CustomGame.findOne({ guildId: message.guild.id, isActive: true })
    
                if(!existing) {
                    await new CustomGame({ guildId: message.guild.id }).save()
        
                    const embed = embedSuccess(`🕹️ A custom game has been created!`)
                    return message.channel.send(embed)
                } else {
                    const embed = embedError('An active custom game already exists.')
                    return message.channel.send(embed)
                }
            }
            
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }       
    }
}