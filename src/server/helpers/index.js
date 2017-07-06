

module.exports = {

    isValid: (urls,pair) => {
        return urls[pair] || null;
    },

    // Helper function for getting a worker index based on IP address.
    // This is a hot path so it should be really fast. The way it works
    // is by converting the IP address to a number by removing non numeric
    // characters, then compressing it to the number of slots we have.
    //
    // Compared against "real" hashing (from the sticky-session code) and
    // "real" IP number conversion, this function is on par in terms of
    // worker index distribution only much faster.

     worker_index: (ip, len) => {
        var s = '';
        for (var i = 0, _len = ip.length; i < _len; i++) {
            if (!isNaN(ip[i])) {
                s += ip[i];
            }
        }

        return Number(s) % len;
    },

    //
    //

    serverListensToMessage: server =>  (message, connection) => {

        if (message !== 'sticky-session:connection') return;
        // Emulate a connection event on the server by emitting the event with the connection the master sent us.

        server.emit('connection', connection);
        connection.resume();
    }
}