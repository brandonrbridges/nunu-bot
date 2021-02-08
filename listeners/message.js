const { Listener } = require('discord-akairo')

const { createUser } = require('../functions/database')
const { addExperience, checkXp, addToXpCache } = require('../functions/levelling')
const { easterEggs } = require('../functions/eastereggs')
const { 
    embedStandard,
    getAvatarUrl,
    embedError,
    embedConsoleError
} = require('../functions/helpers')

const { MessageEmbed } = require('discord.js')

module.exports = class MessageListener extends Listener {
    constructor() {
        super('message', {
            emitter: 'client',
            event: 'message'
        })
    }

    exec(message) {
        // Ensure messages are not from bot
        if(message.author.bot) return

        // Add user to database
        createUser(message.author.id)
        
        // Add experience for message send
        addToXpCache(message.author.id,message.content)

        // Check user XP if to level up or not
        checkXp(message.author.id, message.guild, message.channel)

        if(message.channel.id === '471841188341743616') {
            if(message.content.startsWith('http://' || 'https://')) {
                message.delete()
                
                const embed = new MessageEmbed({
                    description: `${message.author} that message contained a link! Please post in the appropriate channel!`,
                    footer: {
                        iconURL: getAvatarUrl(client.user),
                        text: client.user.username
                    }
                }).setTimestamp()

                message.channel.send(embed)
            }
        }
        easterEggs(message)
    }
}