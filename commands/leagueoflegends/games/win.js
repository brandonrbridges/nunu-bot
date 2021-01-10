const { Command } = require('discord-akairo')

const { winCustomGame } = require('../../../functions/leagueoflegends')

module.exports = class WinCustomGameCommand extends Command {
    constructor() {
        super('win', {
            aliases: ['win'],
            ownerOnly: true
        })
    }

    exec(message) { winCustomGame() }
}