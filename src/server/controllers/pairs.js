const request = require('request-promise');
const {URLS} = require('../conf');
const REDIS_TIMEOUT = 15;

const getPair = async (client, pair, endpoint) => {

    if (!endpoint) endpoint = URLS[pair];
    let value = await client.getAsync(pair);

    if (!value) {
        value = await request(endpoint.url);
        client.set(pair, value, 'EX', REDIS_TIMEOUT);
    }

    return endpoint.parser(value);
}

const getEtherDelta = async (client) => {

    let value = await client.getAsync('EtherDelta');

    if (!value) {
        console.log('NOT FOUND - FETCHING');
        value = JSON.parse(await(request('https://cache1.etherdelta.com/returnTicker')));
        Object.keys(value).forEach(key => {
            let pair = value[key];
            delete pair.quoteVolume;
            delete pair.baseVolume;
            pair.percentChange = parseInt((pair.percentChange * 100000)) / 100000;
            pair.last = parseInt((pair.last * 1000000000)) / 1000000000;

        })
        value = JSON.stringify(value);
        client.set('EtherDelta', value, 'EX', REDIS_TIMEOUT);
    }
    return JSON.parse(value);
}

module.exports = {getPair, getEtherDelta}