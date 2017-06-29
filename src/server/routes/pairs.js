const {checkRedis, isValid} = require('../helpers');
const {URLS} = require('../conf');
const REDIS_TIMEOUT = 30;
const request = require('request-promise');

module.exports = (client) => async (ctx) => {

    ctx.set('Content-Type', 'application/json');

    const checkPair = checkRedis(client);
    const {currency, coin, options} = ctx.params;
    const pair = options ? [coin, currency, options].join(':') : [coin, currency].join(':');

    const endpoint = isValid(URLS)(pair);
    if (!endpoint) return ctx.body = 'Not a valid request';

    let data = await checkPair(pair);

    if (!data) {
        data = await request(endpoint.url)
        client.set(pair, data, 'EX', REDIS_TIMEOUT);
    }

    ctx.body = {currency, coin, data: endpoint.parser(data)}
};