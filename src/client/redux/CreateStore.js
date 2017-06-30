import {createStore, applyMiddleware, compose} from 'redux'
import {autoRehydrate} from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import RehydrationServices from '../services/RehydrationServices'
import ReduxPersist from '../config/ReduxPersist'
import Immutable from 'seamless-immutable'


// creates the store
export default (rootReducer, rootSaga) => {

    const middleware = []
    const enhancers = []

    // const storeEnhancer = () => (createStore) => (reducer, preloadedState, enhancer) => {
    //     console.log(reducer, preloadedState, enhancer);
    //     preloadedState = window.__INITIAL_STATE__ || {};
    //     console.log(preloadedState);
    //     const store = createStore(reducer, preloadedState, enhancer)
    //     return store;
    // }

    const sagaMiddleware = createSagaMiddleware()
    middleware.push(sagaMiddleware)

    enhancers.push(applyMiddleware(...middleware))

    // add the autoRehydrate enhancer
    if (ReduxPersist.active) {
        enhancers.push(autoRehydrate())
    }

    let initialState = {};

    if (window.__INITIAL_STATE__) {
        Object.keys(window.__INITIAL_STATE__).forEach(key => {
            initialState[key] = Immutable(window.__INITIAL_STATE__[key]);
        })
    }

    const store = createStore(rootReducer, initialState, compose(...enhancers))

    // configure persistStore and check reducer version number
    if (ReduxPersist.active) {
        RehydrationServices.updateReducers(store)
    }

    // kick off root saga
    sagaMiddleware.run(rootSaga)

    // console.log(store.getState());

    return store
}
