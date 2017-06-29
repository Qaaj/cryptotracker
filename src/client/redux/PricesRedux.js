import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    fetchRequest: null,
    fetchSuccess: ['data'],
    fetchFailure: null,
})

export const PriceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    price: null,
    error: null,
    fetching: false
})

/* ------------- Reducers ------------- */

export const request = (state) => {
    return state.merge({fetching: true})
}

export const success = (state, {data}) => {
    // console.log('Price Arrived', data);
    const {price} = data;
    return state.merge({fetching: false, error: null, price})
}

export const failure = (state, {error}) =>
    state.merge({fetching: false, error})


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.FETCH_REQUEST]: request,
    [Types.FETCH_SUCCESS]: success,
    [Types.FETCH_FAILURE]: failure,
})

