const { Command } = require('discord-akairo')

module.exports = class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping'],
            ownerOnly: true
        })
    }

    exec(message) {
        return message.channel.send('pong')
    }
}