import {ServerStyleSheet} from 'styled-components'
import App from '../../client/components/App.js'
import {createStore} from 'redux'
import {LocaleProvider} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

const {URLS} = require('../conf');
const {getPair} = require('../controllers/pairs');
const server = require('react-dom/server')
const React = require('react');
const cluster = require('cluster');



module.exports = (client) => async (ctx) => {

    const price = await getPair(client,'ETH:EUR');

    const emptyStore = {
        prices: {price},
    };
    const store = createStore(() => emptyStore, {})

    const sheet = new ServerStyleSheet()
    const html = server.renderToString(<LocaleProvider locale={enUS}><App store={store}/></LocaleProvider>)
    const css = sheet.getStyleTags() // or sheet.getStyleElement()

    const js_bundle = process.env.NODE_ENV === 'production' ? '/js/main.js' : 'http://localhost:3000/static/js/bundle.js';

    ctx.set('Content-Type', 'text/html');
    ctx.body = `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Title</title>
            <script type="text/javascript">
                window.__INITIAL_STATE__ = ${JSON.stringify(emptyStore)}
            </script>
            <script src="/socket.io/socket.io.js"></script>
            <script>
              window.workerID = ${cluster.worker.id}
            </script>
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/antd/2.13.8/antd.min.css">
            ${css}
        </head>
        <body>
            <div id="root">${html}</div>
        </body>
        <script type="text/javascript" src="${js_bundle}"></script>
    </html>`
};