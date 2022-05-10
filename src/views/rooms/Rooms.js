import { useEffect , useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Header } from "../../components/header/header"
import { Footer } from "../../components/footer/footer"

import Img from '../../assets/images/lobby-g97f686da4_1920.jpg'

import { getRooms } from "../../services/rooms"
import { setRooms } from "../../store/actions/rooms"
import { baseUrl } from "../../config/base"

export const Rooms = () => {
    const [loading,setLoading] = useState(false)
    const [error,errorApi] = useState(false)
    const roomsState = useSelector((state) => state.rooms)
    
    const dispatch = useDispatch()

    useEffect(()=>{
        async function rooms(){
            setLoading(true)
            const response = await getRooms()
            if(response.ok){
                const data = await response.json()
                dispatch(setRooms(data))
                setLoading(false)

            }else{
                const error = response.json()
                console.log(error)
                setLoading(false)
            }
        }
        rooms()
    },[])


    const renderRooms = () => {
        if(loading){
            return  <div className="w-full h-96 flex justify-center items-center">
                <svg className="animate-spin h-20 w-5 bg-violet-500" viewBox="0 0 24 24"></svg>
            </div>
        }else{
            if(roomsState.rooms.length === 0){
                return <p>Aucune chambre pour le moment</p>
            }
            return (
                <div className="grid grid-cols-2 gap-6 p-8">
                    {roomsState.rooms.map((item)=>{
                        return (
                            <div className="item w-full text-center p-8" key={item.id} >
                                <img src={`${baseUrl}suites/pictures/${item.image}`} className="h-80 object-cover w-full hover:opacity-40 hover:cursor-pointer transition duration-150" />
                                <h3 className="font-bold mt-4 mb-5 text-4xl tracking-wider">{item.name}</h3>
                                <hr className="w-20 bg-violet-500 h-1 m-auto"/>
                                <p className="italic font-bold">{item.ranking}</p>
                                <p className="mb-5 tracking-widest">{item.description}</p>
                                <Link to='/rooms' className="text-violet-500 underline hover:text-violet-900">En savoir plus</Link>
                                <p className="mt-5 mb-8 text-xl tracking-widest">{item.price} $</p>
                                <button className="bg-violet-500 text-white active:bg-pink-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Découvrir</button>
                            </div>
                        )
                    })}
                </div>
            )
        }
    }

    return <>
        <Header title={'Rooms'}/>
            <div className="h-80 p-7">
                <img src={Img} className='w-full h-full object-cover'/>
            </div>
            <section className="p-8">
                <h1 className="text-4xl"><span className="text-5xl text-violet-500">N</span>os Chambres</h1>
                <hr className="w-20 bg-violet-500 h-2"/>
            </section>
            {renderRooms()}
        <Footer/>
    </>
}