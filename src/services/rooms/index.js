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

export const getAllRooms = async (token) => {
    const rootApi = `${baseUrl}suites/all`
    const options = { 
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    }
    const response = await fetch(rootApi,options)
    return await response
}

export const getRoom = async (id) =>{
    const rootApi = `${baseUrl}suites/${id}`
    const options = {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json'
        }
    }
    const response = await fetch(rootApi,options)
    return await response
}

export const createRoom = async (name,description,ranking,price,image,token) => {
    const routeApi = `${baseUrl}suites`
    const DATA = new FormData()
    DATA.append('name',name)
    DATA.append('price',price)
    DATA.append('description',description)
    DATA.append('ranking',ranking)
    DATA.append('image',image)    

    const options = {
        method : 'POST',
        body : DATA,
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    }
    const response = await fetch(routeApi,options)
    return await response    
}

export const updateRoom = async (name,description,price,ranking,image,token) => {
    const routeApi = `${baseUrl}suites`
    const DATA = new FormData()
    DATA.append('name',name)
    DATA.append('price',price)
    DATA.append('description',description)
    DATA.append('ranking',ranking)
    DATA.append('image',image)
    const options = {
        method : 'PATCH',
        body : DATA,
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    } 
    const response = await fetch(routeApi,options)
    return await response    
}

export const deleteRoom = async (id,token)=> {
    const routeApi = `${baseUrl}suites/${id}`

    const options = {
        method : 'DELETE',
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    }
    const response = await fetch(routeApi,options)
    return await response
}