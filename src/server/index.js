const koa = require('koa');
const app = new koa();
const router = require('koa-router')();
const redis = require('redis');

const redis_url = process.env.REDIS_URL || 'redis://localhost:6379';
const PORT = process.env.PORT || 3001;
const client = redis.createClient(redis_url);

const { CurrencyPairs } = require('./routes');

client.on("error", console.error);

router.get('/:coin/:currency/:options', CurrencyPairs(client));
router.get('/:coin/:currency', CurrencyPairs(client));

app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(async (ctx) => {
        ctx.set("Access-Control-Allow-Origin", "*");
        ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    });

app.listen(PORT, () => console.log("Listening on port " + PORT))