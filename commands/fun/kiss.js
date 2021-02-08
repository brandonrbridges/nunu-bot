const { Command } = require('discord-akairo')

const { fetchKissGif } = require('../../functions/fun')
const { getAvatarUrl } = require('../../functions/helpers')

const { MessageEmbed } = require('discord.js')

module.exports = class KissCommand extends Command {
    constructor() {
        super('kiss', {
            aliases: ['kiss'],
            args: [
                {
                    id: 'member',
                    type: 'banana',
                    prompt: {
                        start: 'who would you like to kiss?'
                    }
                }
            ]
        })
    }

    exec(message, args) {
        const embed = new MessageEmbed()
        
        fetchKissGif()
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