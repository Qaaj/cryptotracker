import {all} from 'redux-saga/effects'
// import {getEtherPrice, priceWatcher} from './PriceSagas'
import SocketIOSagas from './SocketIOSagas'

export default function * root() {

    yield all([
        // getEtherPrice(),
        // priceWatcher(),
        SocketIOSagas()
    ])
}
