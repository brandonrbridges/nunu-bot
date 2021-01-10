const { Command } = require('discord-akairo')

const { bet } = require('../../functions/currency')

module.exports = class BetCommand extends Command {
    constructor() {
        super('bet', {
            aliases: ['bet'],
            args: [
                {
                    id: 'amount',
                    type: 'number',
                }
            ]
        })
    }

    exec(message, args) { bet(message, args.amount) }
}