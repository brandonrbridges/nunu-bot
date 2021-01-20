// Akairo
const { Command } = require('discord-akairo')

// Mongoose
const User = require('../../database/schema/user')

// Functions
const { 
    embedConsoleError,
    embedError,
    embedStandard,
    embedSuccess
} = require('../../functions/helpers')

// Moment
const moment = require('moment')

module.exports = class InfractionsCommand extends Command {
    constructor() {
        super('infractions', {
            aliases: ['infractions', 'warnings'],
            args: [
                {
                    id: 'member',
                    type: 'member',
                    default: message => message.member
                }
            ]
        })
    }

    async exec(message, { member }) {
        try {
            const staffId = message.author.id
            const db = await User.findOne({ discordId: member.id })

            if(db.infractions.length >= 1) {
                const infractions = db.infractions
                
                const embed = embedStandard(`❗ ${member}'s Warnings\nUse the reactions to delete the warnings if you wish to do so.`)

                let count = 1;

                infractions.forEach(infraction => {
                    let staffMember = message.guild.members.cache.get(infraction.staffId)

                    embed.addField(`${count}. Warned ${moment(infraction.date).fromNow()}`, `Staff Member: ${staffMember}\nReason: ${infraction.reason}`)

                    count++
                })
                
                return message.channel.send(embed).then(async message => {
                    await message.react('🔥')

                    message.awaitReactions((reaction, user) => user.id == staffId && (reaction.emoji.name == '🔥'), { max: 1, time: 30000 }).then(async collected => {
                        if(collected.first().emoji.name == '🔥') {
                            await User.findOneAndUpdate({ discordId: member.id }, { $set: { infractions: [] } }, { new: true })
                            
                            const embed = embedSuccess(`✅ I have deleted all warnings for ${member}, their slate has been wiped clean!`)
                            return message.channel.send(embed)
                        }
                    })
                })
            } else {
                const embed = embedSuccess(`✅ ${member} doesn't appear to have any warnings. They're well behaved, huh?`)
                return message.channel.send(embed)
            }
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}