const Discord = require('discord.js')
var commands = require('commands.js')
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
  }
});


client.login(config.appdetails.secret)
