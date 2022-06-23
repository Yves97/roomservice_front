import * as actionTypes from '../types'
import jwt_decode from "jwt-decode";

import { loginUser } from '../../services/auth'

// export const setAuthenticated = value => ({type : actionTypes.SET_AUTHENTICATED,value})
export const setUser = user => ({type : actionTypes.SET_USER,user})
export const setToken = token => ({type : actionTypes.SET_TOKEN,token})
export const setExpireToken = (expire) => ({ type : actionTypes.SET_EXPIRE_TOKEN,expire})
export const loginStart = () => ({type : actionTypes.LOGIN_START})
export const loginFailed = error => ({type: actionTypes.LOGIN_FAILED,error})
export const loginSuccess = success => ({type : actionTypes.LOGIN_SUCCESS,success})
export const setUserAuth = value => ({type : actionTypes.SET_AUTHENTICATED,value})
export const initErrors = () => ({type : actionTypes.INIT_ERRORS})

export const userLogin = (data) => {
    return async (dispatch) =>{
        try {
            dispatch(loginStart())
            const response = await loginUser(data)
            if(response.ok){
                const data = await response.json()
                console.log('data=',data)
                dispatch(setToken(data.accessToken))
                const decodedToken = jwt_decode(data.accessToken)
                console.log('decoded token',decodedToken)
                dispatch(setUser(decodedToken))
                dispatch(loginSuccess(true))
                dispatch(setExpireToken(decodedToken.exp))
                dispatch(loginFailed(null))
                dispatch(setUserAuth(true))
                // dispatch(checkLoginState(decodedToken.exp))
            }else{
                const error = await response.json()
                // dispatch(setAuthenticated(false))
                dispatch(setUserAuth(false))
                dispatch(loginFailed(error.message))
            }
        } catch (error) {
            dispatch(setUserAuth(false))
            // dispatch(setAuthenticated(false))
            dispatch(loginFailed(error))
        }
    }
}

/* 
export const checkLoginState = (expirationTime) => {
    console.log('expiration time',expirationTime)
    return dispatch => {
    try {
            setTimeout(()=>{
                console.log('triggered logout')
                dispatch(logout())
                // dispath logout method
            },expirationTime*1000)
    } catch (error) {
        
    }
    }
}
*/

export const trySignUp =  () => {
    console.log('in checkLoginState')
    return  async (dispatch,getState) =>  {
        const {token , expToken } = getState().auth
        console.log(token,expToken)
        if(!token){
            console.log('token expire')
            dispatch(logout())
        }
        else {
            if((expToken * 1000) <= (new Date().getTime())){
                console.log('token expires')
                dispatch(logout())
            }
            else{
                console.log('in not logout')
                return true;
            }
        }

    }
}


export const logout = () => {
    return dispatch => {
        // dispatch(setAuthenticated(false))
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(setUserAuth(false))
        dispatch(setExpireToken(null))
        
    }
}

