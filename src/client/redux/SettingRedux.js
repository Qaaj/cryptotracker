import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    setSetting: ['data'],
    addPair: ['data'],
    removePair: ['data'],
})

export const PriceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    activePairs: [],
    user: null
})

/* ------------- Reducers ------------- */

export const setSetting = (state, {data}) => {
    return state.merge(data);
}

export const addPair = (state, {data}) => {
    let activePairs = state.activePairs;
    activePairs = activePairs.asMutable();
    activePairs.push(data);
    state = state.setIn(['activePairs'], activePairs);
    return state;
}


export const removePair = (state, {data}) => {
    let activePairs = state.activePairs;
    activePairs = activePairs.asMutable();
    activePairs = activePairs.map(item => item.uuid !== data).filter(item => item);
    state = state.setIn(['activePairs'], activePairs);
    return state;
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_SETTING]: setSetting,
    [Types.ADD_PAIR]: addPair,
    [Types.REMOVE_PAIR]: removePair,
})

