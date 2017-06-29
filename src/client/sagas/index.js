import {all} from 'redux-saga/effects'
import {getEtherPrice, priceWatcher} from './PriceSagas'

export default function * root() {

    yield all([
        getEtherPrice(),
        priceWatcher()
    ])
}
