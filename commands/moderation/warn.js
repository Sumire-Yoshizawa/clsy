const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "warn",
  category: "moderation",
  usage: "warn <@mention> <reason>",
  description: "Warn anyone who do not obey the rules",
  run: async (client, message, args) => {
    
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("You should have admin perms to use this command!").then(m => m.delete({ timeout: 5000 }))
    }
    
    const user = message.mentions.members.first()
    
    if(!user) {
      return message.channel.send("Please Mention the person to who you want to warn - warn @mention <reaosn>").then(m => m.delete({ timeout: 5000 }))
    }
    
    if(message.mentions.users.first().bot) {
      return message.channel.send("You can not warn bots").then(m => m.delete({ timeout: 5000 }))
    }
    
    if(message.author.id === user.id) {
      return message.channel.send("You can not warn yourself").then(m => m.delete({ timeout: 5000 }))
    }
    
    if(user.id === message.guild.owner.id) {
      return message.channel.send("You jerk, how you can warn server owner -_-").then(m => m.delete({ timeout: 5000 }))
    }
    
    let reason = args.slice(1).join(" ")
    
     if (!reason) reason = "Unspecified";
    
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    if(warnings === 3) {
      return message.channel.send(`${message.mentions.users.first().username} already reached his/her limit with 3 warnings`).then(m => m.delete({ timeout: 5000 }))
    }
    
    if(warnings === null) {
      db.set(`warnings_${message.guild.id}_${user.id}`, 1)
      user.send(`You have been warned in **${message.guild.name}** for ${reason}`)
      await message.channel.send(`You warned **${message.mentions.users.first().username}** for ${reason}`)
    } else if(warnings !== null) {
        db.add(`warnings_${message.guild.id}_${user.id}`, 1)
       user.send(`You have been warned in **${message.guild.name}** for ${reason}`)
      await message.channel.send(`You warned **${message.mentions.users.first().username}** for ${reason}`)
    }
    
  
  } 
}