const { Message, MessageEmbed } = require("discord.js");

const ms = require("ms");

module.exports = {
  name: "tempmute",
  category: "moderation",
  description: "make anyone ~~dead~~ silence in spesipic time",
  usage: "tempmute <@user> <reason>",
 
  run: async (client, message, args) => {
    message.delete();

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel
        .send("You do not have permissions to use this command")
        .then(m => m.delete({ timeout: 5000 }));

    const Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    const time = args[1];

    if (!Member)
      return message.channel
        .send("Member is not found.")
        .then(m => m.delete({ timeout: 5000 }));

    if (!time)
      return message.channel
        .send("Please specify a time.")
        .then(m => m.delete({ timeout: 5000 }));

    const role = message.guild.roles.cache.find(
      role => role.name.toLowerCase() === "muted"
    );

    if (!role) {
      try {
        message.channel
          .send("Muted role is not found, attempting to create muted role.")
          .then(m => m.delete({ timeout: 5000 }));

        let muterole = await message.guild.roles.create({
          data: {
            name: "Muted",

            permissions: []
          }
        });

        message.guild.channels.cache
          .filter(c => c.type === "text")
          .forEach(async (channel, id) => {
            await channel.createOverwrite(muterole, {
              SEND_MESSAGES: false,

              ADD_REACTIONS: false
            });
          });

        message.channel
          .send("Muted role has sucessfully been created.")
          .then(m => m.delete({ timeout: 5000 }));
      } catch (error) {
        console.log(error);
      }
    }

    let role2 = message.guild.roles.cache.find(
      r => r.name.toLowerCase() === "muted"
    );

    if (Member.roles.cache.has(role2.id))
      return message.channel
        .send(`${Member.displayName} has already been muted.`)
        .then(m => m.delete({ timeout: 5000 }));

    await Member.roles.add(role2);

    message.channel
      .send(`${Member.displayName} is now muted for ${time}`)
      .then(m => m.delete({ timeout: 10000 }));

    setTimeout(async () => {
      await Member.roles.remove(role2);

      message.channel
        .send(`${Member.displayName} is now unmuted`)
        .then(message => {
          message.delete({ timeout: 10000 });
        })
        .catch(O_o => {});
    }, ms(time));
  }
};
