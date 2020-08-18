require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const config1 = require("./config.json");
const config = require("./config.js");
client.config = config;
const fetch = require("node-fetch");
const twit = require('twit');
const T = new twit(config)
const cheerio = require('cheerio')
const axios = require('axios')

console.log('Buscando informações sobre o COVID...')
fetch(`https://corona.lmao.ninja/v3/covid-19/countries/br`)
  .then(async res => res.json())
  .then(async data1 => {
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

    if (casosHoje >= 1) {
      statcasosHoje = `+`
    }
    if (mortesHoje >= 1) {
      statmortesHoje = `+`
    }
    if (recuperadosHoje >= 1) {
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

    /*T.post(
      'statuses/update',
      { status: covid_brasil },
      (err, data, response) => {
        console.log(err);
      }
    )*/

    console.log('Tweet criado com sucesso!\n')

    const fetchData = async (url) => {
      const result = await axios.get(url)
      return result.data
    }

    const content = await fetchData(`https://news.google.com/covid19/map?hl=pt-BR&mid=%2Fm%2F015fr&gl=BR&ceid=BR%3Apt-419`)
    const $ = cheerio.load(content)

    $('div.lBwEZb.jgP7Se.BL5WZb.xP6mwf.ENDuKc').each(function () {
      var acontecimenos = $(this).find('.MQsxIb.xTewfe.tXImLc.R7GTQ.keNKEd.keNKEd.VkAdve.GU7x0c.JMJvke.q4atFc > h4 > a').eq(0).text().trim() + '. ';
      var fonte = 'https://news.google.com/' + $(this).find('.MQsxIb.xTewfe.tXImLc.R7GTQ.keNKEd.keNKEd.VkAdve.GU7x0c.JMJvke.q4atFc > a').eq(0).attr('href').trim();
      console.log('\nNóticia: ' + acontecimenos)
      console.log(fonte)

      console.log('Buscando notícias e fazendo a seleção para postagem...')

      T.post(
        'statuses/update',
        { status: `${acontecimenos}\n${fonte}` },
        (err, data, response) => {
          console.log(err);
        }
      )

      console.log('Tweet criado com sucesso!\n')
    });
  });

client.on('ready', () => {
  setInterval(() => {
    var d = new Date();

    console.log('Buscando informações sobre o COVID...')
    fetch(`https://corona.lmao.ninja/v3/covid-19/countries/br`)
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

        if (casosHoje >= 1) {
          statcasosHoje = `+`
        }
        if (mortesHoje >= 1) {
          statmortesHoje = `+`
        }
        if (recuperadosHoje >= 1) {
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
            console.log(err);
          }
        )

        console.log('Tweet criado com sucesso!\n')
      });
  }, 43200000);
  setInterval(async () => {
    const fetchData = async (url) => {
      const result = await axios.get(url)
      return result.data
    }

    const content = await fetchData(`https://news.google.com/covid19/map?hl=pt-BR&mid=%2Fm%2F015fr&gl=BR&ceid=BR%3Apt-419`)
    const $ = cheerio.load(content)

    $('div.lBwEZb.jgP7Se.BL5WZb.xP6mwf.ENDuKc').each(function () {
      var acontecimenos = $(this).find('.MQsxIb.xTewfe.tXImLc.R7GTQ.keNKEd.keNKEd.VkAdve.GU7x0c.JMJvke.q4atFc > h4 > a').eq(0).text().trim() + '. ';
      var fonte = 'https://news.google.com/' + $(this).find('.MQsxIb.xTewfe.tXImLc.R7GTQ.keNKEd.keNKEd.VkAdve.GU7x0c.JMJvke.q4atFc > a').eq(0).attr('href').trim();
      console.log(acontecimenos)
      console.log(fonte)

      console.log('Buscando notícias e fazendo a seleção para postagem...')

      T.post(
        'statuses/update',
        { status: `${acontecimenos}\n${fonte}` },
        (err, data, response) => {
          console.log(err);
        }
      )

      console.log('Tweet criado com sucesso!\n')

    });
  }, 43560000);
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