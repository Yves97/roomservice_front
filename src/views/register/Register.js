import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import './Register.css'
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import Img from '../../assets/images/lobby-g97f686da4_1920.jpg'

import {registerUser} from '../../services/auth'


export const Register = () => {
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')


    const signUp = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const data = {
                name,
                email,
                phone,
                password
            }
            const response = await registerUser(data)
            if(response.ok){
                console.log('its ok')
                const data = await response.json()
                console.log('data==',data)
            }else{
                const error = await response.json()
                // console.log('error=',error)
                // console.log(error.message)
                error.message.map((item,index)=>{
                    return setError({
                        i : item,
                    })
                    // console.log
                    // setError(item)
                    
                })
            }
        } catch (error) {
            console.log('error',error)
        }
    }

    return (
        <>
            <Header title={'Register'}/> 
            <div className="h-80 p-7">
                <img src={Img} className='w-full h-full object-cover'/>
            </div>
            <section className="p-8">
                <h1 className="text-4xl"><span className="text-5xl text-violet-500">I</span>nscription</h1>
                <hr className="w-20 bg-violet-500 h-2"/>
            </section>
            <section className="main-form p-8">
                <div className="part-input p-8">
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                        <input value={name} onChange={ e => setName(e.target.value)} type="text" placeholder="Nom complet" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
                        <span className="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                            <i className="fas fa-user"></i>
                        </span>
                    </div>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
                        <span className="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                            <i className="fas fa-envelope"></i>
                        </span>
                    </div>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                        <input value={phone} onChange={e => setPhone(e.target.value)} type="text" placeholder="Telephone" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
                        <span className="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                            <i className="fas fa-phone"></i>
                        </span>
                    </div>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Mot de passe" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
                        <span className="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                            <i className="fas fa-lock"></i>
                        </span>
                    </div>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                        <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" placeholder="Confirmer le mot de passe" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
                        <span className="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                            <i className="fas fa-lock"></i>
                        </span>
                    </div>
                    <button onClick={signUp} className="text-violet-500 border border-violet-500 hover:bg-violet-500 hover:text-white active:bg-violet-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">S'inscrire</button>
                    {error && <p className='text-red-600'>{error}</p>}
                </div> 
                <div className="part-info bg-red-700 p-8 h-48"></div>
            </section>
            <Footer/>
        </>
    )
}
