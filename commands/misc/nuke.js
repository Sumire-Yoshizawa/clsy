const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "nuke",
  description: "Nuked a given channel",
  category: "admin",
  usage: "nuke",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message
        .reply("You do not have the perms to use this cmd!")
        .then(message => {
          message.delete({ timeout: 3000 });
        });
    }
    if (!message.channel.deletable) {
      return message.reply("This channel cannot be nukeed!").then(message => {
        message.delete({ timeout: 3000 });
      });
    }
    let newchannel = await message.channel.clone();
    await message.channel.delete();
    let embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Nuked this channel!")
      .setImage(
        "https://media0.giphy.com/media/Iep1piW2Na91q0gWYX/giphy.gif?cid=9250d758ufwmj4ozj6774o3vi1mdme5xxcv86ylmnj75jwx8&rid=giphy.gif"
      )
      .setFooter("Time Nuked", client.user.displayAvatarURL())

      .setTimestamp();

  await newchannel.send(embed)
  }
};
