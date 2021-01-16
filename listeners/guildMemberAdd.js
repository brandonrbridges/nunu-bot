const { Listener } = require('discord-akairo')

const {
    createUser
} = require('../functions/database')

const {
    embedSuccess
} = require('../functions/helpers')

module.exports = class GuildMemberAddListener extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd'
        })
    }

    exec(member) {
        // Add user to database
        createUser(member.id)

        const channel = member.guild.systemChannel

        const embed = embedSuccess(`👋 ${member} has joined the server! Welcome to ${member.guild.name}!`)

        return channel.send(embed)
    }
}