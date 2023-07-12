var express = require('express');
require('dotenv').config();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

var app = express();

  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    //res.setHeader('Content-Type: application/json');
    next();
  });

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

app.use(cors(corsOptions));

app.get('/', function(req, res){
    res.sendStatus(200);
});

app.get('/currencies', async (req, res) => { 
    //console.log('in currency endpoint');
     const exchangeRates = await fetch('https://openexchangerates.org/api/latest.json?app_id=' + process.env.OPEN_EXCHANGE_KEY)
        .then((response) => response.json());
    //console.log(exchangeRates);
    res.send(exchangeRates);
});

app.get('/country/:capitalCity', async (req, res) => {
    const capitalCityWeather = await fetch('http://api.weatherapi.com/v1/current.json?&q=' + req.params.capitalCity + '&key=' + process.env.WEATHER_API_KEY)
        .then((response) => response.json());
    res.send(capitalCityWeather);
});

app.get('/:country', async (req, res) => {
    //console.log('country endpoint');
    const searchCountry = await fetch('https://restcountries.com/v3.1/name/' + req.params.country)
        .then((response) => response.json());
    res.send(searchCountry);
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});