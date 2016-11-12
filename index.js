const Discord = require('discord.js'),
      util = require('util'),
      client = new Discord.Client()

var reload = require('require-reload'),
    fs = require('fs'),
    ini = require('ini'),
    commands = reload('./commands.js')

var config = ini.parse(fs.readFileSync('config/settings.ini', 'utf-8')) //Read config files with multiple secret things



client.on('ready', () => {
  console.log('I am ready!')
});


client.on('guildCreate', (guild) => {
  if (!fs.existsSync(guild.id)) {
    fs.readFile('config/servers/template.ini', 'utf8', function (err,data) {
      if(err) return console.log('[err] ' + err)

      fs.writeFile('config/servers/' + guild.id + '.ini', data, function(err) {
        if(err) return console.log('[err] ' + err)
        console.log("[+++] Bot joined '"+guild.name+"' <"+guild.id+">")
      });

    });
  }
});

client.on('message', message => {
  if (typeof commands['cmd_' + message.content] === 'function') { //checking if function exist
    commands['cmd_' + message.content](message)
  }else if(message.content == "reload"){
    try{ commands = reload('./commands.js') }
    catch (e) { console.error("[ERR] Failed to reload commands.js! Error: ", e) }
  }
});

// client.on('debug', (message) => console.log(message));


client.login(config.appdetails.secret)
