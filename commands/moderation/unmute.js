module.exports = {
  name: "unmute",
  category: "moderation",
  run: async (client, message, args) => {
    

    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send(
        "Sorry but you do not have permission to unmute anyone"
      ).then(m => m.delete({ timeout: 5000 }));
    }

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("I do not have permission to manage roles.").then(m => m.delete({ timeout: 5000 }));
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send(
        "Please mention the member to who you want to unmute"
      ).then(m => m.delete({ timeout: 5000 }));
    }
    
    let muterole = message.guild.roles.cache.find(x => x.name === "Muted")
    
    
 if(user.roles.cache.has(muterole)) {
      return message.channel.send("Given User do not have mute role so what i am suppose to take").then(m => m.delete({ timeout: 5000 }))
    }
    
    
    user.roles.remove(muterole)
    
    await message.channel.send(`**${message.mentions.users.first().username}** is unmuted`).then(m => m.delete({ timeout: 5000 }))
    
    user.send(`You are now unmuted from **${message.guild.name}**`)

  }
};
