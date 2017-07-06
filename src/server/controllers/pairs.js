const request = require('request-promise');
const {URLS} = require('../conf');
const REDIS_TIMEOUT = 50;

const getPair = async (client, pair, endpoint) => {

    if (!endpoint) endpoint = URLS[pair];
    let value = await client.getAsync(pair);

    if (!value) {
        value = await request(endpoint.url);
        client.set(pair, value, 'EX', REDIS_TIMEOUT);
    }

    return endpoint.parser(value);
}

module.exports = { getPair }