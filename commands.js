var fs = require('fs'),
    os = require("os"),
    jsonfile = require('jsonfile')

var commands = {
  cmd_ping: function(command, message){
    console.log("Ping received from: " + message.author.username + "#" + message.author.discriminator);
    message.reply("Pong " + message.guild.id);
	},
  cmd_test: function(command, message){
    // var file = fs.readFileSync('config/servers/' + message.guild.id + '.json', 'utf8')
    // //var lineNbr = file.split(/[\r\n]/).map(function (line, l) { if (/(\[roles\])+/g.test(line)){ return l + 1 } })
    //
    // console.log('test');
    // // processInput('config/servers/' + message.guild.id + '.json', "testligne" , lineNbr)
  },
  cmd_info: function(command, message){
    var permissionList = "";
    jsonfile.readFile('config/servers/' + message.guild.id + '.json', function(err, obj) {
      //user
      if (typeof obj.permissions.users[message.author.id] !== 'undefined'){
        for (var i = 0; i < obj.permissions.users[message.author.id].length; i++) {
          permissionList += obj.permissions.users[message.author.id][i]+ " "
        }
      }
      //default
      for (var i = 0; i < obj.permissions.default.length; i++) {
          permissionList += obj.permissions.default[i]+ " "
      }

      var reply = "```\n"+
        "Username: "+ message.author.username+ "#"+ message.author.discriminator+ "\n"+
        "UserID: "+ message.author.id+ "\n"+
        "Server ID: "+ message.guild.id+ "\n"+
        "Permission : "+ permissionList+
        "```";

      message.reply(reply);
    })



  }
}

module.exports = commands;
