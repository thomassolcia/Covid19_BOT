require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const config1 = require("./config.json");
const config = require("./config.js");
client.config = config;
const fetch = require("node-fetch");
const twit=require('twit');
const T = new twit(config)

console.log('Buscando informações sobre o COVID...')
fetch(`https://corona.lmao.ninja/v2/countries/br`)
    .then(res => res.json())
    .then(data1 => {
      let casos = data1.cases.toLocaleString();
      let mortes = data1.deaths.toLocaleString();
      let mortesHoje = data1.todayDeaths.toLocaleString();
      let recuperados = data1.recovered.toLocaleString();
      let recuperadosHoje = data1.todayRecovered.toLocaleString();
      let emRisco = data1.critical.toLocaleString();
      let mortesM = data1.deathsPerOneMillion.toLocaleString();
      let casosM = data1.casesPerOneMillion.toLocaleString();
      let testesM = data1.testsPerOneMillion.toLocaleString();
      let ativos = data1.active.toLocaleString();
      let casosHoje = data1.todayCases.toLocaleString()  

    statcasosHoje = ''
    statmortesHoje = ''
    statrecuperadosHoje = ''

    if(casosHoje >= 1){
        statcasosHoje = `+`
    }
    if(mortesHoje >= 1){
        statmortesHoje = `+`
    }
    if(recuperadosHoje >= 1){
        statrecuperadosHoje = `+`
    }

    covid_brasil = (`Confirmados: ${casos} (+${casosHoje})
Mortes: ${mortes} (+${mortesHoje})
Recuperados: ${recuperados} (+${recuperadosHoje})
Em Risco: ${emRisco}
Ativos: ${ativos}

Testes/1Mi: ${testesM}
Casos/1Mi: ${casosM}
Mortes/1Mi: ${mortesM}

#covid #brasil #coronavirus #quarentena #pandemia`)

console.log('Criando um tweet com as informações obtidas...')

T.post(
    'statuses/update',
    { status: covid_brasil },
    (err, data, response) => {
    console.log(err, data, response);
    }
  )
  
  console.log('Tweet criado com sucesso!\n')
    });

client.on('ready', () => {
  setInterval(() => {
    var d = new Date();

console.log('Buscando informações sobre o COVID...')
fetch(`https://corona.lmao.ninja/v2/countries/br`)
    .then(res => res.json())
    .then(data1 => {
      let casos = data1.cases.toLocaleString();
      let mortes = data1.deaths.toLocaleString();
      let mortesHoje = data1.todayDeaths.toLocaleString();
      let recuperados = data1.recovered.toLocaleString();
      let recuperadosHoje = data1.todayRecovered.toLocaleString();
      let emRisco = data1.critical.toLocaleString();
      let mortesM = data1.deathsPerOneMillion.toLocaleString();
      let casosM = data1.casesPerOneMillion.toLocaleString();
      let testesM = data1.testsPerOneMillion.toLocaleString();
      let ativos = data1.active.toLocaleString();
      let casosHoje = data1.todayCases.toLocaleString()  

    statcasosHoje = ''
    statmortesHoje = ''
    statrecuperadosHoje = ''

    if(casosHoje >= 1){
        statcasosHoje = `+`
    }
    if(mortesHoje >= 1){
        statmortesHoje = `+`
    }
    if(recuperadosHoje >= 1){
        statrecuperadosHoje = `+`
    }
    
    covid_brasil = (`Confirmados: ${casos} (+${casosHoje})
Mortes: ${mortes} (+${mortesHoje})
Recuperados: ${recuperados} (+${recuperadosHoje})
Em Risco: ${emRisco}
Ativos: ${ativos}

Testes/1Mi: ${testesM}
Casos/1Mi: ${casosM}
Mortes/1Mi: ${mortesM}

#covid #brasil #coronavirus #quarentena #pandemia`)

console.log('Criando um tweet com as informações obtidas...')

T.post(
    'statuses/update',
    { status: covid_brasil },
    (err, data, response) => {
    console.log(err, data, response);
    }
  )
  
  console.log('Tweet criado com sucesso!\n')
    });
  }, 43200000);
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