require('babel-register');

const os = require('os');
const cluster = require('cluster');
const redis = require('redis');
const bluebird = require('bluebird');
const adapter = require('socket.io-redis');
var sticky = require('sticky-session');



bluebird.promisifyAll(redis.RedisClient.prototype);

const redis_url = process.env.REDIS_URL || 'redis://localhost:6379';

const client = redis.createClient(redis_url);
// const cpus = os.cpus().length;



// var server = require('http').createServer(function(req, res) {
//     res.end('worker: ' + cluster.worker.id);
// });
//
// if (!sticky.listen(server, 3000)) {
//     server.once('listening', function() {
//         console.log('server started on 3000 port');
//     });
// } else {
//     const redis_io = adapter(redis_url);
//     require('./worker')(client,redis_io)
// }


if (cluster.isMaster) {
    for (let i = 0; i < (process.env.NODE_ENV === 'production' ? 1 : 1); i++) {
        cluster.fork();
    }
} else {
    const redis_io = adapter(redis_url);
    require('./worker')(client,redis_io)
}

client.on("error", console.error);