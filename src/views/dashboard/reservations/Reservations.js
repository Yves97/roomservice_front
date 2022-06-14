import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { AdminHeader } from '../../../components/adminHeader/adminHeader'
import { Sidebar } from '../../../components/sidebar/sidebar'
import { Loader } from '../../../components/loader/Loader'

import { list } from '../../../services/reservations'
import { useHistory } from 'react-router-dom'

export const Reservations = () => {

  const [reservation,setReservation] = useState([])
  const [pending,setPending] = useState(false)
  const [error,setError] = useState(null)
  const token = useSelector((state) => state.auth.token)
  const history = useHistory()

  useEffect(() => {
    async function reservationList(){
      try{
        setPending(true)  
        const response = await list(token)
        if(response.ok){
          const data = await response.json()
          console.log('data=',data)
          setError(null)
          setPending(false)
          setReservation(data)
        }else{
          const error = await response.json()
          setError(error)
          setPending(false)
        }
      }catch(e){
        setError(e)
        setPending(false)
      }
    }
    reservationList()
  },[])


  const renderReservations = () => {
    if(pending){
        return (
        <div className="w-full h-96 flex justify-center items-center">
            <Loader />
        </div>)
    }else{
        if(reservation.length === 0){
            return <p>Aucune chambre pour le moment</p>
        }
        return (
            <>
                {reservation.map((item)=>{
                    return (
                        <div className="w-full md:w-1/2 xl:w-1/3 p-6" key={item.id}>
                            <div className="bg-gradient-to-b from-gray-200 to-gray-100 border-b-4 border-gray-600 rounded-lg shadow-xl p-2">
                                <div className="flex flex-row items-center">
                                    {/* <div className="flex-shrink pr-4 ">
                                        <img src={`${baseUrl}suites/pictures/${item.image}`} className='rounded-full p-5 w-36 h-36'/>
                                    </div> */}
                                    <div className="flex-1 text-left">
                                        <h2 className="font-bold text-gray-600">Utilisateur : {item.user.name}</h2>
                                    <p className="font-bold ">Durée : {item.duration}</p>
                                    <p className="font-thin ">Chambre : {item.suite.name}</p>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <i onClick={() => goToDetails(item.id) } className='fas fa-eye mr-2 cursor-pointer hover:text-gray-500'></i>
                                    <i className='fas fa-edit mr-2 cursor-pointer hover:text-gray-500 text-green-600'></i>
                                    <i className='fas fa-trash cursor-pointer hover:text-gray-500 text-red-600'></i>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </>
        )
    }
  }


  const goToDetails = (id) => history.push(`/dashboard/reservations/${id}`)

  return (
    <div className='bg-gray-800 font-sans leading-normal tracking-normal mt-12'>
      <AdminHeader/>
      <main>
          <div className="flex flex-col md:flex-row">
              <Sidebar />
              <section className='w-full'>
                  <div id="main" className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
                      <div className="bg-gray-800 pt-3">
                          <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                              <h1 className="font-bold pl-2">Liste des réservations</h1>
                          </div>
                      </div>
                      <div className="flex flex-wrap">
                        {renderReservations()}
                      </div>
                      <div className="flex flex-row flex-wrap flex-grow mt-2"></div>
                  </div>
              </section>
          </div>
      </main>
    </div>
  )
}
