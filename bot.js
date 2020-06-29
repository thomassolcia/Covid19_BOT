require("dotenv").config();
const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const client = new Discord.Client();
const config1 = require("./config.json");
const config = require("./config.js");
client.config = config;
const fetch = require("node-fetch");
const twit=require('twit');
const { reverse } = require("dns");
const T = new twit(config)
const stream = T.stream('statuses/filter', { track: ['@Brazil_Covid19'] });

var a = new Date();
var b = new Date();
var c = new Date();

console.log('Buscando informações sobre o COVID...')
fetch(`https://corona.lmao.ninja/v2/countries/br`)
    .then(res => res.json())
    .then(data1 => {
      let casos = data1.cases.toLocaleString();
      let casosHoje = data1.todayCases.toLocaleString();
      let mortes = data1.deaths.toLocaleString();
      let mortesHoje = data1.todayDeaths.toLocaleString();
      let recuperados = data1.recovered.toLocaleString();
      let emRisco = data1.critical.toLocaleString();
      let mortesM = data1.deathsPerOneMillion.toLocaleString();
      let casosM = data1.casesPerOneMillion.toLocaleString();
      let testesM = data1.testsPerOneMillion.toLocaleString();
      let ativos = data1.active.toLocaleString();

    covid_brasil = (`Confirmados: (Total: ${casos} | Hoje: +${casosHoje})
Mortes: (Total: ${mortes} | Hoje: +${mortesHoje})
Recuperados: ${recuperados}
Em Risco: ${emRisco}
Ativos: ${ativos}

Testes/1Mi: ${testesM}
Casos/1Mi: ${casosM}
Mortes/1Mi: ${mortesM}

Atualizados: ${c.getDate()}.0${b.getMonth()+1}.${a.getFullYear()}

#covid #covid19 #brasil #corona #coronavirus`)

      T.post(
        'statuses/update',
        { status: covid_brasil },
        (err, data, response) => {
        console.log(err, data, response);
        }
      )
    });
console.log('Criando um tweet com as informações obtidas...')

client.on('ready', () => {
  setInterval(() => {
    console.log('Buscando informações sobre o COVID...')
    fetch(`https://corona.lmao.ninja/v2/countries/br`)
    .then(res => res.json())
    .then(data1 => {
      let casos = data1.cases.toLocaleString();
      let casosHoje = data1.todayCases.toLocaleString();
      let mortes = data1.deaths.toLocaleString();
      let mortesHoje = data1.todayDeaths.toLocaleString();
      let recuperados = data1.recovered.toLocaleString();
      let emRisco = data1.critical.toLocaleString();
      let mortesM = data1.deathsPerOneMillion.toLocaleString();
      let casosM = data1.casesPerOneMillion.toLocaleString();
      let testesM = data1.testsPerOneMillion.toLocaleString();
      let ativos = data1.active.toLocaleString();

    covid_brasil = (`Confirmados: (Total: ${casos} | Hoje: +${casosHoje})
Mortes: (Total: ${mortes} | Hoje: +${mortesHoje})
Recuperados: ${recuperados}
Em Risco: ${emRisco}
Ativos: ${ativos}

Testes/1Mi: ${testesM}
Casos/1Mi: ${casosM}
Mortes/1Mi: ${mortesM}

Atualizados: ${c.getDate()}.0${b.getMonth()+1}.${a.getFullYear()}

#covid #covid19 #brasil #corona #coronavirus`)

      T.post(
        'statuses/update',
        { status: covid_brasil },
        (err, data, response) => {
        console.log(err, data, response);
        }
      )
      console.log('Criando um tweet com as informações obtidas...')
    });
  }, 28800000);
});

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
    });
  });
client.login(config1.token);