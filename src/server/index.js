const koa = require('koa');
const app = new koa();
const router = require('koa-router')();

const request = require('request-promise');
const redis = require('redis');
const redis_url = process.env.REDIS_URL || 'redis://localhost:6379';
const PORT = process.env.PORT || 3001;
const client = redis.createClient(redis_url);

const REDIS_TIMEOUT = 30;

const {URLS} = require('./conf');
const {checkRedis, isValid} = require('./helpers');

const checkPair = checkRedis(client);

client.on("error", console.error);

const handler = async (ctx) => {

    ctx.set('Content-Type', 'application/json');

    const {currency, coin, options} = ctx.params;
    const pair = options ? [coin, currency, options].join(':') : [coin, currency].join(':');

    const endpoint = isValid(URLS)(pair);
    if (!endpoint) return ctx.body = 'Not a valid request';

    let data = await checkPair(pair);

    if (!data) {
        data = await request(endpoint.url)
        client.set(pair, data, 'EX', REDIS_TIMEOUT);
    }

    ctx.body = {currency, coin, data: endpoint.parser(data)}
};

router.get('/:coin/:currency/:options', handler);
router.get('/:coin/:currency', handler);

app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(async (ctx) => {
        ctx.set("Access-Control-Allow-Origin", "*");
        ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    });

app.listen(PORT, () => console.log("Listening on port " + PORT))