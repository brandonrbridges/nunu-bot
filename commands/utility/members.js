const { Command } = require('discord-akairo')

module.exports = class MembersCommand extends Command {
    constructor() {
        super('members', {
            aliases: ['members'],
        })
    }

    exec(message) {
        
    }
}