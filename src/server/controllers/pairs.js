const request = require('request-promise');
const bluebird = require('bluebird');
const redis = require('redis');

bluebird.promisifyAll(redis.RedisClient.prototype);

const REDIS_TIMEOUT = 20;
const client = redis.createClient(process.env.REDIS_URL || 'redis://localhost:6379');
const {URLS} = require('../conf');


const getPair = async (pair, endpoint) => {

    if (!endpoint) endpoint = URLS[pair];
    let value = await client.getAsync(pair);

    if (!value) {
        value = await request(endpoint.url);
        client.set(pair, value, 'EX', REDIS_TIMEOUT);
    }

    return endpoint.parser(value);
}

module.exports = { getPair }