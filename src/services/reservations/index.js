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