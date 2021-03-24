const db = require("quick.db");
const Discord = require("discord.js");
const client = new Discord.Client();
const { CanvasSenpai } = require("canvas-senpai");
const canva = new CanvasSenpai();

module.exports.run = async (client, member) => {
  let chx = db.get(`welchannel_${member.guild.id}`);

  if (chx === null) {
    return;
  }

  let data = await canva.welcome(member, { link: "https://wallpapercave.com/wp/wp5128415.jpg" })
 
    const attachment = new Discord.MessageAttachment(
      data,
      "welcome-image.png"
    )
 
    .channel.send(
      `Welcome to the server, ${member.user.username}!`,
      attachment
      )}