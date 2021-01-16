// Akairo
const { Command } = require('discord-akairo')
const { GuildMember } = require('discord.js')

// Functions
const {
    embedConsoleError,
    embedError,
    embedSuccess,
    checkPermissions,
} = require('../../functions/helpers')

module.exports = class RoleCommand extends Command {
    constructor() {
        super('role', {
            aliases: ['role'],
            args: [
                {
                    id: 'position',
                    type: 'string'
                }
            ]
        })
    }

    async exec(message, { position }) {
        try {
            const positions = ['top', 'jungle', 'mid', 'adc', 'support']
            const emojis = {
                top: {
                    name: 'position_top',
                    id: '796691840014352384'
                },
                jungle: {
                    name: 'position_jungle',
                    id: '796691839889178624'
                },
                mid: {
                    name: 'position_mid',
                    id: '796691839968346112'
                },
                adc: {
                    name: 'position_adc',
                    id: '796691839842254849'
                },
                support: {
                    name: 'position_support',
                    id: '796691839537250305'
                }
            }

            position = position.toLowerCase()
            const roleName = (position == 'adc' ? position.toUpperCase() : position.charAt(0).toUpperCase() + position.slice(1))
            const role = message.guild.roles.cache.find(role => role.name == roleName)


            message.channel.send(`DEBUG: role name: ${roleName} | role: ${role} | user has role: ${hasRole}`)
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}