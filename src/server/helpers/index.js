const request = require('request-promise');
const REDIS_TIMEOUT = 30;

module.exports = {
    getPair:  async(client, pair,endpoint) => {
        let value = await client.getAsync(pair) || await request(endpoint.url);
        client.set(pair, value, 'EX', REDIS_TIMEOUT);
        return endpoint.parser(value);
    },
    isValid: (urls,pair) => {
        return urls[pair] || null;
    }
}