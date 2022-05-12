import { baseUrl } from "../../config/base";

export const registerUser = async (data) => {
    const rootApi = `${baseUrl}auth/register`
    const options = { 
        method : 'POST',
        body : JSON.stringify(data),
        headers : {
            'Content-Type' : 'application/json'
        }
    }
    const response = await fetch(rootApi,options)
    return await response
}

export const loginUser = async data => {
    const rootApi = `${baseUrl}auth/login`
    const options = { 
        method : 'POST',
        body : JSON.stringify(data),
        headers : {
            'Content-Type' : 'application/json'
        }
    }
    const response = await fetch(rootApi,options)
    return await response
}