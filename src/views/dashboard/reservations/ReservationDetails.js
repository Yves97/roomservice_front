import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { AdminHeader } from '../../../components/adminHeader/adminHeader'
import { Sidebar } from '../../../components/sidebar/sidebar'
import { Loader } from '../../../components/loader/Loader'

import { details } from '../../../services/reservations'

export const ReservationDetails = () => {

    const [reservation,setReservation] = useState(null)
    const [error,setError] = useState(null)
    const [pending,setPending] = useState(false)
    const {id} = useParams()
    const token = useSelector((state) => state.auth.token)
    

    useEffect(()=>{
        async function getDetails(){
            try {
                setPending(true)
                const response = await details(id,token)
                if(response.ok){
                    const data = await response.json()
                    console.log(data)
                    setError(null)
                    setReservation(data)
                    setPending(false)
                }else{
                    const error = await response.json()
                    setError(error)
                    setPending(false)
                }
            } catch (error) {
                setError(error)
                setPending(false)
            }
        }
        getDetails()
    },[])

    const renderDetails = () => {
        if(pending){
          return <Loader/>
        }else{
            if(!reservation){
                return <p>Aucune chambre</p>
            }
            return (
                <div className="w-full p-6">
                    <div className='w-full'>
                        <h1 className='text-2xl mt-3 mb-3'>Réservation</h1>
                        <hr className='mb-2 w-1/2'/>
                        <p>Etablie le  : {reservation.createDate}</p>
                        <p>Durée : {reservation.duration}</p>
                    </div>
                    <div className='w-full'>
                        <h1 className='text-2xl mt-3 mb-3'>Utilisateur</h1>
                        <hr className='mb-2 w-1/2'/>
                        <p>Nom : {reservation.user.name}</p>
                        <p>Email : {reservation.user.email}</p>
                        <p>Numéro de téléphone : {reservation.user.phone}</p>
                        {/* <img src={`${baseUrl}suites/pictures/${room.image}`} className='w-full h-full'/> */}
                    </div>
                    <div className='w-full'>
                        <h1 className='text-2xl mt-3 mb-3'>Chambre</h1>
                        <hr className='mb-2 w-1/2'/>
                        <p>Nom : {reservation.suite.name}</p>
                        <p className=''>Rang : {reservation.suite.ranking}</p>
                        <p>Prix : {reservation.suite.price}</p>
                    </div>
                </div>
            )
        }
      }

    return (
        <div className='bg-gray-800 font-sans leading-normal tracking-normal mt-12'>
            <AdminHeader/>
            <main>
                <div className='flex flex-col md:flex-row'>
                <Sidebar/>
                    <section className='w-full'>
                        <div id="main" className='main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5'>
                            <div className="bg-gray-800 pt-3">
                                <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                                    <h1 className="font-bold pl-2">Réservation</h1>
                                </div>
                            </div>
                            <div>
                                {renderDetails()}
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}
