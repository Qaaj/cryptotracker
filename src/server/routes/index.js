const pairs = require('./pairs');

module.exports = (client) => {
    return {
        CurrencyPairs: pairs(client)
    }
};