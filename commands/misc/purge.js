const Discord = require("discord.js");

const client = new Discord.Client();

module.exports = {
  name: "purge",

  description: "delete messages",

  category: "misc",

  usage: "purge <number>",

  async run(client, message, args) {
    if (message.deletetable) {
      message.delete();
    }

    // Member doesn't have permission

    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel
        .send("You can't delete messages...")
        .then(msg => {
          msg.delete({ timeout: 10000 });
        })

        .catch(console.error);
    }

    // Check if args[0] is a number

    if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
      return message.channel
        .send(
          "Yeah... That's not a number? I also can't delete 0 messages by the way."
        )
        .then(msg => {
          msg.delete({ timeout: 10000 });
        })

        .catch(console.error);
    }

    // Maybe the bot can't delete messages

    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
      return message.channel
        .send("Sorry... I can't delete messages.")
        .then(msg => {
          msg.delete({ timeout: 10000 });
        })

        .catch(console.error);
    }

    let deleteAmount;

    if (parseInt(args[0]) > 100) {
      deleteAmount = 100;
    } else {
      deleteAmount = parseInt(args[0]);
    }
    
    message.channel
      .bulkDelete(deleteAmount, true)()
      .filter(message => !message.pinned).size
      .then(message => {
        message.delete({ timeout: 10000 });
      })

      .catch(err => message.channel.send(`Something went wrong... ${err}`));
  }
};
