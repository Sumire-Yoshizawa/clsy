const discord = require("discord.js");

module.exports = {
  name: "kick",
  category: "moderation",
  description: "Kick anyone with one shot xD",
  usage: "kick <@user> <reason>",
  run: (client, message, args, storage) => {
    message.delete();

    let kicked =
      message.mentions.users.first() || client.users.resolve(args[0]);

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "Unspecified";
    //don't have prems

    if (!message.member.hasPermission("KICK_MEMBERS"))
      return message.channel
        .send("You do not have permissions to use this command")
        .then(message => message.delete({ timeout: 3000 }));

    // MESSAGES

    if (!kicked) {
      let kickinfoembed = new discord.MessageEmbed()

        .setDescription("pls mention user who want to you kick")
        .setColor("RAMDOM");

      message.channel
        .send(kickinfoembed)
        .then(message => message.delete({ timeout: 5000 }));

      return;
    }

    if (message.author === kicked) {
      let sanctionyourselfembed = new discord.MessageEmbed()

        .setDescription(`You cannot sanction yourself`)

        .setColor("RANDOM");

      message.channel
        .send(sanctionyourselfembed)
        .then(message => message.delete({ timeout: 3000 }));

      return;
    }

    if (!reason) {
      let noreasonembed = new discord.MessageEmbed()

        .setDescription(`Enter a reason`)

        .setColor("RAMDOM");

      message.channel
        .send(noreasonembed)
        .then(message => message.delete({ timeout: 3000 }));

      return;
    }

    if (!message.member.permissions.has("KICK_MEMBERS")) {
      let nopermsembed = new discord.MessageEmbed()

        .setDescription(
          "You do not have permission `KICK MEMBERS` contact an administrator"
        )

        .setColor("RANDOM");

      message.channel.send(nopermsembed).then(message => message.delete({ timeout: 3000 }));

      return;
    }

    if (!message.guild.me.permissions.has("KICK_MEMBERS")) {
      let botnopermsembed = new discord.MessageEmbed()

        .setDescription(
          "I do not have `KICK MEMBERS` permission, please contact an administrator"
        )

        .setColor("RAMDOM");

      message.channel
        .send(botnopermsembed)
        .then(m => m.delete({ timeout: 3000 }));

      return;
    }

    message.guild
      .member(kicked)
      .kick(reason)
      .then(message => message.delete({ timeout: 3000 }));

    let successfullyembed = new discord.MessageEmbed()

      .setDescription(`${kicked.tag} has been successfully kicked.`)

      .setColor("RAMDOM");

    message.channel
      .send(successfullyembed)
      .then(m => m.delete({ timeout: 3000 }));
  }
};
