import {createStore, applyMiddleware, compose} from 'redux'
import {autoRehydrate} from 'redux-persist'
import RehydrationServices from '../services/RehydrationServices'
import ReduxPersist from '../config/ReduxPersist'
import ReduxThunk from 'redux-thunk'
import io from 'socket.io-client';
import createSocketIoMiddleware from 'redux-socket.io';

const clientSide = (typeof(window) !== 'undefined');

const io_options = {reconnect: true, transports: ['websocket', 'polling']};
const socket = clientSide && window.io ? window.io(io_options) : io('localhost:3001',io_options);

let socketIoMiddleware = createSocketIoMiddleware(socket, "");

// creates the store
export default (rootReducer, initialState = {}) => {

    const middleware = []
    const enhancers = []

    middleware.push(ReduxThunk)
    middleware.push(socketIoMiddleware)

    enhancers.push(applyMiddleware(...middleware))

    // add the autoRehydrate enhancer
    if (ReduxPersist.active) {
        enhancers.push(autoRehydrate())
    }
    const store = createStore(rootReducer, initialState, compose(...enhancers))

    // configure persistStore and check reducer version number
    if (clientSide && ReduxPersist.active) {
        RehydrationServices.updateReducers(store)
    }

    return store
}
