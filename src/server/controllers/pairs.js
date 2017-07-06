const request = require('request-promise');
const REDIS_TIMEOUT = 20;

const bluebird = require('bluebird');
const redis = require('redis'); bluebird.promisifyAll(redis.RedisClient.prototype);
const redis_url = process.env.REDIS_URL || 'redis://localhost:6379';
const client = redis.createClient(redis_url);
const {URLS} = require('../conf');
const {isValid} = require('../helpers');


module.exports = {
    getPair:  async(pair, endpoint) => {

        if(!endpoint) endpoint = isValid(URLS,pair);
        let value = await client.getAsync(pair);

        if(!value) {
            value = await request(endpoint.url);
            client.set(pair, value, 'EX', REDIS_TIMEOUT);
        }
        return endpoint.parser(value);
    },
}