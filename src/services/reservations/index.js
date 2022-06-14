import { baseUrl } from "../../config/base";


export const reserve = async (data,token) =>{
    const route = `${baseUrl}reservations`
    const options = {
        method : 'POST',
        body : JSON.stringify(data),
        headers : {
            'Authorization' : `Bearer ${token}`,
            'Content-Type' :'application/json'
        }
    }
    const response = await fetch(route,options)
    return await response
}

export const list = async (token) => {
    const route = `${baseUrl}reservations`
    const options = {
        method : 'GET',
        headers : {
            'Authorization' : `Bearer ${token}`,
            'Content-Type' :'application/json'
        }
    }
    const response = await fetch(route,options)
    return await response
}


export const details = async (id,token) => {
    const route = `${baseUrl}reservations/${id}`
    const options = {
        method : 'GET',
        headers : {
            'Authorization' : `Bearer ${token}`,
            'Content-Type' :'application/json'
        }
    }
    const response = await fetch(route,options)
    return await response
}