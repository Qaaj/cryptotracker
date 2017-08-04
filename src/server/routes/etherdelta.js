const {getEtherDelta} = require('../controllers/pairs');

module.exports = (client) => async (ctx) => {

    let data = await getEtherDelta(client);

    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    ctx.set('Content-Type', 'application/json');
    ctx.body = data;
};