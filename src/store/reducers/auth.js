import * as actionTypes from '../types'

const initialState = {
    user : null,
    token : null,
    expToken : null,
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
        case actionTypes.SET_EXPIRE_TOKEN:
            return {
                ...state,
                expToken : action.expire
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
                errors : action.error
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                pending : false,
                success : action.success,
            }
        default:
            return state
    }
}