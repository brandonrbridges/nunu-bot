const { Command } = require('discord-akairo')

const { createCustom } = require('../../../functions/leagueoflegends')

module.exports = class CreateCustomGameCommand extends Command {
    constructor() {
        super('createcustom', {
            aliases: ['createcustom']
        })
    }

    async exec(message) { await createCustom(message) }
}