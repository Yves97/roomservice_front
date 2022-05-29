import { baseUrl } from "../../config/base";



export const contact = async (data) => {
    const rootApi = `${baseUrl}contact`
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