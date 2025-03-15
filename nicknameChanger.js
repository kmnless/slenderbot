const { toZonedTime } = require('date-fns-tz');

const GUILD_ID = '732194449664376883';
const USER_ID = '360458101184528384';
const TIMEZONE = 'Europe/Kiev';
const START_DATE = new Date('2025-02-24T00:00:00');

async function changeNickname(client) {
    try {
        console.log('[INFO] Starting nickname change process...');

        const guild = client.guilds.cache.get(GUILD_ID);
        if (!guild) {
            console.log('[WARNING] Guild not found. Aborting nickname change.');
            return;
        }

        const member = await guild.members.fetch(USER_ID).catch(() => null);
        if (!member) {
            console.log('[WARNING] Member not found. Aborting nickname change.');
            return;
        }

        const newNick = `день ${calculateDayCounter()} жду слендермена в дбд`;
        await member.setNickname(newNick);
        console.log(`[SUCCESS] Nickname changed to: ${newNick}`);
    } catch (error) {
        if (error.code !== 50013) {
            console.error(`[ERROR] ${error.message}`);
        } else {
            console.log('[WARNING] Missing permissions to change nickname.');
        }
    }
}

function calculateDayCounter() {
    const now = toZonedTime(new Date(), TIMEZONE);
    const startZoned = toZonedTime(START_DATE, TIMEZONE);

    const diff = Math.floor((now - startZoned) / 86400000) + 1;
    return Math.max(diff, 1);
}

function scheduleNextChange(client) {
    console.log('[INFO] Scheduling next nickname change...');
    const now = toZonedTime(new Date(), TIMEZONE);
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0);

    const timeUntilNext = nextMidnight - now;
    console.log(`[INFO] Next nickname change scheduled in ${timeUntilNext} ms.`);

    setTimeout(() => {
        console.log('[INFO] Triggering nickname change at midnight...');
        changeNickname(client);

        setInterval(() => {
            console.log('[INFO] 24 hours passed, attempting to change nickname again.');
            changeNickname(client);
        }, 86400000);
    }, timeUntilNext);
}

module.exports = { scheduleNextChange };
