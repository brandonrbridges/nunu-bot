const { Command } = require('discord-akairo')

const { fetchMeme } = require('../../functions/fun')
const { getAvatarUrl } = require('../../functions/helpers')

const { MessageEmbed } = require('discord.js')

module.exports = class MemeCommand extends Command {
    constructor() {
        super('meme', {
            aliases: ['meme'],
        })
    }

    exec(message) {
        const embed = new MessageEmbed()
        
        fetchMeme()
        .then(meme => {
            console.log(meme)
            
            embed
            .setAuthor(message.author.username, getAvatarUrl(message.author), null)
            .setColor('#FEFEFE')
            .setDescription(meme.caption)
            .setImage(meme.image)
            .setFooter(client.user.username, getAvatarUrl(client.user))
            .setTimestamp()

            return message.channel.send(embed)
        })
        .catch(error => {
            return console.error(error)
        })
    }
}