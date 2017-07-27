const koa = require('koa');
const app = new koa();
const router = require('koa-router')();
const serve = require('koa-static');

module.exports = (client) => {

    const {CurrencyPairs, SSR, EtherDelta} = require('./routes')(client);

    router.get('/api/:coin/:currency/:options', CurrencyPairs);
    router.get('/api/:coin/:currency', CurrencyPairs);
    router.get('/api/etherdelta', EtherDelta);
    router.get('/', SSR);

    app
    .use(serve('./build/static/'))
    .use(router.routes())
    .use(router.allowedMethods());

    return app;
}