import React from 'react'
import Loader from '../components/loader';
import {Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { setEmail, setPassword } from '../redux/slices/signupDetails'

import { auth, createUserWithEmailAndPassword } from '../firebase';
import { setValue } from '../redux/slices/loading';

const Register = () => {

  const navigate = useNavigate();
  const loader = useSelector((state)=>(state.loader.value))
  const password = useSelector((state)=>(state.signup.password))
  const email = useSelector((state)=>(state.signup.email))

  const dispatch = useDispatch()
    
  const userSubmitHandler= async(e) =>{
    e.preventDefault();

    dispatch(setValue(true))

    await createUserWithEmailAndPassword(auth, email, password)
    .then(()=>{
        dispatch(setValue(false))
        navigate('/dashboard');
        toast.success("Welcome User!");
    })
    .catch((e)=>{
        dispatch(setValue(false))
        toast.error(e.message)
    })

    dispatch(setEmail(''))
    dispatch(setPassword(''))
    
    }



  return (
    loader?(<Loader/>) :
    (
    <div className='flex justify-center items-center h-screen'>
    <div className='bg-gray-800 rounded-2xl backdrop-blur-sm shadow-lg py-10 px-5 sm:p-12'>
        <div className='title text-white'>
            <h4 className='text-center font-bold sm:text-5xl text-4xl'>Register Now</h4>
            <p className='text-xl text-center text-gray-500 py-4'>Happy to join you</p>
        </div>

        <form className='py-1' onSubmit={(event)=>{userSubmitHandler(event)}}>
            
            <div className='textbox flex flex-col space-y-2 px-5 py-4 '>
                <input className='border-0 outline-none px-4 py-3 rounded-lg' type='email'   placeholder='Email' value={email} onChange={(e)=>dispatch(setEmail(e.target.value))}  required/>
                <input className='border-0 outline-none px-4 py-3 rounded-lg' type='password'   placeholder='Password' value={password} onChange={(e)=>dispatch(setPassword(e.target.value))}  required/>
                <button type='submit' className='bg-indigo-500 py-3 rounded-lg text-gray-50 text-xl hover:bg-[#ff6a6a] transition-all duration-200'>Register</button>
            </div>
            <div className='text-center py-4'>
                <p className='text-gray-500'>Already Register? <Link className='text-red-500' to='/user'>Log in</Link></p>
            </div>
        </form>

    </div>
    </div>
    )
  )
}

export default Register