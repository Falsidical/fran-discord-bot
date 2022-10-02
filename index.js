const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const respuestas = ['No', 'No puedo', 'Estoy con mi polola', 'Estoy en valorant', 'Hoy no puedo', 'otro dia', 'uwu'];

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent],
  partials: ['CHANNEL', 'MESSAGE'],
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

client.once('ready', (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  c.user.setActivity('VALORANT');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;
  if (message.content === 'virus juegas' || message.content === 'nico juegas') {
    const random = Math.floor(Math.random() * respuestas.length);
    message.reply(respuestas[random]);
  }
});

client.login(token);
