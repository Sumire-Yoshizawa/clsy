const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name : 'afk',
    description : "set your status to afk",
    category: "misc",
    run : async(client, message, args) => {
      message.delete({ timeout: 10000 });
        if(message.content.length > 120)
         return message.channel
        .send("The reason you're too long")
        .then(message => message.delete({ timeout: 10000 }));
        const content = args.join("")
        //const reason = await db.set(`afk-${message.author.id}+${message.guild.id}`)
        await db.set(`afk-${message.author.id}+${message.guild.id}+${content}`,content)
        const embed = new MessageEmbed()
        //.setDescription(`You have been set to afk \n**Reason :**${content ? content : "AFK"}`)
        .addField("You have been set to afk ", `**Reason : **${content ? content : "AFK"}`, true)
        .setColor("GREEN")
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        //.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true }))
        message.channel.send(embed)                
    }
}