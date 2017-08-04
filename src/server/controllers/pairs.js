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
        value = await(request('https://cache1.etherdelta.com/returnTicker'));
        client.set('EtherDelta', JSON.stringify(value), 'EX', REDIS_TIMEOUT);
    }
    return JSON.parse(value);
}

module.exports = {getPair, getEtherDelta}