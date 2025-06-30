const { Client, GatewayIntentBits } = require('discord.js');
const { scheduleNextChange, changeNickname } = require('./nicknameChanger');
const { handleRollCommand } = require('./rollCommand');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages],
    presence: { status: 'idle' },
});

const TOKEN = '';

client.once('ready', async () => {
    console.log('[INFO] Bot is ready.');
    await changeNickname(client);
    scheduleNextChange(client);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'roll') {
        await handleRollCommand(interaction);
    }
});

client.login(TOKEN).catch((err) => console.error(`[ERROR] Authorization error: ${err.message}`));
