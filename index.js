const { token } = require("./config.json");
const discord = require("discord.js");
const db = require("quick.db");
const { default_prefix } = require("./config.json");
const client = new discord.Client({
  disableEveryone: true
});

//Commands

client.on("message", message => {
  client.on("message", async message => {
    if (message.author.bot) return;

    let prefix = await db.get(`prefix_${message.guild.id}`);

    if (prefix === null) prefix = default_prefix;

    if (
      message.content.includes("@here") ||
      message.content.includes("@everyone")
    )
      return false;
 
  });
});
//prefix
client.commands = new discord.Collection();
client.aliases = new discord.Collection();

["command", "events"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.login(token);
