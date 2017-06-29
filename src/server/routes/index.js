const pairs = require('./pairs');
const ssr = require('./ssr');

module.exports = (client) => {
    return {
        CurrencyPairs: pairs(client),
        SSR: ssr(client)
    }
};