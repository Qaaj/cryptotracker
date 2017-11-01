import {combineReducers} from 'redux'
import configureStore from './CreateStore'

export default () => {


    const rootReducer = combineReducers({
        prices: require('./PricesRedux').reducer,
        settings: require('./SettingRedux').reducer,
    })


    return configureStore(rootReducer)
}
