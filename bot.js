const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { scheduleNicknameChange } = require('./nicknameChanger');
const rollCommand = require('./rollCommand');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
    presence: { status: 'idle' },
});

const TOKEN = '';

client.commands = new Collection();
client.commands.set(rollCommand.data.name, rollCommand);

client.once('ready', () => {
    console.log('[INFO] Bot is ready.');
    scheduleNicknameChange(client);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (command) {
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(`[ERROR] Command execution failed: ${error.message}`);
            await interaction.reply({ content: 'An error occurred while executing the command.', ephemeral: true });
        }
    }
});

client.login(TOKEN).catch(err => console.error(`[ERROR] Authorization failed: ${err.message}`));
