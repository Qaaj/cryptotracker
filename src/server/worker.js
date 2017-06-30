const koa = require('koa');
const app = new koa();
const router = require('koa-router')();
const serve = require('koa-static');

const PORT = process.env.PORT || 3001;

module.exports = (client) => {

    const {CurrencyPairs, SSR} = require('./routes')(client);

    router.get('/api/:coin/:currency/:options', CurrencyPairs);
    router.get('/api/:coin/:currency', CurrencyPairs);
    router.get('/SSR', SSR);

    app
    .use(serve('./build/'))
    .use(router.routes())
    .use(router.allowedMethods());


    app.listen(PORT, () => console.log("Listening on port " + PORT))
}