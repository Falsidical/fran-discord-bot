const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection, VoiceConnectionStatus } = require('@discordjs/voice');
const play = require('play-dl');

module.exports = {
  data: new SlashCommandBuilder().setName('stop').setDescription('Detiene la reproducion'),
  async execute(interaction) {
    if (!interaction.member.voice.channel) return await interaction.reply('No estas en un canal!');

    const connection = await getVoiceConnection(interaction.guild.id);
    await connection.disconnect();
    //await connection.destroy();

    await interaction.reply(`Reproduccion detenida`);
  },
};
