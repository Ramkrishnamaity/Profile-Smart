import React from 'react'
import Loader from '../components/loader';
import {  Link , useNavigate} from 'react-router-dom';
import { auth, signOut , doc, db, setDoc } from '../firebase';
import { useDispatch, useSelector} from 'react-redux'
import { setAddress, setUEmail, setFName, setLName, setMobileN } from '../redux/slices/userDetails';
import { toast } from 'react-hot-toast';
import { setId } from '../redux/slices/user';
import { setValue } from '../redux/slices/loading';


const Dashboard = () => {

    const navigate = useNavigate();
    const uid = useSelector((state)=>(state.user.id))
    const loader = useSelector((state)=>(state.loader.value))
    const address = useSelector((state)=>(state.userD.address))
    const fName = useSelector((state)=>(state.userD.fName))
    const lName = useSelector((state)=>(state.userD.lName))
    const email = useSelector((state)=>(state.userD.email))
    const mobileN = useSelector((state)=>(state.userD.mobileN))
  
    const dispatch = useDispatch()


    const updateDetails = async(e)=>{
        e.preventDefault()
        dispatch(setValue(true))

        try{
            const ref = doc(db, "users", auth.currentUser.uid);
            await setDoc(ref, {
                firstName: fName,
                lastName: lName,
                email: email,
                mobileno: mobileN,
                address: address 
            })
            dispatch(setValue(false))
            toast.success("upadate successfully")
        } catch(e){
            dispatch(setValue(false))
            toast.error(e.message)
        }
   
    }

    async function logout(){
        
        dispatch(setValue(true))
        await signOut(auth)
        .then(()=>{
            dispatch(setId(""))
            dispatch(setValue(false))
            navigate('/');
            toast.success("log out successfully!");
            dispatch(setFName(""))
            dispatch(setLName(""))
            dispatch(setUEmail(""))
            dispatch(setMobileN(""))
            dispatch(setAddress(""))
        })
        .catch((e)=>{ 
            dispatch(setValue(false))
            toast.error(e.message);
        })
    }

    if(uid === ''){
        return (
            <div className='flex flex-col gap-3 justify-center items-center h-screen'>
                <p>it is protected route for login user.</p>
                <p className=' mb-5'>log in first! <Link to='/' className='bg-indigo-500 py-2 ml-2 px-2 rounded-lg text-gray-50 text-xl hover:bg-[#ff6a6a] transition-all duration-200'>Log in</Link></p>
                
            </div>
        )
    }

    return (
    loader?(<Loader/>) :
    (
    <div className='flex justify-center items-center h-screen'>
    <div className='bg-gray-800 rounded-2xl backdrop-blur-sm shadow-lg py-10 px-5 sm:p-12'>
        <div className='title text-white'>
            <h4 className='text-center font-bold sm:text-5xl text-4xl'>Hello {fName}</h4>
            <p className='text-xl text-center text-gray-500 py-4'>You can update your details.</p>
        </div>

        <form className='py-1' onSubmit={(e)=>{updateDetails(e)}}>
        
            <div className='textbox flex flex-col space-y-2 px-5 py-4 '>
                <div className='flex gap-2 flex-col md:flex-row'>
                    <input className='border-0 outline-none px-4 py-3 rounded-lg' type='text'   placeholder='First name'
                        value={fName} onChange={(e)=>{dispatch(setFName(e.target.value))}}
                    />
                    <input className='border-0 outline-none px-4 py-3 rounded-lg' type='text'   placeholder='Last name'
                        value={lName} onChange={(e)=>{dispatch(setLName(e.target.value))}}
                    />
                </div>
                <div className='flex gap-2 flex-col md:flex-row'>
                    <input className='border-0 outline-none px-4 py-3 rounded-lg' type='text' placeholder='Mobile no'
                        value={mobileN} onChange={(e)=>{dispatch(setMobileN(e.target.value))}}
                    />
                    <input className='border-0 outline-none px-4 py-3 rounded-lg' type='text'   placeholder='Email id'
                        value={email} onChange={(e)=>{dispatch(setUEmail(e.target.value))}}
                    />
                </div>
                <textarea className='border-0 outline-none px-4 py-3 rounded-lg resize-none' rows='2' placeholder='Address'
                    value={address} onChange={(e)=>{dispatch(setAddress(e.target.value))}}
                />
                <button type='submit' className='bg-indigo-500 py-3 rounded-lg text-gray-50 text-xl hover:bg-[#ff6a6a] transition-all duration-200'>Update</button>
            </div>
            <div className='text-center py-4'>
                <p className='text-gray-500'>Come back later? <Link className='text-red-500'  onClick={()=>{logout()}}>Log out</Link></p>
            </div>
        </form>

    </div>
    </div>
    )
  )

}

export default Dashboard