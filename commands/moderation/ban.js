const Discord = require("discord.js");

module.exports = {
  name: "ban",
  category: "moderation",
  description: "Ban anyone with one shot whithout knowing anyone xD",
  usage: "ban <@user> <reason>",
  cooldown: 50000,
  botPermission: ["BAN_MEMBERS"],
  async run(client, message, args) {
    message.delete();
    const user = message.mentions.members.first();
    if (!message.guild.me.hasPermission("BAN_MEMBERS"))
      return message.channel
        .send("I don't have the right permissions.")
        .then(message => {
          message.delete({ timeout: 5000 });
        })
        .catch(O_o => {});

    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!args[0])
      return message.channel
        .send("Please specify a user")
        .then(message => {
          message.delete({ timeout: 5000 });
        })
        .catch(O_o => {});

    if (!member)
      return message.channel
        .send("Can't seem to find this user. Sorry 'bout that :/")
        .then(message => {
          message.delete({ timeout: 5000 });
        })
        .catch(O_o => {});

    if (!member.bannable)
      return message.channel
        .send(
          "This user can't be banned. It is either because they are a mod/admin, or their highest role is higher than mine"
        )
        .then(message => {
          message.delete({ timeout: 5000 });
        })
        .catch(O_o => {});

    if (member.id === message.author.id)
      return message.channel
        .send("Bruh, you can't ban yourself!")
        .then(message => {
          message.delete({ timeout: 5000 });
        })
        .catch(O_o => {});

    let banReason = args.slice(1).join(" ");

    if (!banReason) banReason = "Unspecified";

    member
      .ban({ reason: banReason })

      .catch(err => {
        if (err) return message.channel.send("Something went wrong +" (err)).then(m => m.delete({ timeout: 5000 }));
      });

    const banembed = new Discord.MessageEmbed()
      .setColor("RANDOM")

      .setTitle("Member Banned")

      .setThumbnail(member.user.displayAvatarURL())

      .addField("User ID", member.id, true)

      .addField("User Banned", member)

      .addField("Banned by", message.author)

      .addField("Reason", banReason)

      .setFooter("Time Banned", member.user.displayAvatarURL())

      .setTimestamp();

    message.channel.send(banembed).then(m => m.delete({ timeout: 10000 }));
    
  }
};
