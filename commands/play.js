const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
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
    if (!interaction.member.voice.channel) return await interaction.reply('No estas en un canal!');

    const connection = joinVoiceChannel({
      channelId: interaction.member.voice.channel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });

    const song = interaction.options.getString('song');
    await interaction.reply(`Buscando ${song}`);

    let yt_info = await play.search(song, {
      limit: 1,
    });

    const embed = new EmbedBuilder()
      .setTitle('Reproduciendo')
      .setDescription(`**[${yt_info[0].title}](${yt_info[0].url})**`)
      .setThumbnail(yt_info[0].thumbnails[0].url)
      .setFooter({ text: `Duracion: ${yt_info[0].durationRaw}` });

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
    await interaction.editReply({ embeds: [embed] });
  },
};
