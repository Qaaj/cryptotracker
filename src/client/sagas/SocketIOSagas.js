import {call, put, take} from 'redux-saga/effects'
import { eventChannel  } from 'redux-saga'
import io from 'socket.io-client';
import {PriceTypes} from '../redux/PricesRedux'
import PriceActions from '../redux/PricesRedux'

console.log(PriceActions);

function initWebsocket() {
    return eventChannel(emitter => {

        const io_options = {reconnect: true, transports: ['websocket', 'polling']};
        const socket = window.io ? window.io(io_options) : io('localhost:3001',io_options);
        const workerID = window.workerID;

        socket.on('prices', (data) => {
            console.log('prices: ', data);
            return emitter({ type: PriceTypes.FETCH_SUCCESS, data })
        });

        socket.on(workerID + ':time', (timeString) => {
            console.log('Only for this worker: ' + timeString);
            return emitter({ type: {}, test:20 })
        });

        // unsubscribe function
        return () => {
            console.log('Socket off')
        }
    })
}
export default function* SocketIOSagas() {
    const channel = yield call(initWebsocket)
    while (true) {
        const action = yield take(channel)
        console.log(action);
        yield put(action)
    }
}