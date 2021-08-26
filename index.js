const { Client } = require('discord.js');
const client = new Client();
const channel = ""; // abone kanalı id
const log = ""; // abone log kanalı id
const rol = ""; // abone rol id
const size = "1"; // öylesine bunu 1 olarak bırakın ellemeyin bozulur
const yes = ""; // evet emoji id
const no = ""; // hayır emoji id
const admin = ""; // abone sorumlusu id
client.log = (channelID, options) => {
  client.channels.cache.get(channelID).send(options);
};

client.on('ready', async () => console.log('ready'));

client.on('message', async (message) => {
  if (!message.guild) return;
  if (message.channel.id == channel) {
    if (message.attachments.size < size) return;
    if (message.member.roles.cache.has(rol)) return;
    message.react(yes);
    message.react(no);
    var filter = async (reaction, user) => {
      return message.guild.members.cache.get(user.id).roles.cache.has(admin) && !user.bot;
    };
    var collector = message.createReactionCollector(filter, {});
    collector.on('collect', async (reaction, user) => {
      if (reaction._emoji.id == yes) {
        message.reactions.removeAll();
        message.member.roles.add(rol);
        client.log(log, `:star2: **${message.author.tag}** adlı kullanıcıya abone rolü verildi.`);
      } else if (reaction._emoji.id == no) {
        message.reactions.removeAll();
        return client.log(log, `:x: **${message.author.tag}** adlı kullanıcıya abone rolü verilmesi iptal edildi.`);
      }
    });
  } else {
    return;
  }
});

client.login('token');