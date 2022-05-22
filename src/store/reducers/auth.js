import * as actionTypes from '../types'

const initialState = {
    user : null,
    token : null,
    isAuth : false,
    pending : false,
    errors : null,
    success : null
}

export const authReducer = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.SET_AUTHENTICATED:
            return{
                ...state,
                isAuth : action.value
            }
        case actionTypes.SET_USER:
            return {
                ...state,
                user : action.user
            }
        case actionTypes.SET_TOKEN:
            return {
                ...state,
                token : action.token
            }
        case actionTypes.LOGIN_START:
            return {
                ...state,
                pending : true
            }
        case actionTypes.LOGIN_FAILED:
            return {
                ...state,
                pending : false,
                errors : action.error,
                isAuth : false
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                pending : false,
                success : action.success,
                isAuth : true
            }
        default:
            return state
    }
}