// Akairo
const { Command } = require('discord-akairo')

// Functions
const { embedError } = require('../../functions/helpers')

module.exports = class ByeCommand extends Command {
    constructor() {
        super('verify', {
            aliases: ['verify'],
            ownerOnly: true
        })
    }

    exec(message) {
        message.delete()

        const embed = embedSuccess(` ${message.author} has left the server! Farewell, our old friend!`)

        return message.channel.send(embed)
    }
}