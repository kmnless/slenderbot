const { SlashCommandBuilder } = require('discord.js');

const rollCommand = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Rolls a random number between the specified range (default: 1-100)')
        .addIntegerOption(option =>
            option.setName('min')
                .setDescription('The minimum number')
                .setMinValue(1)
        )
        .addIntegerOption(option =>
            option.setName('max')
                .setDescription('The maximum number')
                .setMinValue(1)
        ),
    async execute(interaction) {
        let min = interaction.options.getInteger('min');
        let max = interaction.options.getInteger('max');

        if (min !== null && max !== null) {
            if (min > max) {
                return await interaction.reply({ content: 'dolbaeb.', ephemeral: true });
            }
        } else if (min !== null) {
            max = min;
            min = 1;
        } else {
            min = 1;
            max = 100;
        }

        const rollResult = Math.floor(Math.random() * (max - min + 1)) + min;
        await interaction.reply(`Roll(${min} - ${max}): **${rollResult}**`);
    }
};

module.exports = rollCommand;
