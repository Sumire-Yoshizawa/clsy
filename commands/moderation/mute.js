const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "mute",
  description: "Mute anyone who break rules",
  category: "moderation",
  usage: "mute <@mention> <reason>",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send(
        "Sorry but you do not have permission to mute anyone"
      ).then(m => m.delete({ timeout: 5000 }));
    }

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("I do not have permission to manage roles.").then(m => m.delete({ timeout: 5000 }));
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send(
        "Please mention the member to who you want to mute"
      ).then(m => m.delete({ timeout: 5000 }));
    }

    if (user.id === message.author.id) {
      return message.channel.send("I won't mute you -_-").then(m => m.delete({ timeout: 5000 }));
    }

    let reason = args.slice(1).join(" ");

    if (!reason) reason = "Unspecified";

    //TIME TO LET MUTED ROLE

     let muterole = message.guild.roles.cache.find(
      r => r.name.toLowerCase() === "muted");

   if (!muterole) {
      return
        message.channel
          .send("Muted role is not found, attempting to create muted role.")
          .then(m => m.delete({ timeout: 5000 }));}

    if (user.roles.cache.has(muterole)) {
      return message.channel.send("Given User is already muted").then(m => m.delete({ timeout: 5000 }));
    }

    user.roles.add(muterole);

    await message.channel.send(
      `You muted **${
        message.mentions.users.first().username
      }** For \`${reason}\``
    ).then(m => m.delete({ timeout: 10000 }));

    user.send(`You are muted in **${message.guild.name}** For \`${reason}\``);

    //WE ARE DONE HERE
  }
};
