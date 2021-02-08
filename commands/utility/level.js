// Akairo
const { Command } = require('discord-akairo')

// Mongoose
const User = require('../../database/schema/user')

// Functions
const {
    embedConsoleError,
    embedStandard,
    formatNumber
} = require('../../functions/helpers')

module.exports = class LevelCommand extends Command {
    constructor() {
        super('level', {
            aliases: ['level', 'rank', 'xp'],
            args: [
                {
                    id: 'user',
                    type: 'user',
                    default: message => message.author
                }
            ]
        })
    }

    async exec(message, { user }) {
        try {
            const db = await User.findOne({ discordId: user.id })
            if(db){
                var a = 0
                var b = 0
                const c = 200

                var x1 = 100
                var reachedXp = db.experience
                while((x1) < db.experience){
                    reachedXp = db.experience - x1		
                    a = x1
                    b = b + 1	
                    x1 = a + b * c
                }
                const x2 = a + (b+1) * c                
                const missingXp = (x2 - db.experience)
                const embed = embedStandard(`${user}'s Level`).addFields({ name: 'Level', value: db.level, inline: true }, { name: 'Experience', value: formatNumber(reachedXp), inline: true }, { name: `Next Level In`, value: `Level ${db.level + 1} in ${formatNumber(missingXp)} xp`, inline: true })
            return message.channel.send(embed)
            }else{
                return
            }            
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}