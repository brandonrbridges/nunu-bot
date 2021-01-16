// Akairo
const { Command } = require('discord-akairo')

// Database
const store = require('../../database/store')

// Functions
const { 
    embedStandard,
    formatNumber 
} = require('../../functions/helpers')

module.exports = class StoreCommand extends Command {
    constructor() {
        super('store', {
            aliases: ['store']
        })
    }

    exec(message) {
        const embed = embedStandard(`🛒 ${message.guild.name} BE Store`)

        for(let i = 0; i < store.length; i++) {
            console.log(store[i])
            embed.addField(store[i].name, `Description: ${store[i].description}\nPrice: ${formatNumber(store[i].price)} BE`)
        }

        return message.channel.send(embed)
    }
}