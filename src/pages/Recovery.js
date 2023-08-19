import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../firebase';
import { toast } from 'react-hot-toast';
import { sendPasswordResetEmail } from 'firebase/auth';
import { setValue } from '../redux/slices/loading';
import { setEmail } from '../redux/slices/loginDetails';

const Recovery = () => {

  const dispatch = useDispatch()
  
  const loader = useSelector((state)=>(state.loader.value))
  
  const email = useSelector((state)=>(state.login.email))
  // const [recoverEmail, setREmail] = useState("");

  const recover = async()=>{

    dispatch(setValue())

    await sendPasswordResetEmail(auth, email)
    .then(()=>{
      toast.success("link sent")
      dispatch(setValue())
    })
    .catch((e)=>{
      toast.error(e.message)
      dispatch(setValue())
    })

  }

  const SubmitHandler = (e)=>{

    e.preventDefault();

    recover()

  }

  



  return (
    loader?(<loader/>) :
    (
    <div className='flex justify-center items-center h-screen'>
    <div className='bg-gray-800 rounded-2xl backdrop-blur-sm shadow-lg py-10 px-5 sm:p-12'>
        <div className='title text-white'>
            <h4 className='text-center font-bold sm:text-5xl text-4xl'>Recovery</h4>
            <p className='text-xl text-center text-gray-500 py-4'>check the confirmation mail <br/>to your registered email id. after send</p>

            <form className='py-1 text-black' onSubmit={(event)=>{SubmitHandler(event)}}>
            
              <div className='textbox flex flex-col space-y-2 px-5 py-4 '>
              <input className='border-0 outline-none px-4 py-3 rounded-lg' type='email'  value={email} placeholder='Email'   onChange={(e)=>dispatch(setEmail(e.target.value))} required/>
              <button type='submit' className='bg-indigo-500 py-3 rounded-lg text-gray-50 text-xl hover:bg-[#ff6a6a] transition-all duration-200'>Send</button>
              </div>
            </form>

        </div>
        <div className='text-center py-4'>
                <p className='text-gray-50 mb-5'>if you have done? <Link to='/' className='bg-indigo-500 py-2 ml-2 px-2 rounded-lg text-gray-50 text-xl hover:bg-[#ff6a6a] transition-all duration-200'>Log in</Link></p>
                <p className='text-gray-500'>Could not Receive? <span className='text-red-500 cursor-pointer' onClick={()=>{recover()}}>Resend it</span></p>
        </div>

        

    </div>
    </div>
    )
  )
}

export default Recovery