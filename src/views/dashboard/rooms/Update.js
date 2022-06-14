import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getRoom } from '../../../services/rooms'


import { isEmptyOrWhiteSpace } from '../../../helpers/validators'
import { rankingRoom } from '../../../helpers/common'


import { AdminHeader } from '../../../components/adminHeader/adminHeader'
import { Sidebar } from '../../../components/sidebar/sidebar'
import { Loader } from '../../../components/loader/Loader'


export const UpdateRooms = () => {
  const params = useParams()

  const [room,setRoom] = useState(null)
  const [error,setError] = useState(null)

  const [name,setName] = useState('')
  const [errorName,setErrorName] = useState(false)

  const [price,setPrice] = useState('')
  const [errorPrice,setErrorPrice] = useState(false)

  const [ranking,setRanking] = useState('')
  const [errorRanking,setErrorRanking] = useState(false)

  const [description,setDecription] = useState('')
  const [errorDesc,setErrorDesc] = useState(false)

  const [image,setImage] = useState()
  const [errorImage,setErrorImage] = useState(false)

  const [loading,setLoading] = useState(false)
  const [success,setSuccess] = useState(null)
  const [errorApi,setErrorApi] = useState(null)


  const token = useSelector((state) => state.auth.token)

  useEffect(()=> {
    async function details(){
      try {
        const response = await getRoom(params.id)
        if(response.ok){
          const data = await response.json()
          console.log('data',data)
          setRoom(data)
          setName(data.name)
          setPrice(data.price)
          setDecription(data.description)
          setImage(data.image)
          setRanking(data.ranking)
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


  const update= async (e) => {
    e.preventDefault()

    try {
        if(isEmptyOrWhiteSpace(name)){  
            return setErrorName(true)
        }else{
            setErrorName(false)
        }

        if(isEmptyOrWhiteSpace(price)){  
            return setErrorPrice(true)
        }else{
            setErrorPrice(false)
        }

        if(isEmptyOrWhiteSpace(ranking)){  
            return setErrorRanking(true)
        }else{
            setErrorRanking(false)
        }

        if(isEmptyOrWhiteSpace(description)){  
            return setErrorDesc(true)
        }else{
            setErrorDesc(false)
        }

        if(!image){  
            return setErrorImage(true)
        }else{
            setErrorImage(false)
        }
        setLoading(true)        
    } catch (error) {
        console.log('error',error)
    }
}

  return (
    <div className='bg-gray-800 font-sans leading-normal tracking-normal mt-12'>
    <AdminHeader/>
    <main>
        <div className='flex flex-col md:flex-row'>
            <Sidebar/>
            <section className='w-full'>
                <div id="main" className="main-content flex-1 bg-white mt-12 md:mt-2 pb-24 md:pb-5">
                    <div className="bg-gray-800 pt-3">
                        <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                            <h1 className="font-bold pl-2">{room ? room.name : null}</h1>
                        </div>
                    </div>
                    <div className="flex flex-wrap p-5">
                        <div className='w-full'>
                            <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Nom de la chambre" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
                                <span className="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                                    <i className="fas fa-user"></i>
                                </span>
                                {errorName && <p className='text-sm font-thin text-red-600 italic'>Champ à remplir*</p>}
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                <input value={price} onChange={(e) => setPrice(e.target.value)}  type="number" placeholder="Prix" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
                                <span className="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                                    <i className="fas fa-user"></i>
                                </span>
                                {errorPrice && <p className='text-sm font-thin text-red-600 italic'>Champ à remplir*</p>}
                            </div>
                        </div>
                        <div className='w-full mb-4'>
                            <p className='font-thin text-sm'>Ranking</p>
                            <select  id="cities" className='px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10' value={ranking} onChange={(e) => setRanking(e.target.value)}>
                                {rankingRoom.map((item,index)=>{
                                    return (
                                        <React.Fragment key={index}>
                                            <option value={item}>{item}</option>
                                        </React.Fragment>
                                    )
                                })}
                            </select>
                            {errorRanking && <p className='text-sm font-thin text-red-600 italic'>Champ à remplir*</p>}

                        </div>
                        <div className='w-full'>
                            <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                <textarea value={description} onChange={(e)=> setDecription(e.target.value)} type="text" placeholder="Description" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"></textarea>
                                {/* <span className="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                                    <i className="fas fa-user"></i>
                                </span> */}
                                {errorDesc && <p className='text-sm font-thin text-red-600 italic'>Champ à remplir*</p>}
                            </div>
                        </div>
                        <div className='w-full'>
                            <p className='font-thin text-sm'>Photo</p>
                            <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                <input onChange={(e) => setImage(e.target.files[0])} type="file" placeholder="Nom complet" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
                                {errorImage && <p className='font-thin text-sm text-red-600 italic'>Champ à remplir*</p>}
                            </div>
                        </div>
                        {loading ? <Loader/> : <button onClick={update} className="text-blue-900 border border-blue-900 hover:bg-blue-900 hover:text-white active:bg-blue-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Mettre à jour</button> } 
                        {success && <p className='font-thin text-green-600'>{success}</p>}
                        {errorApi && <p className='font-thin text-red-600'>{errorApi}</p>}
                    </div>
                </div>
            </section>
        </div>
    </main>
</div>
  )
}
