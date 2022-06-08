import React, {useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import {useHistory,Redirect} from 'react-router-dom'



import { validateEmail, isEmptyOrWhiteSpace } from '../../helpers/validators'
import { userLogin } from '../../store/actions/auth'

import { Loader } from '../../components/loader/Loader'

export const Index = () => {
    const [email,setEmail] = useState('')
    const [errorEmail,setErrorEmail] = useState(false)
    const [password,setPassword] = useState('')
    const [errorPassword,setErrorPassword] = useState(false)

    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state.auth.isAuth)
    const pending = useSelector((state) => state.auth.pending)
    const errors = useSelector((state) => state.auth.errors)
    const user = useSelector((state)=> state.auth.user)

    const login = async (e) => {
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
            const data = {email,password}
            await dispatch(userLogin(data))
        } catch (error) {
            console.log(error)
        }
        
    }

    const renderForm = () => {
        return (
            <section className="absolute w-full h-full">
                    <div className="absolute top-0 w-full h-full bg-violet-900"></div>
                    <div className="container mx-auto px-4 h-full">
                        <div className="flex content-center items-center justify-center h-full">
                        <div className="w-full lg:w-4/12 px-4">
                            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <div className="text-gray-500 text-center mb-3 font-bold">
                                <small>Room Services - ADMIN</small>
                                </div>
                                <form>
                                <div className="relative w-full mb-3">
                                    <label
                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                    >
                                    Email
                                    </label>
                                    <input
                                    type="email"
                                    className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                    placeholder="Email"
                                    style={{ transition: "all .15s ease" }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {errorEmail && <p className='text-sm italic text-red-600'>Remplir ce champ*</p>}
                                </div>

                                <div className="relative w-full mb-3">
                                    <label
                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                    >
                                    Password
                                    </label>
                                    <input
                                    type="password"
                                    className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                    placeholder="Password"
                                    style={{ transition: "all .15s ease" }}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {errorPassword && <p className='text-sm italic text-red-600'>Remplir ce champ*</p>}
                                </div>
                                <div className="text-center mt-6">
                                    {pending ? <Loader/> : <button onClick={login} className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full" type="button" style={{ transition: "all .15s ease" }}>Se connecter </button>}
                                    {errors && <p className='text-sm text-red-600'>{errors}</p>}
                                    {user ? <> {user.role === 'CLIENT' &&  <p className='text-sm text-red-600'>Vous n'êtes pas autorisé à accéder</p> } </> : null}
                                </div>
                                </form>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
            </section>
        )
    }

    const renderLogin = () => {
        if(user){
            if(user.role === 'ADMIN'){
                return <Redirect to='/dashboard/home' />
            }
            else{
                return (
                    <>
                        {renderForm()}
                    </>
                )
            }   
        }else{
            return (
                <>
                    {renderForm()}
                </>
            )
        }
    }

    return (
        <main>
            {renderLogin()}
        </main>
    )
}