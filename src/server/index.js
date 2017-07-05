require('babel-register');

const os = require('os');
const cluster = require('cluster');
const redis = require('redis');
const bluebird = require('bluebird');
const redisIO = require('socket.io-redis');

bluebird.promisifyAll(redis.RedisClient.prototype);

const redis_url = process.env.REDIS_URL || 'redis://localhost:6379';

const client = redis.createClient(redis_url);

if (cluster.isMaster) {
    for (let i = 0; i < (process.env.NODE_ENV === 'production' ? os.cpus().length : 4); i++) {
        cluster.fork();
    }
} else {
    const redis_io = redisIO({ host: client.options.host, port: client.options.port });
    require('./worker')(client,redis_io)
}

client.on("error", console.error);