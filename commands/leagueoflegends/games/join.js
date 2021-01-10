const { Command } = require('discord-akairo')

const { joinCustom } = require('../../../functions/leagueoflegends')

module.exports = class JoinCustomGameCommand extends Command {
    constructor() {
        super('joincustom', {
            aliases: ['joincustom']
        })
    }

    async exec(message) { await joinCustom(message) }
}