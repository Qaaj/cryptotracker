module.exports = {
    URLS: {
        'ETH:USD': {url: process.env.ETHUSD, parser: item => item},
        'ETH:EUR': {url: process.env.ETHEUR, parser: item => item},
        'ETH:EUR:EXTENDED': {url: process.env.ETHEUREX, parser: JSON.parse},
        'ETH:USD:EXTENDED': {url: process.env.EURUSD, parser: JSON.parse},
        'ETH:EUR:HISTORICAL': {url: process.env.ETHEURHIS, parser: JSON.parse},
        'ETH:USD:HISTORICAL': {url: process.env.ETHUSDHIS, parser: JSON.parse},
    }
}