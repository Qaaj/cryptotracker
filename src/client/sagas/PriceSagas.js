import {call, put, takeEvery} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import PriceActions from '../redux/PricesRedux'
import {PriceTypes} from '../redux/PricesRedux'


export function* goUp() {
    yield delay(5000);
    yield put({type: PriceTypes.FETCH_REQUEST});
}

export function* priceWatcher() {
    yield takeEvery(PriceTypes.FETCH_SUCCESS, goUp);
    yield takeEvery(PriceTypes.FETCH_REQUEST, getEtherPrice)
}

export function * getEtherPrice() {

    let price = yield call(() => new Promise(go => {
            function reqListener() {
                go(JSON.parse(this.responseText).data);
            }
            var oReq = new XMLHttpRequest();
            oReq.addEventListener("load", reqListener);
            oReq.open("GET", "http://localhost:3001/api/ETH/EUR");
            oReq.send();
        })
    )

    if (price) {
        yield put(PriceActions.fetchSuccess({price}))
    } else {
        yield put(PriceActions.fetchFailure())
    }
}
