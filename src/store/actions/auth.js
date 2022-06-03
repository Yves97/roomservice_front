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

export const userLogin = (data) => {
    return async (dispatch) =>{
        try {
            dispatch(loginStart())
            const response = await loginUser(data)
            if(response.ok){
                dispatch(setUserAuth(true))
                const data = await response.json()
                dispatch(setToken(data.accessToken))
                const decodedToken = jwt_decode(data.accessToken)
                console.log(decodedToken)
                dispatch(setUser(decodedToken))
                dispatch(loginSuccess(true))
                dispatch(checkLoginState(decodedToken.exp))
                dispatch(setExpireToken(decodedToken.exp))
                dispatch(loginFailed(null))
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

export const checkLoginState = (expirationTime) => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout())
            // dispath logout method
        },expirationTime*1000)
    }
}

export const trySignUp =  () => {
    console.log('in checkLoginState')
    return  async (dispatch,getState) =>  {
        const { token,expToken } = getState().auth
        if(!token){
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

