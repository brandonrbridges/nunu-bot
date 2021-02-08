const User = require('../database/schema/user')

const { embedSuccess } = require('./helpers')

/**
 * Adds to xp cache
 * 
 * @description Adds to the users xp cache by the length of the message's content
 * 
 * @version 1.1.0
 */
const addToXpCache = async (discordId,content) => {
    try {
        const user = await User.findOne({ discordId })

        if(user && user.canEarnExperience) {    
            await User.findOneAndUpdate({ discordId }, { $inc: { xpCache: content.length } }, { new: true })            
        } else { 
            return
        }
    } catch(error) {
        return console.error(error) 
    }
}

/**
 * Remove Experience
 * 
 * @description Removes Experience from users profile 
 * 
 * @version 1.1.0
 */
const removeXp = async (discordId,content) => {
    try {
        const user = await User.findOne({ discordId })

        if(user) {
            var xpLoss = Math.round(-(30 - 10** ((750-content.length)/507.5)))  
            await User.findOneAndUpdate({ discordId }, { $inc: { experience: xpLoss } }, { new: true })            
        } else { 
            return
        }
    } catch(error) {
        return console.error(error) 
    }
}

/**
 * Check XP
 * 
 * @description Checks user experience count 
 * 
 * @version 2.0.1
 */
const checkXp = async (discordId, guild, channel) => {
    try {
        const user = await User.findOne({ discordId })

        if(user) {
            var a = 0
            var b = 0
            var c = 200

            var x = 100
            while((x) < user.experience){		
                a = x
                b = b + 1	
                x = a + b * c
            }            
            if(b > user.level){                         
                levelUp(discordId, guild, channel)
            }else if(b < user.level){                     
                levelDown(discordId, guild, channel)
            }else{
                return
            }
        } else {
            return
        }
    } catch(error) {
        return console.error
    }
}

/**
 * Level up
 * 
 * @description Increases user level
 * 
 * @version 2.0.1
 */
const levelUp = async (discordId, guild, channel) => {
    try {
        const user = await User.findOne({ discordId })
        
        const updatedUser = await User.findOneAndUpdate({ discordId }, { level: user.level + 1}, { new: true })

        const member = await guild.members.cache.get(discordId)

        if(updatedUser.level % 5 == 0){  
            console.log("check")          
            const oldRole = await guild.roles.cache.find(role => role.name === `Level ${(updatedUser.level - 5)}`)
            const newRole = await guild.roles.cache.find(role => role.name === `Level ${updatedUser.level}`)
            
            if(oldRole && newRole){
                console.log("what, how?")
                member.roles.remove(oldRole)
                member.roles.add(newRole)   
                console.log("finally")                             
            }
        }
        console.log("level up")       
        const embed = embedSuccess(`🎉 ${member} has levelled up to Level ${updatedUser.level}`)
        //checkXp( discordId, guild, channel)
        return channel.send(embed)
    } catch(error) {
        return console.error
    }
}

/**
 * Level down
 * 
 * @description Decreases user level
 * 
 * @version 1.0.1
 */
const levelDown = async (discordId, guild, channel) => {
    try {
        const user = await User.findOne({ discordId })
        
        const updatedUser = await User.findOneAndUpdate({ discordId }, { level: user.level - 1}, { new: true })

        const member = await guild.members.cache.get(discordId)

        if(user.level % 5 == 0){            
            const oldRole = await guild.roles.cache.find(role => role.name === `Level ${user.level}`)            
            const newRole = await guild.roles.cache.find(role => role.name === `Level ${(user.level - 5)}`)
           
            if(oldRole){
                member.roles.remove(oldRole)
                if(newRole){
                    member.roles.add(newRole)
                }
            }            
        }        
        console.log("level down")
        const embed = embedSuccess(`${member} has been demoted to Level ${updatedUser.level}`)
        //checkXp(discordId, guild, channel)
        return channel.send(embed)
    } catch(error) {
        return console.error
    }
}

/**
 * Apply Experience
 * 
 * @description Cashes out everyone's xp cache and calculates & applies the apropriate experience gain
 * 
 * @version 1.0.0
 */
const applyExperience = async () => {
    try {
        const users = await User.find({ canEarnExperience: true })

        users.forEach(async user => {
            var xpGain = Math.round(30 - 10** ((750-user.xpCache)/507.5))                        
            await User.findOneAndUpdate({ discordId: user.discordId }, { $inc: { experience: xpGain} , $set: { xpCache: 0} }, { new: true })               
        })
    } catch(error) {
        return console.error(error)
    }
}

/**
 * Exports
 */
module.exports = {
    addToXpCache,
    removeXp,
    checkXp,
    applyExperience
}