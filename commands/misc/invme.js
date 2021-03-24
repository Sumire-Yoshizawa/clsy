const Discord = require("discord.js");

const bot = new Discord.Client();

module.exports = {
  name: "invme",
  category: "misc",
  description: "get bot invite link",
  usage: "invme",

run(client, message, args) {

message.channel.send("")

    const embed = new Discord.MessageEmbed()
    .setAuthor(client.user.username,'https://i.imgur.com/9syztEI.gif')
    .setTitle("Invite Me")
    .setDescription("Invite this bot to your server")
    .setColor(0x00A2E8)
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
     .setImage('https://i.pinimg.com/originals/ed/6b/ff/ed6bff8acacfe3129c50523c36c54c37.gif')
   
  .setTimestamp()
    
    message.channel.send({embed})

}
  }