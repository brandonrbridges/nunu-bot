const { Command } = require('discord-akairo')

const { checkPermissions } = require('../../functions/helpers')
const { kickMember } = require('../../functions/moderation')

const { MessageEmbed } = require('discord.js')

module.exports = class KickCommand extends Command {
    constructor() {
        super('kick', {
            aliases: ['kick'],
            args: [
                {
                    id: 'member',
                    type: 'member',
                },
                {
                    id: 'reason',
                    type: 'string',
                }
            ]
        })
    }

    exec(message, args) {
        // Check permissions
        checkPermissions(message, 'KICK_MEMBERS')
        .then(() => {
            // Create embed
            const embed = new MessageEmbed().setTimestamp()
            
            // Check if member is kickable
            if(member.kickable) {
                
            } else {
                
            }
        })
        .catch(embed => {
            return message.channel.send(embed)
        })
    }
}