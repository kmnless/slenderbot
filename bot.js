const { Client, GatewayIntentBits } = require('discord.js');
const { toZonedTime, fromZonedTime } = require('date-fns-tz');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
    presence: { status: 'idle' },
});

const TOKEN = '';
const GUILD_ID = '732194449664376883';
const USER_ID = '360458101184528384';
const TIMEZONE = 'Europe/Kiev';
const START_DATE = new Date('2025-02-25T00:00:00');

client.once('ready', () => {
    process.stdout.write(`Bot ${client.user.tag} started\n`);
    changeNickname();
    scheduleNextChange();
});

async function changeNickname() {
    try {
        const guild = client.guilds.cache.get(GUILD_ID);
        if (!guild) return;

        const member = await guild.members.fetch(USER_ID, { cache: true, force: false });
        if (!member) return;

        const dayCounter = calculateDayCounter();
        const newNick = `день ${dayCounter} жду слендермена в дбд`;
        await member.setNickname(newNick);
        process.stdout.write(`nickname changed: ${newNick}\n`);
        scheduleNextChange();
    } catch (error) {
        if (error.code !== 50013) process.stderr.write(`Error: ${error.message}\n`);
    }
}

function calculateDayCounter() {
    const now = toZonedTime(new Date(), TIMEZONE);
    const start = toZonedTime(START_DATE, TIMEZONE);
    const diffMs = now - start;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return Math.max(diffDays + 1, 1);
}

function scheduleNextChange() {
    const now = new Date();
    const zonedNow = toZonedTime(now, TIMEZONE);
    const nextMidnight = new Date(zonedNow);
    nextMidnight.setHours(24, 0, 0, 0);
    const nextMidnightUtc = fromZonedTime(nextMidnight, TIMEZONE);

    const timeToNext = nextMidnightUtc - now;
    setTimeout(() => {
        changeNickname();
    }, timeToNext);
}

client.login(TOKEN).catch((err) => process.stderr.write(`Login failed: ${err.message}\n`));
