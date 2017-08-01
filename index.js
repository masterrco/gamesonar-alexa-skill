var api_secrets = require('dotenv')
api_secrets.load();

var ESPORT_CSGO_API_KEY = process.env.ESPORT_CSGO_API_KEY;
var ESPORT_LOL_API_KEY = process.env.ESPORT_LOL_API_KEY;
var ESPORT_DOTA_API_KEY = process.env.ESPORT_DOTA_API_KEY;

/*
    Load Sport Radar API keys from environmentment variables locally defined in .env
    Get your own Sport Radar API keys to test with at the url below
    https://developer.sportradar.com/
*/

var Alexa = require('alexa-sdk');
var https = require('https')

const EXPECTED_DATE_LENGTH = 10;

var HELP_MESSAGE = "You can say tell me about counter strike, League of Legends, Dota two, or, you can say exit... What can I help you with?";
var HELP_REPROMPT = "What can I help you with?";

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {

  'LaunchRequest': function () {
    this.emit('gameSonarWelcomeIntent');
  },
  'AMAZON.HelpIntent': function () {
    var speechOutput = HELP_MESSAGE;
    var reprompt = HELP_REPROMPT;
    this.emit(':ask', speechOutput, reprompt);
  },

  'gameSonarWelcomeIntent': function () {
    this.emit(':tell', 'Hey There, Welcome to Game Sonar.  You can ask me about E sport match schedules');
    this.emit('AMAZON.HelpIntent');
  },
  'csgoIntent': function () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd<EXPECTED_DATE_LENGTH) {
      dd = '0'+dd
    }

    if(mm<EXPECTED_DATE_LENGTH) {
      mm = '0'+mm
    }
    var qdate = yyyy + '-' + mm + '-' + dd;
    var baseURL = "https://api.sportradar.us/csgo-t1/en/schedules/";
    var targetURL = "/schedule.json?api_key=";
    var endpoint = baseURL + qdate + targetURL + ESPORT_CSGO_API_KEY;
    var body = "";
    var gameCount = 0;
    https.get(endpoint, (response) => {
        response.on('data', (chunk) => { body += chunk })
            response.on('end', () => {
              var data = JSON.parse(body);
              gameCount = data.sport_events.length;
              this.emit(':tell', 'There are ' + gameCount + ' competitive games of Counter Strike Global Offensive scheduled for today');
              })
        })
  },
  'csgoDateIntent': function () {
    var baseURL = "https://api.sportradar.us/csgo-t1/en/schedules/";
    var targetURL = "/schedule.json?api_key=";
    var body = "";
    var gameCount = 0;
    var qdate = this.event.request.intent.slots.QueryDate.value;
    var endpoint = baseURL + qdate + targetURL + ESPORT_CSGO_API_KEY;
    if(qdate.length != EXPECTED_DATE_LENGTH)
    {
      this.emit(':tell', 'I am sorry I can not look of the schedule for that date');
    }
    else {
    https.get(endpoint, (response) => {
        response.on('data', (chunk) => { body += chunk })
            response.on('end', () => {
              var data = JSON.parse(body);
              gameCount = data.sport_events.length;
              this.emit(':tell', 'There are ' + gameCount + ' competitive games of Counter Strike Global Offensive scheduled for '+ qdate);
              })
        })
  }
  },
  'lolIntent': function () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd<EXPECTED_DATE_LENGTH) {
      dd = '0'+dd
    }

    if(mm<EXPECTED_DATE_LENGTH) {
      mm = '0'+mm
    }
    var qdate = yyyy + '-' + mm + '-' + dd;
    var baseURL = "https://api.sportradar.us/lol-t1/en/schedules/";
    var targetURL = "/schedule.json?api_key=";
    var endpoint = baseURL + qdate + targetURL + ESPORT_LOL_API_KEY;
    var body = "";
    var gameCount = 0;
    https.get(endpoint, (response) => {
        response.on('data', (chunk) => { body += chunk })
            response.on('end', () => {
              var data = JSON.parse(body);
              gameCount = data.sport_events.length;
              this.emit(':tell', 'There are ' + gameCount + ' competitive games of League of Legends scheduled for today');
              })
        })
  },
  'lolDateIntent': function () {
    var baseURL = "https://api.sportradar.us/lol-t1/en/schedules/";
    var targetURL = "/schedule.json?api_key=";
    var body = "";
    var gameCount = 0;
    var qdate = this.event.request.intent.slots.QueryDate.value;
    var endpoint = baseURL + qdate + targetURL + ESPORT_LOL_API_KEY;
    if(qdate.length != EXPECTED_DATE_LENGTH)
    {
      this.emit(':tell', 'I am sorry I can not look of the schedule for that date');
    }
    else {
    https.get(endpoint, (response) => {
        response.on('data', (chunk) => { body += chunk })
            response.on('end', () => {
              var data = JSON.parse(body);
              gameCount = data.sport_events.length;
              this.emit(':tell', 'There are ' + gameCount + ' competitive games of League of Legends scheduled for '+ qdate);
              })
        })
  }
  },
  'dotaIntent': function () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd<EXPECTED_DATE_LENGTH) {
      dd = '0'+dd
    }

    if(mm<EXPECTED_DATE_LENGTH) {
      mm = '0'+mm
    }
    var qdate = yyyy + '-' + mm + '-' + dd;
    var baseURL = "https://api.sportradar.us/dota2-t1/en/schedules/";
    var targetURL = "/schedule.json?api_key=";
    var endpoint = baseURL + qdate + targetURL + ESPORT_DOTA_API_KEY;
    var body = "";
    var gameCount = 0;
    https.get(endpoint, (response) => {
        response.on('data', (chunk) => { body += chunk })
            response.on('end', () => {
              var data = JSON.parse(body);
              gameCount = data.sport_events.length;
              this.emit(':tell', 'There are ' + gameCount + ' competitive games of defense of the ancients scheduled for today');
              })
        })
  },
  'dotaDateIntent': function () {
    var baseURL = "https://api.sportradar.us/dota2-t1/en/schedules/";
    var targetURL = "/schedule.json?api_key=";
    var body = "";
    var gameCount = 0;
    var qdate = this.event.request.intent.slots.QueryDate.value;
    var endpoint = baseURL + qdate + targetURL + ESPORT_DOTA_API_KEY;
    if(qdate.length != EXPECTED_DATE_LENGTH)
    {
      this.emit(':tell', 'I am sorry I can not look of the schedule for that date');
    }
    else {
    https.get(endpoint, (response) => {
        response.on('data', (chunk) => { body += chunk })
            response.on('end', () => {
              var data = JSON.parse(body);
              gameCount = data.sport_events.length;
              this.emit(':tell', 'There are ' + gameCount + ' competitive games of defense of the ancients scheduled for '+ qdate);
              })
        })
  }
  }
};
