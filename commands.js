var fs = require('fs'),
    os = require("os")

var commands = {
  cmd_ping: function(command, message){
    console.log("Ping received from: " + message.author.username + "#" + message.author.discriminator);
    message.reply("Pong " + message.guild.id);
	},
  cmd_test: function(commands, message){
    var file = fs.readFileSync('config/servers/' + message.guild.id + '.json', 'utf8')
    //var lineNbr = file.split(/[\r\n]/).map(function (line, l) { if (/(\[roles\])+/g.test(line)){ return l + 1 } })

    console.log('test');
    // processInput('config/servers/' + message.guild.id + '.json', "testligne" , lineNbr)
  }
}

module.exports = commands;
