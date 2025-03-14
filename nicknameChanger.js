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

        const newNick = `day ${calculateDayCounter()} waiting for Slenderman in DBD`;
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
    return Math.max(Math.floor((now - startZoned) / 86400000) + 1, 1);
}

function scheduleNicknameChange(client) {
    console.log('[INFO] Scheduling nickname change...');
    changeNickname(client);

    setInterval(() => {
        console.log('[INFO] 24 hours passed, attempting to change nickname again.');
        changeNickname(client);
    }, 86400000);
}

module.exports = { scheduleNicknameChange };
