const { Listener } = require('discord-akairo')

const { createUser } = require('../functions/database')

module.exports = class GuildMemberAddListener extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd'
        })
    }

    exec(member) {
        // Add user to database
        createUser(member.id)
    }
}