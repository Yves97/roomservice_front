import {useState,useEffect} from 'react'
import {useHistory,Redirect} from 'react-router-dom'
import { useDispatch ,useSelector } from 'react-redux';
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { Loader } from '../../components/loader/Loader';
import Img from '../../assets/images/lobby-g97f686da4_1920.jpg'

import { validateEmail, isEmptyOrWhiteSpace } from '../../helpers/validators';
import { userLogin , initErrors } from '../../store/actions/auth';

export const Login = () => {

    const history = useHistory()
    const [loading,setLoading] = useState(false)
    const [email,setEmail] = useState('')
    const [errorEmail,setErrorEmail] = useState(false)

    const [password,setPassword] = useState('')
    const [errorPassword,setErrorPassword] = useState(false)

    const [error,setError] = useState(null)

    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state.auth.isAuth)
    const pending = useSelector((state) => state.auth.pending)
    const errors = useSelector((state) => state.auth.errors)
    
    useEffect(()=>{
        dispatch(initErrors())
    },[])

    const signIn = async (e) => {
      e.preventDefault()
      if(!validateEmail(email)){
        return setErrorEmail(true)
      }else{
          setErrorEmail(false)
      }

      if(isEmptyOrWhiteSpace(password)){  
        return setErrorPassword(true)
      }else{
          setErrorPassword(false)
      }

      try {
        // setLoading(true)
        const data = {
          email,
          password
        }
        await dispatch(userLogin(data))
        // if(isAuth){
        //     console.log('login success')
        //     return history.push('/')
        //   // redirect to home
        // }
      } catch (error) {
        console.log(error)
      }

    }

    const renderLogin = () => {
        if(isAuth){
            return <Redirect to='/' />
        }
        return (
            <>
            <Header title={'Login'}/> 
            <div className="h-80 p-7">
                <img src={Img} className='w-full h-full object-cover'/>
            </div>
            <section className="p-8">
                <h1 className="text-4xl"><span className="text-5xl text-violet-500">C</span>onnexion</h1>
                <hr className="w-20 bg-violet-500 h-2"/>
            </section>
            <section className="main-form p-8">
                <div className="part-input p-8">
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                        <input value={email} onChange={ e => setEmail(e.target.value)} type="email" placeholder="Email" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
                        <span className="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                            <i className="fas fa-envelope"></i>
                        </span>
                        {errorEmail && <p className='italic text-red-600'>Remplir ce champ*</p>}
                    </div>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                        <input value={password} onChange={ e => setPassword(e.target.value)} type="password" placeholder="Mot de passe" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
                        <span className="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                            <i className="fas fa-lock"></i>
                        </span>
                        {errorPassword && <p className='italic text-red-600'>Remplir ce champ*</p>}
                    </div>
                    {pending ? <Loader/> : <button onClick={signIn} className="text-violet-500 border border-violet-500 hover:bg-violet-500 hover:text-white active:bg-violet-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Se connecter</button>}
                    {errors && <p className='text-red-600'>{errors}</p>}
                </div> 
                <div className="part-info p-8 h-64">
                    <img className='w-full h-full object-cover' src={Img} />
                </div>
            </section>
            <Footer/>
        </>
        )
    }

    return (
        <>
            {renderLogin()}
        </>
    )
}


