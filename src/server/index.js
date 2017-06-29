// require('ignore-styles');
// require('babel-register');

const os = require('os');
const cluster = require('cluster');
const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);

const redis_url = process.env.REDIS_URL || 'redis://localhost:6379';
const client = redis.createClient(redis_url);

if (cluster.isMaster) {
    for (let i = 0; i < (process.env.NODE_ENV === 'production' ? os.cpus().length : 1); i++) {
        cluster.fork();
    }
} else {
    require('./worker')(client)
}

client.on("error", console.error);