const { Command } = require('discord-akairo')

const { MessageEmbed } = require('discord.js')

module.exports = class ProfileCommand extends Command {
    constructor() {
        super('website', {
            aliases: ['website'],            
        })
    }

    exec(message, args) {
        // Create embed
        const embed = new MessageEmbed()
            .addField('Visit us on our website!','[loleuwdiscord.com](https://www.loleuwdiscord.com/)')   
        // Send embed
        return message.channel.send(embed)
    }
}