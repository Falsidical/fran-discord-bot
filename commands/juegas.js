const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('juegas').setDescription('Pregunta si juega virus'),
  async execute(interaction) {
    await interaction.reply('no puedo');
  },
};
