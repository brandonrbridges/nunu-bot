const { Command } = require('discord-akairo')

const { deleteCustom } = require('../../../functions/leagueoflegends')

module.exports = class DeleteCustomGameCommand extends Command {
    constructor() {
        super('deletecustom', {
            aliases: ['deletecustom']
        })
    }

    async exec(message) { await deleteCustom(message) }
}