import {useHistory} from 'react-router-dom'

import './Home.css'

import { Header } from '../../components/header/header'
import {Footer} from '../../components/footer/footer'

import ImgRoom from '../../assets/images/lobby-g97f686da4_1920.jpg'
import WhoRoom from '../../assets/images/stars-g2bdb2c320_1920.jpg'
import ContactUs from '../../assets/images/receptionists-gb4f122ced_1920.jpg'
import OurRooms from '../../assets/images/hotel-gb192f8a92_1920.jpg'
export const Home = () => {

    let history = useHistory()
    
    const goToContact = () => history.push('/contact')
    const goToRooms = () => history.push('/rooms')
    return (<>
        <Header title={'Home'}/>
            <div className='grid grid-cols-2 grid-rows-1 gap-2'>
                <div className='left-part h-96 flex justify-center items-center'>
                    <h1 className='text-center text-7xl text-violet-500'>Room Services</h1>
                </div>
                <div className='right-part h-96 p-2'>
                    <img src={ImgRoom} className="object-cover w-screen h-full" />
                </div>
            </div>
            <section className='mt-4 grid grid-cols-2 grid-rows-1 gap-2'>
                <div className='who w-full p-8'>
                    <img src={WhoRoom} className="object-cover w-screen h-full" />
                </div>
                <div className='flex justify-center items-center p-12'>
                    <div>
                        <h3 className='text-thin mb-4 font-bold'>Qui somme nous ?</h3>
                        <p>
                            Our clients preferred us because of our African well-being and know-how. Beyond fashions and trends, we know how to work in a good mood together for your well-being. Discover the 100% fun Azalaï spirit. Let's celebrate life and start 2022 together warmly
                            #feelfrica #azalai #flashmob #dance #hotel #hospitality #tourism # 2022 #africa
                        </p>
                    </div>
                </div>
            </section>
            <section className='mt-4 grid grid-cols-2 grid-rows-1 gap-2'>
                <div className='flex justify-center items-center p-12'>
                    <div>
                        <h3 className='text-thin mb-4 font-bold'>Contacter nous</h3>
                        <p className='mb-3'>
                            Our clients preferred us because of our African well-being and know-how. Beyond fashions and trends, we know how to work
                        </p>
                        <button onClick={goToContact} className="bg-violet-500 text-white active:bg-pink-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Prende contact</button>
                    </div>
                </div>
                <div className='who w-full p-8'>
                    <img src={ContactUs} className="object-cover w-screen h-full" />
                </div>
            </section>
            <section className='mt-4 grid grid-cols-2 grid-rows-1 gap-2'>
                <div className='who w-full p-8'>
                    <img src={OurRooms} className="object-cover w-screen h-full" />
                </div>
                <div className='flex justify-center items-center p-12'>
                    <div>
                        <h3 className='text-thin mb-4 font-bold'>Nos chambres</h3>
                        <p className='mb-3'>
                            Our clients preferred us because of our African well-being and know-how. Beyond fashions and trends, we know how to work in a good mood
                        </p>
                        <button onClick={goToRooms} className="bg-violet-500 text-white active:bg-pink-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Découvrir</button>
                    </div>
                </div>
            </section>
        <Footer/>
    </>)
}