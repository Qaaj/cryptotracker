const {getPair, isValid} = require('../helpers');
const {URLS} = require('../conf');

module.exports = (client) => async (ctx) => {

    const {currency, coin, options} = ctx.params;
    const pair = options ? [coin, currency, options].join(':') : [coin, currency].join(':');
    const endpoint = isValid(URLS,pair);

    if (!endpoint) return ctx.body = 'Not a valid request';

    let data = await getPair(client,pair,endpoint);

    ctx.set('Content-Type', 'application/json');
    ctx.body = {currency, coin, data }
};