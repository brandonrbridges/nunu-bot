// Akairo
const { Command } = require('discord-akairo')

// Mongoose
const User = require('../../database/schema/user')

// Functions
const { 
    embedConsoleError,
    embedError,
    embedSuccess,
    formatNumber
} = require('../../functions/helpers')

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

    async exec(message, { amount }) { 
        try {
            const discordId = message.author.id
            let  user = await User.findOne({ discordId })
    
            if(user) {
                amount = Math.round(amount)
                if(amount > 0) {
                    if(user.gold >= amount) {
                        if(amount <= Math.round((user.gold / 5))) {
                            const embed = embedError(`${message.author}, please bet ${Math.round((user.gold / 5))} Gold or higher.`).addField('Why?', 'To prevent Gold boosting, and playing the lower chances, you have to bet at least 20% of your current balance.')
                            return message.channel.send(embed)
                        }
                        
                        let chance, winnings
    
                        if(amount <= 50) {
                            chance = Math.random() < 0.88
                            winnings = amount * 1.34
                        }
    
                        if(amount <= 100) {
                            chance = Math.random() < 0.80
                            winnings = amount * 1.40
                        }
    
                        if(amount <= 200) {
                            chance = Math.random() < 0.72
                            winnings = amount * 1.44
                        }
    
                        if(amount <= 500) {
                            chance = Math.random() < 0.64
                            winnings = amount * 1.48
                        }
    
                        if(amount <= 1000) {
                            chance = Math.random() < 0.58
                            winnings = amount * 1.52
                        }
    
                        if(amount <= 2000) {
                            chance = Math.random() < 0.50
                            winnings = amount * 1.56
                        }
    
                        if(amount >= 2001) {
                            chance = Math.random() < 0.42
                            winnings = amount * 1.88
                        }
    
                        winnings = Math.round(winnings)
    
                        if(chance) {
                            let user = await User.findOneAndUpdate({ discordId }, { $inc: { gold: winnings } }, { new: true })
                            
                            const embed = embedSuccess(`💰 ${message.author}, **you won ${formatNumber(winnings)} Gold!** You now have ${formatNumber(user.gold)} Gold.`)
                            return message.channel.send(embed)
                        } else {
                            let user = await User.findOneAndUpdate({ discordId }, { $inc: { gold: -amount } }, { new: true })
                            
                            const embed = embedError(`💰 ${message.author}, **you lost ${formatNumber(amount)} Gold!** You now have ${formatNumber(user.gold)} Gold.`)
                            return message.channel.send(embed)
                        }
                    } else {
                        const embed = embedError(`💰 ${message.author}, you do not have enough Gold to bet this amount!\nYou currently have ${formatNumber(user.gold)} Gold.`)
                        return message.channel.send(embed)
                    }
                } else {
                    const embed = embedError(`💰 ${message.author}, you have to bet 1 Gold or more!`)
                    return message.channel.send(embed)
                }
            } else {
                const embed = embedError(`There is no listing in the database for ${message.author}! Speak to V about this.`)
                return message.channel.send(embed)
            }
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}