const cluster = require('cluster');
const net = require('net');
const bluebird = require('bluebird');

const redis = require('redis'); bluebird.promisifyAll(redis.RedisClient.prototype);
const redis_url = process.env.REDIS_URL || 'redis://localhost:6379';

const {serverListensToMessage} = require('./helpers');
const {attachSocketIO} = require('./services/socket');

const client = redis.createClient(redis_url);


if (cluster.isMaster) {

    /* Fake Server in the master process that tunnels requests to our workers */
    require('./services/clustering').master(client);

} else {

    const app = require('./worker')(client)
    const server = app.listen(0, 'localhost');

    attachSocketIO(server);
    process.on('message', serverListensToMessage(server));
}

client.on("error", console.error);