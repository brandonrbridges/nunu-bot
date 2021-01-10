const { Command } = require('discord-akairo')

const { getAvatarUrl } = require('../../functions/helpers')

const store = require('../../database/store')

const { MessageEmbed } = require('discord.js')

module.exports = class StoreCommand extends Command {
    constructor() {
        super('store', {
            aliases: ['store']
        })
    }

    exec(message) {
        const embed = new MessageEmbed({
            color: '#ffa801',
            description: `🛒 ${message.guild.name} BE Store`,
            footer: {
                iconURL: getAvatarUrl(client.user),
                text: client.user.username
            }
        }).setTimestamp()

        for(const item in store) {
            console.log(item)
            // embed.addField(item.name, item.price)
        }

        return message.channel.send(embed)
    }
}