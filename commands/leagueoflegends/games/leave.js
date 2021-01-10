const { Command } = require('discord-akairo')

const { leaveCustom } = require('../../../functions/leagueoflegends')

module.exports = class LeaveCustomGameCommand extends Command {
    constructor() {
        super('leavecustom', {
            aliases: ['leavecustom']
        })
    }

    async exec(message) { await leaveCustom(message) }
}