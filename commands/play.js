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
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Reproduce musica')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('song')
        .setDescription('Reproduce una cancion de Youtube')
        .addStringOption((option) => option.setName('song').setDescription('Nombre de la cancion').setRequired(true))
    ),
  async execute(interaction) {
    if (!interaction.member.voice.channel) return await interaction.reply('no estas en un canal');

    const connection = joinVoiceChannel({
      channelId: interaction.member.voice.channel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });

    const song = interaction.options.getString('song');

    let yt_info = await play.search(song, {
      limit: 1,
    });

    let stream = await play.stream(yt_info[0].url, {});

    let resource = createAudioResource(stream.stream, {
      inputType: stream.type,
    });

    let player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Play,
      },
    });

    player.play(resource);

    connection.subscribe(player);

    await interaction.reply(`Reproduciendo ${song}`);
  },
};
