const adapter = require('socket.io-redis');
const redis_url = process.env.REDIS_URL || 'redis://localhost:6379';
const sio = require('socket.io');
const redis_io = adapter(redis_url);
const cluster = require('cluster');

class SocketService {

    constructor(){
        this.io = require('socket.io')(0);
        this.io.adapter(adapter(redis_url));
        setInterval(() => this.io.emit('time', new Date().toTimeString()), 5000);
    }

}

module.exports =  {

    SocketService,

    attachSocketIO:  server => {

        const io = sio.listen(server);
        io.adapter(redis_io);
        io.set('transports', ['websocket', 'polling']);

        io.on('connection', socket => {
            console.log('connection on worker',cluster.worker.id,'with socket ID', socket.id);
        });

        // Per worker
        setInterval(() => io.emit(cluster.worker.id + ':time', new Date().toTimeString()), 10000);
    }
};

