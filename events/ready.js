module.exports = async client => {
    console.log('\n     [STATUS]')
    console.log('\nO BOT JÁ ESTÁ OPERANDO!');
    client.user.setActivity("Twitter | @Brazil_Covid19", { type: "PLAYING" });

}