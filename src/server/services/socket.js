const adapter = require('socket.io-redis');
const redis_url = process.env.REDIS_URL || 'redis://redis:6379';
const sio = require('socket.io');
const redis_io = adapter(redis_url);
const cluster = require('cluster');

const {getPair} = require('../controllers/pairs');

const sendPair = async (client,io) => {
    let etheur = await getPair(client,'ETH:EUR');
    let ethusd = await getPair(client,'ETH:USD');
    io.emit('action', {type:'PRICES', data: {etheur, ethusd }});
}


class SocketService {

    constructor(client) {
        this.client = client;
        this.io = require('socket.io')(0);
        this.io.adapter(adapter(redis_url));
        this.activeConnections = {};
    }

    tick() {
        if (Object.keys(this.activeConnections).length > 0) {
            sendPair(this.client,this.io)
        }
    }

    startTicking() {
        this.tick();
        this.intervalID = setInterval(() => this.tick(), 10000);
    }

    stopTicking() {
        console.log("All Sockets disconnected - Stopping Timer.");
        clearInterval(this.intervalID);
    }

    socketConnected(socket) {
        console.log('socket', socket, 'connected')
        this.activeConnections[socket] = new Date().toTimeString();
        this.startTicking();
    }

    socketDisonnected(socket) {
        delete(this.activeConnections[socket]);
        console.log('socket', socket, 'disconnected')
        if (Object.keys(this.activeConnections).length == 0) this.stopTicking();
    }

}

module.exports = {

    SocketService,

    attachSocketIO: server => {

        const io = sio.listen(server);
        io.adapter(redis_io);
        io.set('transports', ['websocket', 'polling']);

        io.on('connection', socket => {
            process.send({msg: 'socket:connect', socket: socket.id});
            socket.on('disconnect', () => {
                process.send({msg: 'socket:disconnect', socket: socket.id});
            });
        });

        // Per worker
        // setInterval(() => io.emit(cluster.worker.id + ':time', new Date().toTimeString()), 10000);
    }
};

