import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import './Register.css'
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { Loader } from '../../components/loader/Loader';
import Img from '../../assets/images/lobby-g97f686da4_1920.jpg'

import {registerUser} from '../../services/auth'
import { validateEmail, isEmptyOrWhiteSpace } from '../../helpers/validators';



export const Register = () => {
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)

    const [name,setName] = useState('')
    const [errorName,setErrorName] = useState(false)

    const [email,setEmail] = useState('')
    const [errorEmail,setErrorEmail] = useState(false)

    const [phone,setPhone] = useState('')
    const [errorPhone,setErrorPhone] = useState(false)

    const [password,setPassword] = useState('')
    const [errorPassword,setErrorPassword] = useState(false)

    const [confirmPassword,setConfirmPassword] = useState('')
    const [errorConfirmPassword,setErrorConfirmPassword] = useState(false)

    const [samePassword,setSamePassword] = useState(false)

    const [success,setSuccess] = useState(null)

    const history = useHistory()

    const signUp = async (e) => {
        e.preventDefault()

        if(isEmptyOrWhiteSpace(name)){  
           return setErrorName(true)
        }else{
            setErrorName(false)
        }

        if(!validateEmail(email)){
            return setErrorEmail(true)
        }else{
            setErrorEmail(false)
        }

        if(isEmptyOrWhiteSpace(phone)){  
            return setErrorPhone(true)
        }else{
            setErrorPhone(false)
        }

        if(isEmptyOrWhiteSpace(password)){  
            return setErrorPassword(true)
        }else{
            setErrorPassword(false)
        }

        if(isEmptyOrWhiteSpace(confirmPassword)){  
            return setErrorConfirmPassword(true)
        }else{
            setErrorConfirmPassword(false)
        }

        if(password !== confirmPassword){
            return setSamePassword(true)
        }else{
            setSamePassword(false)
        }

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
                setLoading(false) 
                setSuccess("Inscription reussi avec success !, vous serez redirigé a la page de connexion dans quelques secondes")
                setTimeout(() => {
                    history.push('/login')
                },5000)
            }else{
                const error = await response.json()
                setError(error.message)
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
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
                        {errorName && <p className='text-red-600 italic'>Champ à remplir*</p>}
                    </div>
                    
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
                        <span className="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                            <i className="fas fa-envelope"></i>
                        </span>
                        {errorEmail && <p className='text-red-600 italic'>Champ à remplir*</p>}
                    </div>

                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                        <input value={phone} onChange={e => setPhone(e.target.value)} type="text" placeholder="Telephone" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
                        <span className="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                            <i className="fas fa-phone"></i>
                        </span>
                        {errorPhone && <p className='text-red-600 italic'>Champ à remplir*</p>}
                    </div>

                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Mot de passe" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
                        <span className="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                            <i className="fas fa-lock"></i>
                        </span>
                        {errorPassword && <p className='text-red-600 italic'>Champ à remplir*</p>}
                    </div>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                        <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" placeholder="Confirmer le mot de passe" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
                        <span className="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                            <i className="fas fa-lock"></i>
                        </span>
                        {errorConfirmPassword && <p className='text-red-600 italic'>Champ à remplir*</p>}
                        {samePassword && <p className='text-red-600 italic'>Mot de passe non identiques*</p>}
                    </div>
                    {loading ? <Loader/> : <button onClick={signUp} className="text-violet-500 border border-violet-500 hover:bg-violet-500 hover:text-white active:bg-violet-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">S'inscrire</button>}
                    {error && (typeof error === Array || typeof error === Object) ? <> {  error.map((item,index) => <p key={index} className='text-red-600'>{item}</p> )   }  </> : <p className='text-red-600'>{error}</p>}
                    {success && <p className='text-green-600'>{success}</p>}
                </div> 
                <div className="part-info p-8 h-64">
                    <img className='w-full h-full object-cover' src={Img} />
                </div>
            </section>
            <Footer/>
        </>
    )
}
