import React, {useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { getRoom } from '../../../services/rooms'
import { baseUrl } from '../../../config/base'

import { AdminHeader } from '../../../components/adminHeader/adminHeader'
import { Sidebar } from '../../../components/sidebar/sidebar'
import { Loader } from '../../../components/loader/Loader'


export const Details = () => {
  const [room,setRoom] = useState(null)
  const [error,setError] = useState(null)

  const params = useParams()

  useEffect(()=> {
    async function details(){
      try {
        const response = await getRoom(params.id)
        if(response.ok){
            const data = await response.json()
            setRoom(data)
          
        }else{
          const error = await response.json()
          setError(error.message)
          
        }
      } catch (error) {
          console.log(error)
      }

    }

    details()
  },[])


  const renderDetails = () => {
    if(!room){
      return <p>Aucune chambre</p>
    }else{
      return (
        <div className="w-full p-6">
          <div className='w-full h-96'>
              <img src={`${baseUrl}suites/pictures/${room.image}`} className='w-full h-full'/>
          </div>
          <div className='w-full'>
              <h1 className='text-2xl mt-3 mb-3'>{room.name}</h1>
              <hr className='mb-3 w-1/2'/>
              <p>{room.description}</p>
              <hr className='mb-3 mt-3 w-1/2'/>
              <p className='font-bold font-italic'>{room.ranking}</p>
              <hr className='mb-3 w-1/2'/>
              <p className='font-bold'>{room.price} $</p>
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
                      <h1 className="font-bold pl-2">CHAMBRES</h1>
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
