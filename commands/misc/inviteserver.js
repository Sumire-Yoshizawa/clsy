const Discord = require("discord.js");

module.exports = {
  name: "inviteserver",

  category: "misc",

  aliases: ["invsvr"],

  description: "get server invite link",

  usage: "invsvr",
  cooldown: 43200000,

  async run(client, message, args) {
   
message.channel.createInvite({ unique: true, temporary: false }).then(invite => {
message.channel.send("Hey! I've created you an invite: https://discord.gg/" + invite.code)
});
}
}