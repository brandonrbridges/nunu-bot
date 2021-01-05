const { Command } = require('discord-akairo')

const { fetchHugGif } = require('../../functions/fun')
const { getAvatarUrl } = require('../../functions/helpers')

const { MessageEmbed } = require('discord.js')

module.exports = class HugCommand extends Command {
    constructor() {
        super('hug', {
            aliases: ['hug'],
            args: [
                {
                    id: 'member',
                    type: 'memberMention',
                    prompt: {
                        start: 'who would you like to hug?'
                    }
                }
            ]
        })
    }

    exec(message, args) {
        const embed = new MessageEmbed()
        
        fetchHugGif()
        .then(image => {
            embed
            .setAuthor(message.author.username, getAvatarUrl(message.author), null)
            .setColor('#FEFEFE')
            .setDescription(`${message.author} kissed ${args.member}, das cute :3`)
            .setImage(image)
            .setFooter(client.user.username, getAvatarUrl(client.user))
            .setTimestamp()

            return message.channel.send(embed)
        })
        .catch(error => {
            return console.error(error)
        })
    }
}