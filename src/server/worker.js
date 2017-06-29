const koa = require('koa');
const app = new koa();
const router = require('koa-router')();
const serve = require('koa-static');

const PORT = process.env.PORT || 3001;

module.exports = (client) => {

    const {CurrencyPairs} = require('./routes')(client);

    router.get('/api/:coin/:currency/:options', CurrencyPairs);
    router.get('/api/:coin/:currency', CurrencyPairs);

    app
    .use(serve('./build/'))
    .use(router.routes())
    .use(router.allowedMethods())
    .use(async (ctx) => {
        ctx.set("Access-Control-Allow-Origin", "*");
        ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    });

    app.listen(PORT, () => console.log("Listening on port " + PORT))
}