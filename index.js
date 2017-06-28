var express = require('express');
var app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send("polle is ne tettenkop");
})

app.get('/EUR', function (req, res) {
    var request = require('request');
    request('https://ethereumprice.org/api/pairs/?p=eur', function (error, response, body) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({price: body}));
    });
})

app.get('/USD', function (req, res) {
    var request = require('request');
    request('https://ethereumprice.org/api/pairs/?p=usd', function (error, response, body) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({price: body}));
    });
})

app.get('/USD2', function (req, res) {
    var request = require('request');
    request('https://ethereumprice.org/wp-content/themes/theme/inc/exchanges/price-data.php?coin=eth&cur=ethusd&ex=waex&dec=2', function (error, response, body) {
        res.setHeader('Content-Type', 'application/json');
        res.send(body);
    });
})
app.get('/EUR2', function (req, res) {
    var request = require('request');
    request('https://ethereumprice.org/wp-content/themes/theme/inc/exchanges/price-data.php?coin=eth&cur=ethusd&ex=waex&dec=2', function (error, response, body) {
        res.setHeader('Content-Type', 'application/json');
        res.send(body);
    });
})

app.get('/EUR_HIS', function (req, res) {
    var request = require('request');
    request('https://ethereumprice.org/wp-content/themes/theme/inc/exchanges/json.php?cur=etheur&ex=waex', function (error, response, body) {
        res.setHeader('Content-Type', 'application/json');
        res.send(body);
    });
})

app.get('/USD_HIS', function (req, res) {
    var request = require('request');
    request('https://ethereumprice.org/wp-content/themes/theme/inc/exchanges/json.php?cur=ethusd&ex=waex', function (error, response, body) {
        res.setHeader('Content-Type', 'application/json');
        res.send(body);
    });
})

app.listen(process.env.PORT || 3000, function () {
})