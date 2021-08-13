const { MessageEmbed } = require("discord.js")


module.exports = {
  name: "suggest",
  usage: "suggest <message>",
  description: "Send your Suggestion",
  category: "main",
  run: (client, message, args) => {
    message.delete();
    
 
    let chName = "suggestions"
    let channel = message.guild.channels.cache.find((x) => (x.name === `${chName}` ))
    
    
    if(!channel) {
      return message.channel.send(`there is no channel with name - **${chName}**`)
        /*.then(function () {
        message.guild.channels.create(`${chName}`, {
        type: "text", //This create a text channel, you can make a voice one too, by changing "text" to "voice"
        permissionOverwrites: [
           {
             id: message.guild.roles.everyone, //To make it be seen by a certain role, user an ID instead
             allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'], //Allow permissions
             deny: ['SEND_MESSAGE'] //Deny permissions
		   }
        ],
      })
      })*/
      
    }
let embed = new MessageEmbed()
    .setAuthor("SUGGESTION: " + message.author.tag, message.author.avatarURL())
    .setThumbnail(message.author.avatarURL())
    .setColor("#ff2050")
    .setDescription(args.join(" "))
    .setTimestamp()
    
    
    channel.send(embed).then(m => {
      m.react("✅")
      m.react("❌")
    }).catch(err => {})

   message.channel.send("Sended You  Suggestion to " +`<#`+channel+`>`).catch(err => {})
    
  }
}