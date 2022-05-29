import { useState } from "react"
import { Header } from "../../components/header/header"
import { Footer } from "../../components/footer/footer"
import { Loader } from "../../components/loader/Loader"
import Img from '../../assets/images/lobby-g97f686da4_1920.jpg'
import { isEmptyOrWhiteSpace,validateEmail } from "../../helpers/validators"
import { contact } from "../../services/contact"
export const Contact = () => {

    const [firstName,setFirstName] = useState('')
    const [errorFirstName,setErrorFirstName] = useState(false)

    const [lastName,setLastName] = useState('')
    const [errorLastName,setErrorLastName] = useState(false)

    const [email,setEmail] = useState('')
    const [errorEmail,setErrorEmail] = useState(false)

    const [phone,setPhone] = useState('')
    const [errorPhone,setErrorPhone] = useState(false)

    const [message,setMessage] = useState('')
    const [errorMessage,setErrorMessage] = useState(false)

    const [pending,setPending] = useState(false)
    const [success,setSuccess] = useState(null)

    const contactUs = async (e) => {
        e.preventDefault()

        if(isEmptyOrWhiteSpace(firstName)){  
            return setErrorFirstName(true)
         }else{
            setErrorFirstName(false)
        }

        if(isEmptyOrWhiteSpace(lastName)){  
            return setErrorLastName(true)
        }else{
            setErrorLastName(false)
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

        if(isEmptyOrWhiteSpace(message)){
            return setErrorMessage(true)
        }else{
            setErrorMessage(false)
        }
        const data = {
            firstname : firstName,
            lastname : lastName,
            email,
            phone,
            message
        }
        setPending(true)
        try {
            const response = await contact(data)
            console.log('response',response)
            if(response.ok){
                console.log('okok')
                setFirstName('')
                setLastName('')
                setEmail('')
                setPhone('')
                setMessage('')
                setSuccess('Votre message à été envoyer avec success')
                setPending(false)
            }else{
                const error = await response.json()
                setPending(false)
                console.log(error)
            }
        } catch (error) {
            console.log(error)
            setPending(false)
        }
        
    }


    return <>
            <Header title="Contact"/>
                <div className="h-80 p-7">
                    <img src={Img} className='w-full h-full object-cover'/>
                </div>
                <section className="p-8">
                    <h1 className="text-4xl"><span className="text-5xl text-violet-500">C</span>ontactez nous</h1>
                    <hr className="w-20 bg-violet-500 h-2"/>
                </section>
                <section className="main-form p-8">
                <div className="part-input p-8">
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                        <input value={firstName} onChange={ e => setFirstName(e.target.value)} type="text" placeholder="Nom" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
                        <span className="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                            <i className="fas fa-user"></i>
                        </span>
                        {errorFirstName && <p className='text-red-600 italic'>Champ à remplir*</p>}
                    </div>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                        <input value={lastName} onChange={ e => setLastName(e.target.value)} type="text" placeholder="Prénoms" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
                        <span className="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                            <i className="fas fa-user"></i>
                        </span>
                        {errorLastName && <p className='text-red-600 italic'>Champ à remplir*</p>}
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
                        <textarea value={message} onChange={e => setMessage(e.target.value)} type="text" placeholder="Laissez nous un message" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"></textarea>
                        {errorMessage && <p className='text-red-600 italic'>Champ à remplir*</p>}
                    </div>
                    {pending ? <Loader/> :<button onClick={contactUs} className="text-violet-500 border border-violet-500 hover:bg-violet-500 hover:text-white active:bg-violet-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Envoyer</button>} 
                    {success && <p className='text-green-600'>{success}</p>}

                </div> 
                <div className="part-info p-8 h-64">
                    <img className='w-full h-full object-cover' src={Img} />
                </div>
            </section>
            <Footer/>
    </>
}