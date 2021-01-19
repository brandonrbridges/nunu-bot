const { Command } = require('discord-akairo')
const { embedStandard } = require('../../functions/helpers')

module.exports = class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            args: [
                {
                    id: 'category',
                    type: 'string'
                }
            ]
        })
    }

    exec(message, { category }) {
        if(category === 'custom') {
            const embed = embedStandard(`🕹️ **You asked for help with our Custom Games commands!** If you require assistance using these commands, please speak to a member of staff.`).addFields(
                {
                    name: `${prefix}createcustom`,
                    value: 'Creates a custom game. (For staff use only).'
                },
                {
                    name: `${prefix}deletecustom`,
                    value: 'Deletes an active custom game. (For staff use only).'
                },
                {
                    name: `${prefix}joincustom`,
                    value: 'Enters you into the custom game lobby, ready to be matchmade.'
                },
                {
                    name: `${prefix}leavecustom`,
                    value: 'Removes yourself from the custom game system.'
                },
                {
                    name: `${prefix}playerlist`,
                    value: 'Lists the players currently in the custom game lobby.'
                },
                {
                    name: `${prefix}startcustom`,
                    value: 'Starts the active custom game. (For staff use only).'
                },
                {
                    name: `${prefix}end!custom/${prefix}giveprize [teamId]`,
                    value: 'Sets the winning team of the custom game, and handles the reward distribution. (For staff use only).'
                }
            )
            
            return message.channel.send(embed)
        }
    }
}