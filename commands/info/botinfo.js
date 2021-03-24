const { MessageEmbed } = require("discord.js");

const os = require("os");

module.exports = {
  name: "botinfo",
  
  description: "view bot information",
  
  category: "info",

  run: async (client, message, args) => {
    const embed = new MessageEmbed()

      .setThumbnail(client.user.displayAvatarURL())

      .setTitle("Bot Stats")

      .setColor("#000000")

      .addFields(
        {
          name: "🌐 Servers",

          value: `Serving ${client.guilds.cache.size} servers.`,

          inline: true
        },

        {
          name: "📺 Channels",

          value: `Serving ${client.channels.cache.size} channels.`,

          inline: true
        },

        {
          name: "👥 Server Users",

          value: `Serving ${client.users.cache.size} users.`,

          inline: true
        },

        {
          name: "⏳ Ping",

          value: `${Math.round(client.ws.ping)}ms`,

          inline: true
        },

        {
          name: "Join Date",

          value: client.user.createdAt,

          inline: true
        },

        {
          name: "Server Info",

          value: `Cores: ${os.cpus().length}`,

          inline: true
        },

        {
          name: "Invite Bot",

          value: `[Click Here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`
        }
      )
      .setFooter(client.user.username, client.user.displayAvatarURL())

    await message.channel.send(embed);
  }
};
