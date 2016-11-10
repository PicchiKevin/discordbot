var commands = {
  cmd_ping: function(message){
    console.log("Ping received from: " + message.author.username + "#" + message.author.discriminator);
    message.reply("pong");
  }
}

module.exports = commands;
