var commands = {
  cmd_ping: function(message){
    console.log("Ping received from: " + message.author.username + "#" + message.author.discriminator);
    message.reply("Pong " + message.guild.id);
	},
  cmd_test: function(message){
    serverConfig = 'config/servers/' + message.guild.id + '.ini'
    serverConfig.test.test = 'testing'
    srvConfig = ini.parse(fs.readFileSync(serverConfig, 'utf-8'))
  }
}

module.exports = commands;
