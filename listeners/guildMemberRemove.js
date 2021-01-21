// Akairo
const { Listener } = require('discord-akairo')

// Mongoose
const User = require('../database/schema/user')

// Functions
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
        User.findOneAndDelete({ discordId: member.id })
        
        const channel = member.guild.systemChannel

        const embed = embedError(`👋 ${member} has left the server! Farewell, our old friend!`)

        return channel.send(embed)
    }
}