const fs = require('node:fs');
const path = require('node:path');
const { REST, SlashCommandBuilder, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const commands = [];

const rest = new REST({ version: '10' }).setToken(token);

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then((data) => console.log(`Successfully registered ${data.length} application commands.`))
  .catch(console.error);

// * Delete Command by ID
// for guild-based commands
// rest.delete(Routes.applicationGuildCommand(clientId, guildId, 'commandId'))
// .then(() => console.log('Successfully deleted guild command'))
// .catch(console.error);

// for global commands
// rest.delete(Routes.applicationCommand(clientId, 'commandId'))
// .then(() => console.log('Successfully deleted application command'))
// .catch(console.error);

// * Delete All commands
// rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
// 	.then(() => console.log('Successfully deleted all guild commands.'))
// 	.catch(console.error);

// for global commands
// rest.put(Routes.applicationCommands(clientId), { body: [] })
// 	.then(() => console.log('Successfully deleted all application commands.'))
// 	.catch(console.error);
