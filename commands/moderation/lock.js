const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "lock",
    description: "lock all channels for antiraid",
    category: "moderation",
    usage: "lock all || lock off",
  
    run: async (client, message, args) => {
        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
      
      if(!message.member.hasPermission('MANAGE_SERVER')) return message.channel.send('You do not have permissions to use this command').then(m => m.delete({ timeout: 10000 })); 
        if (args[0] === 'all') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                }).then(() => {
                    channel.setName(channel.name += `🔒`)
                })
            })
            return message.channel.send('Locked all channels').then(m => m.delete({ timeout: 3000 })); 
        } else if (args[0] === 'off') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: true
                }).then(() => {
                        channel.setName(channel.name.replace('🔒', ''))
                    }
                )
            })
            return message.channel.send('Unlocked all channels').then(m => m.delete({ timeout: 10000 })); 
        }
    }
}