const { Listener } = require('discord-akairo')

const {
    embedError
} = require('../functions/helpers')

module.exports = class GuildMemberRemoveListener extends Listener {
    constructor() {
        super('guildMemberRemove', {
            emitter: 'client',
            event: 'guildMemberRemove'
        })
    }

    exec(member) {
        const channel = member.guild.systemChannel

        const embed = embedError(`👋 ${member} has left the server! Farewell, our old friend!`)

        return channel.send(embed)
    }
}