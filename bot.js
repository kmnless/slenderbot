const { Client, GatewayIntentBits } = require('discord.js');
const { scheduleNextChange } = require('./nicknameChanger');
const { handleRollCommand } = require('./rollCommand');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages],
    presence: { status: 'idle' },
});

const TOKEN = 'MTM0ODU0NTE5MzgxMjU1Nzg2Ng.GmbAU9.Bbm-tSQ8GTN3K2zVWn6eUIwgD-mkQ-CbkN7oFc';

client.once('ready', () => {
    console.log('[INFO] Bot is ready.');
    scheduleNextChange(client);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'roll') {
        await handleRollCommand(interaction);
    }
});

client.login(TOKEN).catch((err) => console.error(`[ERROR] Authorization error: ${err.message}`));
