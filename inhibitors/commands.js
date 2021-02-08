// Akairo
const { Inhibitor } = require('discord-akairo')

// Functions 
const { embedError } = require('../functions/helpers')

module.exports = class CommandBlockInhibitor extends Inhibitor {
    constructor() {
        super('commandblock', {
            reason: 'blacklist',
            type: 'all'
        })
    }

    exec(message) {
        if(message.channel.id == message.guild.systemChannelID && message.content.startsWith(prefix)) {
            message.delete()

            const botChannel = message.guild.channels.cache.find(channel => channel.name === 'bot-commands')

            const embed = embedError(`${message.author}, you are not allowed to use commands here, use ${botChannel}.`)

            return message.channel.send(embed)
        }
    }
}