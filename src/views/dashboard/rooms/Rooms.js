import React,{useState,useEffect} from 'react'
import { getRooms } from '../../../services/rooms'

import { AdminHeader } from '../../../components/adminHeader/adminHeader'
import { Sidebar } from '../../../components/sidebar/sidebar'
import { Loader } from '../../../components/loader/Loader'

import { baseUrl } from '../../../config/base'
import { useHistory } from 'react-router-dom'


import Img from '../../../assets/images/hotel-gb192f8a92_1920.jpg'

export const DashboardRooms = () => {
    
    const [loading,setLoading] = useState(false)
    const [rooms,setRooms] = useState([])

    const history = useHistory()


    useEffect(() => {
        async function rooms(){
            try {
                setLoading(true)
                const response = await getRooms()
                if(response.ok){
                    const data = await response.json()
                    console.log('rooms',data)
                    setRooms(data)
                    setLoading(false)

                }else{
                    const error = response.json()
                    setLoading(false)
                }
            } catch (error) {
                setLoading(false)
            }
        }
        rooms()
    },[])

    const renderRooms = () => {
        if(loading){
            return (
            <div className="w-full h-96 flex justify-center items-center">
                <Loader/>
            </div>)
        }else{
            if(rooms.length === 0){
                return <p>Aucune chambre pour le moment</p>
            }
            return (
                <>
                    {rooms.map((item)=>{
                        return (
                            <div className="w-full md:w-1/2 xl:w-1/3 p-6" key={item.id}  onClick={() => goToDetails(item.id) }>
                                <div className="bg-gradient-to-b from-gray-200 to-gray-100 border-b-4 border-gray-600 rounded-lg shadow-xl p-2 cursor-pointer hover:border-0">
                                    <div className="flex flex-row items-center">
                                        <div className="flex-shrink pr-4 ">
                                            <img src={`${baseUrl}suites/pictures/${item.image}`} className='rounded-full p-5 w-36 h-36'/>
                                        </div>
                                        <div className="flex-1 text-right">
                                            <h2 className="font-bold text-gray-600">{item.name}</h2>
                                        <p className="font-bold ">{item.price} $ </p>
                                        <p className="font-thin ">{item.ranking} </p>
                                        </div>
                                    </div>
                                </div>
                        
                            </div>
                        )
                    })}
                </>
            )
        }
    }

    const goToDetails = (id) => history.push(`/dashboard/rooms/${id}/details`)


  return (
    <div className='bg-gray-800 font-sans leading-normal tracking-normal mt-12'>
        <AdminHeader/>
        <main>
            <div className='flex flex-col md:flex-row'>
                <Sidebar/>
                <section>
                    <div id="main" className='main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5'>
                        <div className="bg-gray-800 pt-3">
                            <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                                <h1 className="font-bold pl-2">CHAMBRES</h1>
                            </div>
                        </div>
                        <button onClick={() => history.push('/dashboard/rooms/create')} className="ml-5 mt-5 border-2 border-blue-900 p-3 font-thin hover:bg-blue-900 hover:text-white">Ajouter une chambre</button>
                        <div className="flex flex-wrap">
                           {renderRooms()}
                        </div>
                    </div>
                </section>

            </div>
        </main>
    </div>
  )
}
