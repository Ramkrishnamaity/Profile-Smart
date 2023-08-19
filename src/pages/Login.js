import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { setEmail, setPassword } from '../redux/slices/loginDetails';
import { auth, signInWithEmailAndPassword ,db, doc, getDoc} from '../firebase';
import { setValue } from '../redux/slices/loading';
import { setAddress, setUEmail, setFName, setLName, setMobileN } from '../redux/slices/userDetails';
import Loader from '../components/loader';

const Login = () => {

  const navigate = useNavigate();

  const loader = useSelector((state)=>(state.loader.value))
  const password = useSelector((state)=>(state.login.password))
  const email = useSelector((state)=>(state.login.email))
  const dispatch = useDispatch()

    const getData = async()=>{
        const ref = doc(db, "users", auth.currentUser.uid);
        const res = await getDoc(ref) 
        const data = res.data();
        dispatch(setFName(data.firstName))
        dispatch(setLName(data.lastName))
        dispatch(setUEmail(data.email))
        dispatch(setMobileN(data.mobileno))
        dispatch(setAddress(data.address))
    }

    const userSubmitHandler= async(e) =>{
        e.preventDefault();

        dispatch(setValue(true))

        await signInWithEmailAndPassword(auth, email, password)
        .then(async()=>{
            await getData()
            dispatch(setValue(false))
            navigate('/dashboard');
            toast.success("Welcome User!");
        })
        .catch((e)=>{
            dispatch(setValue(false))
            toast.error(e.message);
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
            <h4 className='text-center font-bold sm:text-5xl text-4xl'>Hello User!</h4>
            <p className='text-xl text-center text-gray-500 py-4'>We are here to create your Profile.</p>
        </div>

        <form className='py-1' onSubmit={(event)=>{userSubmitHandler(event)}}>
            
            <div className='textbox flex flex-col space-y-2 px-5 py-4 '>
                <input className='border-0 outline-none px-4 py-3 rounded-lg' type='email'  value={email} placeholder='Email'   onChange={(e)=>dispatch(setEmail(e.target.value))} required/>
                <input className='border-0 outline-none px-4 py-3 rounded-lg' type='password'  value={password} placeholder='Password'   onChange={(e)=>dispatch(setPassword(e.target.value))} required/>
                <button type='submit' className='bg-indigo-500 py-3 rounded-lg text-gray-50 text-xl hover:bg-[#ff6a6a] transition-all duration-200'>Sign in</button>
            </div>
            <div className='text-center '>
                <p className='text-gray-500'>Not a Member? <Link className='text-green-500' to='/register'>Register Now</Link></p>
                <p className='text-gray-500'>Forget Password? <Link className='text-red-500' to='/recovery'>Recover Now</Link></p>
            </div>
        </form>

    </div>
    </div>
    )
  )
}

export default Login