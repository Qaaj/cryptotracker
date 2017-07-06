const port = process.env.PORT || 3001;
const num_processes = 2; // require('os').cpus().length;
const cluster = require('cluster');
const net = require('net');

const {worker_index} = require('../helpers');
const {SocketService} = require('./socket');


module.exports = {

    master: (client) => {

        const service = new SocketService(client);
        const workers = [];

        const messageFromWorker = (worker) => (message) => {
            const { msg, socket } = message;
            if(msg === "socket:connect")     service.socketConnected(socket);
            if(msg === "socket:disconnect")  service.socketDisonnected(socket);
        }

        const workerDied = (worker,i) => (code, signal) => {
            console.log('respawning worker', worker);
            spawn(i);
        }

        const spawn = (i) => {
            const worker = cluster.fork();
            workers[i] = worker;
            worker.on('message', messageFromWorker(worker));
            worker.on('exit', workerDied(worker,i));
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