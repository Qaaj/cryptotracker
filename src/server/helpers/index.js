

module.exports = {

    // Helper function for getting a worker index based on IP address.

     worker_index: (ip, len) => {
        var s = '';
        for (var i = 0, _len = ip.length; i < _len; i++) {
            if (!isNaN(ip[i])) {
                s += ip[i];
            }
        }

        return Number(s) % len;
    },

    // Emulate a connection event on the server by emitting the event with the connection the master sent us.

    serverListensToMessage: server =>  (message, connection) => {
        if (message !== 'sticky-session:connection') return;
        server.emit('connection', connection);
        connection.resume();
    }
}