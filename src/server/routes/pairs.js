const {URLS} = require('../conf');
const {getPair} = require('../controllers/pairs');

module.exports = (client) => async (ctx) => {

    const {currency, coin, options} = ctx.params;
    const pair = options ? [coin, currency, options].join(':') : [coin, currency].join(':');

    const endpoint = URLS[pair];
    if (!endpoint) return ctx.body = 'Not a valid request';

    let data = await getPair(client,pair,endpoint);

    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    ctx.set('Content-Type', 'application/json');
    ctx.body = {currency, coin, data }
};