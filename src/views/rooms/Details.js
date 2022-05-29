import './Room.css'
import React, { useState,useEffect} from "react"
import { useParams } from "react-router-dom"
import { Header } from "../../components/header/header"
import { Footer } from "../../components/footer/footer"

import { getRoom } from "../../services/rooms"
import { Loader } from '../../components/loader/Loader'
import { Back } from '../../components/back/Back'

import { baseUrl } from '../../config/base'

import { useSelector } from 'react-redux'
import { reserve } from '../../services/reservations'

const durations = [
    "1H",
    "2H",
    "4H",
    "24H"
]

export const RoomsDetails = () => {
    const [room,setRoom] = useState(null)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)
    const [duration,setDuration] = useState('')
    
    const params = useParams()

    const isAuth = useSelector((state)=> state.auth.isAuth)
    const token = useSelector((state) => state.auth.token)
    const [pending,setPending] = useState(false)
    const [errorApi,setErrorApi] = useState(null)
    
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

    const handleReservation = async e => {
        e.preventDefault()
        try {
            const data = {
                duration : duration,
                suiteId : room.id,
                ranking : room.ranking
            }
            console.log('reserv==',data)
            setPending(true)
            const response = await reserve(data,token)
            if(response.ok){
                const data = await response.json()
                console.log(data)
                setPending(false)
                // console.log('data=',data)
                // setRoom(data)
                // setLoading(false)
            }else{
                const error = await response.json()
                setErrorApi(error.message)
                setPending(false)
                // setLoading(false)   
            }
        } catch (error) {
            setPending(false)
        }
    }
 
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
                        <div className='mb-4'>
                        <p>Durée de réservation</p>
                            <select  id="cities" className='px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-1/2 pr-10' value={duration} onChange={(e) => setDuration(e.target.value)}>
                                {durations.map((item,index)=>{
                                    return (
                                        <React.Fragment key={index}>
                                            <option value={item}>{item}</option>
                                        </React.Fragment>
                                    )
                                })}
                            </select>
                        </div>
                        
                        {pending ? <Loader/> : <button onClick={isAuth ? handleReservation : console.log('not logged')} className={isAuth ? 'bg-violet-500 text-white active:bg-pink-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150' : 'bg-gray-500 text-white font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'} type="button">Réserver la suite</button>}
                        {errorApi && <p className='text-red-600 mt-4'>{errorApi}</p>}
                        
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
