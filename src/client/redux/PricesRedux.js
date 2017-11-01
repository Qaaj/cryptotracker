import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    prices: ['data'],
})

export const PriceTypes = Types
export default Creators

/* ------------- Initial State ------------- */


export const INITIAL_STATE = Immutable({
    price: null,
    error: null,
    fetching: false
});

/* ------------- Reducers ------------- */

export const showPrices = (state , {data}) => {
    const {etheur} = data;
    return state.merge({fetching: false, error: null, price: etheur})
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.PRICES]: showPrices,
})

