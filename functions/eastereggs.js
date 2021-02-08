/**
 * Easter Eggs
 * 
 * @description self explanatory
 * 
 * @argument discordId @type String
 * 
 * @version 1.0.0
 */
const easterEggs = async (message) => {
    // Shen
    if(message.content.toLowerCase().includes('shen')) {
        return message.react('<:shen:799765676054806548>')
    }

    // Pog
    if(message.content.toLowerCase().includes('pog')) {
        return message.react('<a:pogo:791278798049509406>')
    }

    // Tangerine
    const tangerines = ['orange','tangerine','trial mod', 'trial admin']
    if(tangerines.some(el => message.content.toLowerCase().includes(el))) {
        return message.react('🍊')
    }

    // Jess approves
    if(message.author.id === '165134266659766272' && message.content === 'https://tenor.com/view/tohru-kobayashisan-chi-no-maid-dragon-dragon-maid-thumbs-up-gif-12390446') {
        const embed = embedStandard(`✅ Jess approves!`)
        return message.channel.send(embed)
    }

    // Igni memes
    if(message.author.id === '513048504487378964' && message.content.toLowerCase() === 'guys im gonna only ask once' && message.channel.name !== 'memes') {
        const embed = embedStandard(`${message.author} has spoken! Keep memes out of ${message.channel}!`)
        return message.channel.send(embed)
    }

    // Luis inting
    if(message.author.id === '334107033831735308' && message.content.toLowerCase().includes('play a game')) {
        const embed = embedStandard('Willump: Oh no, inting time!\nNunu: *grunts*')
        return message.channel.send(embed)
    }
}

/**
 * Exports
 */
module.exports = {
    easterEggs
}