require('babel-register');

const os = require('os');
const cluster = require('cluster');
const redis = require('redis');
const bluebird = require('bluebird');
const adapter = require('socket.io-redis');

bluebird.promisifyAll(redis.RedisClient.prototype);

const redis_url = process.env.REDIS_URL || 'redis://localhost:6379';

const client = redis.createClient(redis_url);

if (cluster.isMaster) {
    for (let i = 0; i < (process.env.NODE_ENV === 'production' ? os.cpus().length : 2); i++) {
        cluster.fork();
    }
} else {
    const redis_io = adapter(redis_url);
    require('./worker')(client,redis_io)
}

client.on("error", console.error);