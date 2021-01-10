const { Listener } = require('discord-akairo')

const { MessageEmbed } = require('discord.js')

module.exports = class GuildMemberAddListener extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd'
        })
    }

    exec(member) {
        // createUser(member.id)
    }
}