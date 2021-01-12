const { Listener } = require('discord-akairo')

const { getAvatarUrl } = require('../functions/helpers')

const { MessageEmbed } = require('discord.js')

module.exports = class GuildMemberRemoveListener extends Listener {
    constructor() {
        super('guildMemberRemove', {
            emitter: 'client',
            event: 'guildMemberRemove'
        })
    }

    exec(member) {
        const channel = member.guild.systemChannel

        const embed = new MessageEmbed({
            color: '#f53b57',
            description: `${member} has left the server! Farewell, our old friend!`,
        }).setTimestamp()

        channel.send(embed)
    }
}