import './Room.css'
import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import { Header } from "../../components/header/header"
import { Footer } from "../../components/footer/footer"

import { getRoom } from "../../services/rooms"
import { Loader } from '../../components/loader/Loader'
import { Back } from '../../components/back/Back'

import { baseUrl } from '../../config/base'

export const RoomsDetails = () => {
    const [room,setRoom] = useState(null)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)
    const params = useParams()
    
    useEffect(()=>{
        async function details(){
            setLoading(true)
            try {
                const response = await getRoom(params.id)
                if(response.ok){
                    const data = await response.json()
                    console.log('data=',data)
                    setRoom(data)
                    setLoading(false)
                }else{
                    const error = await response.json()
                    setError(error.message)
                    setLoading(false)
                    
                }
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        details()
    },[])


    const renderDetails = () => {
        if(loading) {
            return <div className="w-full h-96 flex justify-center items-center">
                <Loader/>
            </div> 
        }
        else{
            if(room === null){
                return <p className='text-3xl text-center text-black'>{error}</p>
            }else{
                return (
                    <div className="p-8">
                        <Back />
                        <h1 className="text-4xl">{room.name}</h1>
                        <hr className="w-14 bg-violet-500 h-2"/>
                        <div className="img-box pt-8 pr-8 w-full mb-9">
                            <img src={`${baseUrl}suites/pictures/${room.image}`} className='h-full w-full object-cover'/>
                        </div>
                        <p className='w-3/5 tracking-widest mb-4'>{room.description}</p>
                        <hr className='w-14 bg-violet-500 h-1'/>
                        <p className='font-bold italic mt-4'>{room.ranking}</p>
                        <p className='mb-8'>{room.price} $</p>
                        <button className="bg-violet-500 text-white active:bg-pink-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Réserver la suite</button>
                    </div>
                )
            }
        }
    }

    return (
        <>
            <Header title="details"/>
                {renderDetails()}
            <Footer/>
        </>
    )
}
