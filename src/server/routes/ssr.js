import {ServerStyleSheet} from 'styled-components'
import App from '../../client/components/App.js'
import {createStore} from 'redux'

const {URLS} = require('../conf');
const {getPair} = require('../helpers');
const server = require('react-dom/server')
const React = require('react');


module.exports = (client) => async (ctx) => {

    const price = await getPair(client,'ETH:EUR',URLS['ETH:EUR']);

    const emptyStore = { prices: {price} };
    const store = createStore(() => emptyStore, {})

    const sheet = new ServerStyleSheet()
    const html = server.renderToString(<App store={store}/>)
    const css = sheet.getStyleTags() // or sheet.getStyleElement()

    ctx.set('Content-Type', 'text/html');
    ctx.body = `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Title</title>
            ${css}
        </head>
        <body>
            ${html}
        </body>
    </html>`
};