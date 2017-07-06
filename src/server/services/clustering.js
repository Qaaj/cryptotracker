const port = process.env.PORT || 3001;
const num_processes = 4; // require('os').cpus().length;
const cluster = require('cluster');
const net = require('net');

const {worker_index} = require('../helpers');
const { SocketService } = require('./socket');


module.exports = {

    master: () => {

        const service = new SocketService();
        const workers = [];

        const spawn = i => {
            workers[i] = cluster.fork();
            workers[i].on('exit', (code, signal) => {
                console.log('respawning worker', i);
                spawn(i);
            });
        }

        for (var i = 0; i < num_processes; i++) {
            spawn(i)
        }

        // Create outward-facing master server
        net.createServer({pauseOnConnect: true}, connection => {
            // Get worker based on IP
            const worker = workers[worker_index(connection.remoteAddress, num_processes)];
            worker.send('sticky-session:connection', connection);
        }).listen(port);

    }
}