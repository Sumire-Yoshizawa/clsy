const { token } = require("./config.json");
const discord = require("discord.js");
const db = require("quick.db");
const { default_prefix } = require("./config.json");
const client = new discord.Client({
  disableEveryone: true
});

//Commands
client.on("message", message => {

  if (message.author.bot) return false;

  if (
    message.content.includes("@here") ||
    message.content.includes("@everyone")
  )
    return false;
  if (message.mentions.has(client.user.id)) {
    message.channel.send("Hello there, my default prefix is `!`");
  }

});
//prefix


client.commands = new discord.Collection();
client.aliases = new discord.Collection();

["command", "events"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.login(token);
