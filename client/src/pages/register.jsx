import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React,{useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
  let refForm =useRef()
  let refName =useRef()
  let refEmail =useRef(null)
  let refPassword =useRef()
  const navigate =useNavigate()
   const {mutate}=useMutation({
        mutationFn:async(data)=>{
            try {
               let res = await axios.post('http://localhost:8000/products/register',data)
               console.log('register',res);
               return res.data
            } catch (error) {
                console.log(error);
            }
        }
    })
  return (
    <>
    <div className="flex justify-center h-screen" >
        <ToastContainer/>
      <div className="bg-white p-1 w-1/2 h-[50%] mt-[5%] flex flex-col  items-center">
        <h1 className='text-xl font-bold my-2 '>Register</h1>
       <form ref={refForm} className=" h-full w-full  flex flex-col justify-around items-center">
        {/* <div className=" w-1/2  rounded "> */}
            <input type="text" name="name" 
            placeholder='Name'
            className='w-1/2 p-2 outline-none ring-1 ring-slate-400'
            ref={refName}
            />
        {/* </div> */}
        {/* <div className=" w-1/2  rounded "> */}
            <input type="email" name="email" 
            placeholder='Email'
            className='w-1/2 p-2 outline-none ring-1 ring-slate-400'
            ref={refEmail}
            />
        {/* </div> */}
        {/* <div className=" w-1/2 rounded "> */}
            <input type="password" name="password" 
            placeholder='password'
            className='w-1/2 p-2 outline-none ring-1 ring-slate-400'
            ref={refPassword}

            />
        {/* </div> */}
        <div className=" w-1/2 rounded">
           <button className='bg-blue-700 w-full text-white p-2 font-bold' type='submit'
           onClick={(e)=>{
             e.preventDefault() 
             if (refName.current.value!=='' && refEmail.current.value!=='' && refPassword.current.value!=='') {
                 let formData =new FormData(refForm.current)
                    let userForm = {name:formData.get('name'),email:formData.get('email'),password:formData.get('password')}
                 mutate(userForm)
                 refName.current.value=''
                 refEmail.current.value=''
                 refPassword.current.value=''
                 toast.success('successfully submitted your form ')
                 navigate('/login')
             }
             
             console.log('form cannot be empty');
           }}
           >
              Sign Up
           </button>
        </div>

       </form>
        <div className="">if you have already account click here <Link to='/login' className='text-blue-600'>Log in</Link></div>
      </div>
    </div>
    
    </>
  )
}

export default Register