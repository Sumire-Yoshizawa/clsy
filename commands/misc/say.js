const Discord = module.require("discord.js");

module.exports = {
  name: "say",
  category: "misc",
  description: "the bot will follow your message",
  usage: "say <messages>",

 
async run  (client, message, args) {
  if (message.member.hasPermission("MANAGE_MESSAGES")) {
    message.delete();

    const taggedChannel = await message.mentions.channels.first();

    if (taggedChannel) {
      await taggedChannel.send(args.join(" ").replace(taggedChannel, ""));
    } else {
      const saymessage = await args.join(" ");

      if (saymessage.length >= 1) {
        await message.channel.send({
          embed: {
            color: "RANDOM",

            description: saymessage
          }
        });
      } else {
        await message.channel

          .send({
            embed: {
              color: "RANDOM",

              description: "You need to enter a Message!"
            }
          })

          .then(m => m.delete({ timeout: 3000 }));
      }
    }
  } else {
    message.channel

      .send({
        embed: {
          color: "RANDOM",

          description: "You don't have permission to send this message by me!"
        }
      })

      .then(m => m.delete({ timeout: 3000 }));
  }
}
  }