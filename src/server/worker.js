const koa = require('koa');
const app = new koa();
const router = require('koa-router')();
const serve = require('koa-static');

const PORT = process.env.PORT || 3001;

module.exports = (client,redisIO) => {

    const {CurrencyPairs, SSR} = require('./routes')(client);

    router.get('/api/:coin/:currency/:options', CurrencyPairs);
    router.get('/api/:coin/:currency', CurrencyPairs);
    router.get('/', SSR);

    app
    .use(serve('./build/static/'))
    .use(router.routes())
    .use(router.allowedMethods());

    const server = app.listen(PORT, () => console.log("Listening on port " + PORT));


    const sio = require('socket.io');
    const io = sio(server);

    io.adapter(redisIO);

    setInterval(() => io.emit('time', new Date().toTimeString()), 5000);

    io.on('connection', socket => {
        console.log('connection', socket.id);
    });


}