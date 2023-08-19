import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setEmail } from '../redux/slices/loginDetails'


const User = () => {

    const navigate = useNavigate();
    const email = useSelector((state)=>state.login.email)
    const dispatch = useDispatch()

    const userSubmitHandler= (e) =>{
        e.preventDefault();
        toast.success("Hii User!");
        navigate('/login');
    }
    

  return (
    <div className='flex justify-center items-center h-screen'>
    <div className='bg-gray-800 rounded-2xl backdrop-blur-sm shadow-lg py-10 px-5 sm:p-12'>
        <div className='title text-white'>
            <h4 className='text-center font-bold sm:text-5xl text-4xl'>Hello User!</h4>
            <p className='text-xl text-center text-gray-500 py-4'>We are here to create your Profile.</p>
        </div>

        <form className='py-1' onSubmit={(event)=>{userSubmitHandler(event)}}>
            
           
            
        </form>

    </div>
    </div>
  )
}

export default User