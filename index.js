const Discord = require('discord.js'),
      util = require('util'),
      client = new Discord.Client()

var   reload = require('require-reload'),
      fs = require('fs'),
      ini = require('ini'),
      jsonfile = require('jsonfile'),
      commands = reload('./commands.js')

var   config = ini.parse(fs.readFileSync('config/settings.ini', 'utf-8')) //Read config files with multiple secret things

client.on('ready', () => {
  console.log('[~~~] Bot is ready !')
});

client.on('guildCreate', (guild) => {
  if (!fs.existsSync(guild.id)) {
    fs.readFile('config/servers/template.json', 'utf8', function (err,data) {
      if (err) return console.log('[err] ' + err)
      fs.writeFile('config/servers/' + guild.id + '.json', data, function(err) {
        if (err) return console.log('[err] ' + err)
        console.log("[+++] Bot joined '"+guild.name+"' <"+guild.id+">")
      });
    });
  }
});

client.on('message', message => {


  var command = message.content
  if (command.startsWith(config.appdetails.commandStart)){
    command = command.replace(/\n|\r\n|\r/g, '').split(' ')
    command[0] = command[0].replace("!","") // just for making things tidy
    console.log("[~~~] " + message.author.username + " issued command " + command[0]);

    if (typeof commands['cmd_' + command[0]] === 'function'){
      // console.log(message.guild.id + "  " + message.author.id + "  "  + 'cmd_' + command[0]);
      var havePerms = false;

      jsonfile.readFile('config/servers/' + message.guild.id + '.json', function(err, obj) {
        if (typeof obj.users[message.author.id] !== 'undefined'){
          for (var i = 0; i < obj.users[message.author.id].length; i++) {
            console.log(obj.users[message.author.id][i] + " " + command[0]);
            if(obj.users[message.author.id][i] == command[0]){
               commands['cmd_' + command[0]](command, message)
            }
          }
        }
      })


    }else if (commands[0] == "reload") {
      try{ commands = reload('./commands.js') }
      catch (e) { console.error("[ERR] Failed to reload commands.js! Error: ", e) }
      console.log("reloaded");
    }
  }
});

// client.on('debug', (message) => console.log(message));


client.login(config.appdetails.secret)
