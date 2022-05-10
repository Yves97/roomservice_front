import * as actionTypes from '../types'


const initialState = {
    rooms : [],
}

export const roomReducer = (state= initialState,action) => {
    switch(action.type){
        case actionTypes.SET_ROOMS:
            return {
                ...state,
                rooms : action.rooms
            }
        default: 
            return state
    }
} 