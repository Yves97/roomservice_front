import { baseUrl } from "../../config/base";


export const getRooms = async () => {
    const rootApi = `${baseUrl}suites`
    const options = { 
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json'
        }
    }
    const response = await fetch(rootApi,options)
    return await response
}