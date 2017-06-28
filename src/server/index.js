const express = require('express');
const app = express();
const request = require('request');
const redis = require('redis');
const redis_url = process.env.REDIS_URL || 'redis://localhost:6379';
const PORT = process.env.PORT || 3001;
const client = redis.createClient(redis_url);

const REDIS_TIMEOUT = 30;

const {URLS} = require('./conf');
const {checkRedis, isValid} = require('./helpers');

const checkPair = checkRedis(client);

client.on("error", console.error);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/:coin/:currency/:options*?', (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    const {currency, coin, options} = req.params;
    const pair = options ? [coin, currency, options].join(':') : [coin, currency].join(':');
    const endpoint = isValid(URLS)(pair) || res.send('Not a valid request');
    const respond = finaliseResponse
    ({currency, coin}) // Options
    (res) // Response Object
    (endpoint.parser); // Parsing for the data in Redis

    checkPair(pair)
        .then(item => respond(item))
        .catch(() => {
            request(endpoint.url, function (error, response, body) {
                client.set(pair, body, 'EX', REDIS_TIMEOUT);
                respond(body);
            });
        })
})


const finaliseResponse = options => res => parser => data => {
    options.data = parser(data);
    res.send(options);
}


app.listen(PORT, () => console.log("Listening on port " + PORT))