// Akairo
const { Command } = require('discord-akairo')

// Functions
const {
    embedStandard
} = require('../../functions/helpers')

module.exports = class LOLCountersCommand extends Command {
    constructor() {
        super('lolcounters', {
            aliases: ['lolcounters'],
            args: [
                {
                    id: 'champion',
                    type: 'string'
                }
            ]
        })
    }

    exec(message, { champion }) {
        const champ = champion.charAt(0).toUpperCase()  + champion.slice(1)
        const link = `https://u.gg/lol/champions/${champ}/counters`
        const emoji = message.guild.emojis.cache.find(emoji => emoji.name == 'leagueoflegends')
        
        const embed = embedStandard(`${emoji} Top Counters for ${champ} - [Click Here](${link})`)
        .setAuthor('u.gg', 'https://static.u.gg/assets/ugg/favicon/apple-touch-icon.png', link)
        .setThumbnail(`https://static.u.gg/assets/lol/riot_static/10.25.1/img/champion/${champ}.png`)

        return message.channel.send(embed)
    }
}