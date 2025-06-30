async function handleRollCommand(interaction) {
    let min = 1;
    let max = 100;

    const args = interaction.options.getString('range');
    if (args) {
        const values = args.trim().split(/\s+/).map(Number).filter((num) => !isNaN(num));

        if (values.length === 1) {
            max = values[0];
        } else if (values.length === 2) {
            min = Math.min(values[0], values[1]);
            max = Math.max(values[0], values[1]);
        }
    }

    if (min >= max) {
        return interaction.reply({ content: 'DOLBOEB!! Min > Max', ephemeral: true });
    }

    const rollResult = Math.floor(Math.random() * (max - min + 1)) + min;
    await interaction.reply(`🎲 **${interaction.user.username} rolled:** ${rollResult} (range: ${min} - ${max})`);
}

module.exports = { handleRollCommand };
