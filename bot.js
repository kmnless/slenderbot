const { Client, GatewayIntentBits } = require('discord.js');
const { toZonedTime } = require('date-fns-tz');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
    presence: { status: 'idle' },
});

const TOKEN = '';
const GUILD_ID = '732194449664376883';
const USER_ID = '360458101184528384';
const TIMEZONE = 'Europe/Kiev';
const START_DATE = new Date('2025-02-24T00:00:00');

client.once('ready', () => {
    changeNickname();
    scheduleNextChange();
});

async function changeNickname() {
    try {
        const guild = client.guilds.cache.get(GUILD_ID);
        if (!guild) return;

        const member = await guild.members.fetch(USER_ID).catch(() => null);
        if (!member) return;

        const newNick = `день ${calculateDayCounter()} жду слендермена в дбд`;
        await member.setNickname(newNick);
    } catch (error) {
        if (error.code !== 50013) process.stderr.write(`Ошибка: ${error.message}\n`);
    }
}

function calculateDayCounter() {
    return Math.max(
        Math.floor((toZonedTime(new Date(), TIMEZONE) - toZonedTime(START_DATE, TIMEZONE)) / 86400000) + 1,
        1
    );
}

function scheduleNextChange() {
    const now = toZonedTime(new Date(), TIMEZONE);
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0);
    
    setTimeout(() => {
        changeNickname();
        setInterval(changeNickname, 86400000);
    }, nextMidnight - now);
}

client.login(TOKEN).catch((err) => process.stderr.write(`Ошибка авторизации: ${err.message}\n`));
