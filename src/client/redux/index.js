import {combineReducers} from 'redux'
import configureStore from './CreateStore'

export default (initialState) => {


    const rootReducer = combineReducers({
        prices: require('./PricesRedux').reducer,
        settings: require('./SettingRedux').reducer,
    })


    return configureStore(rootReducer,initialState)
}
