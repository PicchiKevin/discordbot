const Discord = require('discord.js')
var reload = require('require-reload'),
		commands = reload('./commands.js')
var fs = require('fs')
, ini = require('ini')

const client = new Discord.Client()


var config = ini.parse(fs.readFileSync('config/settings.ini', 'utf-8')) //Read config files with multiple secret things

client.on('ready', () => {
  console.log('I am ready!')
});

client.on('message', message => {
  if (typeof commands['cmd_' + message.content] === 'function') { //checking if function exist
    commands['cmd_' + message.content](message)
  }else if(message.content == "reload"){
			try{
			commands = reload('./commands.js')
		} catch (e) {
		console.error("Failed to reload commands.js! Error: ", e);
	}
}
});


client.login(config.appdetails.secret)
