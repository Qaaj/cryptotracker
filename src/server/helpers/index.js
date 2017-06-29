module.exports = {
    checkRedis: client => pair => new Promise((ok, nok) => {
        console.log("Checking: " + pair);
        client.get(pair, (err, value) => {
            if (value) {
                console.log("Fetching " + pair + ' from REDIS');
                ok(value)
            } else {
                ok(false);
            }
        });
    }),
    isValid: urls => pair => {
        return urls[pair] || null;
    }
}