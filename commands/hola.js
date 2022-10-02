const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('hola').setDescription('Saluda a virus!'),
  async execute(interaction) {
    await interaction.reply('Buenas!');
  },
};
