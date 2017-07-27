const pairs = require('./pairs');
const ssr = require('./ssr');
const etherdelta = require('./etherdelta');

module.exports = (client) => {
    return {
        CurrencyPairs: pairs(client),
        SSR: ssr(client),
        EtherDelta: etherdelta(client)
    }
};