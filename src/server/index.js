require('babel-register');

const bluebird = require('bluebird');
const redis = require('redis');
const adapter = require('socket.io-redis');

bluebird.promisifyAll(redis.RedisClient.prototype);

const redis_url = process.env.REDIS_URL || 'redis://localhost:6379';
const client = redis.createClient(redis_url);

const cluster = require('cluster'),
    net = require('net'),
    sio = require('socket.io')

const port = process.env.PORT || 3001;
const num_processes =  4; //require('os').cpus().length;

if (cluster.isMaster) {
    // This stores our workers. We need to keep them to be able to reference
    // them based on source IP address. It's also useful for auto-restart,
    // for example.
    var workers = [];

    // Helper function for spawning worker at index 'i'.
    var spawn = function(i) {
        workers[i] = cluster.fork();

        // Optional: Restart worker on exit
        workers[i].on('exit', function(code, signal) {
            console.log('respawning worker', i);
            spawn(i);
        });
    };

    // Spawn workers.
    for (var i = 0; i < num_processes; i++) {
        spawn(i);
    }

    // Helper function for getting a worker index based on IP address.
    // This is a hot path so it should be really fast. The way it works
    // is by converting the IP address to a number by removing non numeric
    // characters, then compressing it to the number of slots we have.
    //
    // Compared against "real" hashing (from the sticky-session code) and
    // "real" IP number conversion, this function is on par in terms of
    // worker index distribution only much faster.

    var worker_index = function(ip, len) {
        var s = '';
        for (var i = 0, _len = ip.length; i < _len; i++) {
            if (!isNaN(ip[i])) {
                s += ip[i];
            }
        }

        return Number(s) % len;
    };

    // Create the outside facing server listening on our port.
    var server = net.createServer({ pauseOnConnect: true }, function(connection) {
        // We received a connection and need to pass it to the appropriate
        // worker. Get the worker for this connection's source IP and pass
        // it the connection.
        var worker = workers[worker_index(connection.remoteAddress, num_processes)];
        worker.send('sticky-session:connection', connection);
    }).listen(port);

    var io = require('socket.io')(0);
    const redis_io = adapter(redis_url);
    io.adapter(redis_io);
    setInterval(() => io.emit('time', new Date().toTimeString()), 5000);

} else {
    // Note we don't use a port here because the master listens on it for us.
    var app = require('./worker')(client)

    var server = app.listen(0, 'localhost');

    const attachIO = (server) =>{

        const redis_io = adapter(redis_url);

        const io = sio.listen(server);

        io.adapter(redis_io);
        io.set('transports', ['websocket', 'polling']);

        setInterval(() => io.emit(cluster.worker.id + ':time', new Date().toTimeString()), 10000);


        io.on('connection', socket => {
            console.log('connection', socket.id);
        });

    }

    attachIO(server);

    // Listen to messages sent from the master. Ignore everything else.
    process.on('message', function(message, connection) {
        if (message !== 'sticky-session:connection') {
            return;
        }

        // Emulate a connection event on the server by emitting the
        // event with the connection the master sent us.
        server.emit('connection', connection);

        connection.resume();
    });
}

client.on("error", console.error);