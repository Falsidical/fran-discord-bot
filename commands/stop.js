const { SlashCommandBuilder } = require('discord.js');
const {
  createAudioPlayer,
  createAudioResource,
  StreamType,
  demuxProbe,
  joinVoiceChannel,
  NoSubscriberBehavior,
  AudioPlayerStatus,
  VoiceConnectionStatus,
  getVoiceConnection,
} = require('@discordjs/voice');
const play = require('play-dl');

module.exports = {
  data: new SlashCommandBuilder().setName('stop').setDescription('Detiene la reproducion'),
  async execute(interaction) {
    if (!interaction.member.voice.channel) return await interaction.reply('No estas en un canal!');

    const connection = getVoiceConnection(myVoiceChannel.guild.id);
    connection.destroy();

    await interaction.reply('Se detuvo la reproducion');
  },
};
