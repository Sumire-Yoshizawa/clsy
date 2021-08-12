const  Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "unban",

  category: "moderation",

  description: "unban anyone with one shot whithout knowing anyone xD",

  usage: "unban <@user>",

  cooldown: 10000,

  botPermission: ["BAN_MEMBERS"],


  run: async (client, message, args) => {
    message.delete();

    // const user = message.mentions.members.first();

    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel

        .send("you dont have permession to use this command!")

        .then(m => m.delete({ timeout: 5000 }));

    if (!args[0])
      return message.channel

        .send("please enter a users id to unban!")

        .then(m => m.delete({ timeout: 5000 }));

    let member;

    try {
      member = await client.users.fetch(args[0]);
    } catch (e) {
      console.log(e);

      return message.channel

        .send("Not a valid user!")

        .then(m => m.delete({ timeout: 5000 }));
    }

    const reason = args[1] ? args.slice(1).join(" ") : "Unspecified";

    const embed = new MessageEmbed()

    message.guild

      .fetchBans()

      .then(bans => {
        const user = bans.find(ban => ban.user.id === member.id);
        
        if (user) {
          embed

            .setTitle(`Successfully Unbanned ${user.user.tag}`)
            
            .setColor("#00ff00")

            .addField("User ID", user.user.id, true)

            .addField("User Tag", user.user.tag, true)

            .addField(
              "Banned Reason:",

              user.reason != null ? user.reason : reason
            )
            .setFooter(
              `${message.author.tag} | ${message.author.id}`,
              
              message.author.displayAvatarURL({ dynamic: true })
              
            );

          message.guild.members

            .unban(user.user.id, reason)
            .then(() => message.channel.send(embed)).then(m => m.delete({ timeout: 5000 }));
        } else {
          embed

            .setTitle(`User ${member.tag} isn't banned!`)

            .setColor("#ff0000");
            
         
          message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))
            
            
        }
        
      })

      .catch(e => {
        console.log(e);

        message.channel.send("error : "  + (e)).then(m => m.delete({ timeout: 5000 }));
      });
      
  }
};
