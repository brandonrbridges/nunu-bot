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
        if(category){category = category.toLowerCase()}
        
        if(!category) {
            const embed = embedStandard(`❓ You need help? Find a list of our categories below! Usage: ${prefix}help {category}.`).addField('Categories', 'custom\nutility')
            
            return message.channel.send(embed)
        } else if(category === 'custom') {
            const embed = embedStandard(`🕹️ **You requested help with our Custom Games commands!** If you need assistance using these commands, please speak to a member of staff.`).addFields(
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
        } else if (category === 'utility') {
            const embed = embedStandard(`🧰 **You requested help with our Utility commands!** If you need assistance using these commands, please speak to a member of staff.`).addFields(
                {
                    name: `${prefix}help`,
                    value: `Displays a list of categories you can then use with ${prefix}help {category}.`
                },
                {
                    name: `${prefix}info {optional:@user}`,
                    value: 'Displays information fetched from the mentioned user\'s Discord profile.'
                },
                {
                    name: `${prefix}leaderboard`,
                    value: 'Shows the leaderboard positions for who is in the lead with level and experience.'
                },
                {
                    name: `${prefix}level {optional:@user}`,
                    value: 'Displays your current level and experience, as well as the experience required to reach the next level.'
                },
                {
                    name: `${prefix}members`,
                    value: 'Shows the current member count for the server.'
                },
                {
                    name: `${prefix}notifications`,
                    value: `Displays a list of categories you can request notifications for. Use ${prefix}notifications to see a list of current events you can get notifications for.`
                },
                {
                    name: `${prefix}profile {optional:@user}`,
                    value: 'Displays a list of server-based statistics of the mentioned user, including: level, experience, and more..'
                },
                {
                    name: `${prefix}profilepicture {optional:@user}`,
                    value: 'Displays a larger version of the mention user\'s Discord profile picture.'
                },
                {
                    name: `${prefix}purge {1-99}`,
                    value: 'Deletes the number of messages used with the command in the current channel.'
                },
            )

            return message.channel.send(embed)
        }
    }
}