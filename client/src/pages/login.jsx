import React,{useRef,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { setLocalStorage } from '../../utile/storage'
import { useNavigate,useLocation} from 'react-router-dom';

const Login = () => {
  let refFormLogin =useRef()
  let refEmailLogin =useRef()
  let refPasswordLogin =useRef()

  const navigate =useNavigate()
  const {mutate}=useMutation({
    mutationFn:async(data)=>{
        try {
           let res = await axios.post('http://localhost:8000/products/login',data)
           console.log('login',res);
           return res.data

        } catch (error) {
            console.log(error);
        }
    },
    onSuccess:(data)=>{
      setLocalStorage('token',data?.token)
      console.log('Data from server:', data);
      navigate('/')
    }
})






  return (
   <>
   <div className=" flex justify-center h-screen" >
      <div className="bg-white p-1 w-[45%] h-[40%] mt-[5%] flex flex-col  items-center">
        <h1 className='text-xl font-bold my-2 '>Login</h1>
       <form ref={refFormLogin} className=" h-full w-full  flex flex-col justify-around items-center">
         
        <input type="email" name="email" 
            placeholder='Email'
            className='w-1/2 p-2 outline-none ring-1 ring-slate-400'
            ref={refEmailLogin}
            />
       
       
            <input type="password" name="password"   
            placeholder='password'
            className='w-1/2 p-2 outline-none ring-1 ring-slate-400'
            ref={refPasswordLogin}
            />
        
        <div className=" w-1/2 rounded">
           <button className='bg-blue-700 w-full text-white p-2 font-bold' type='submit'
           onClick={(e)=>{
             e.preventDefault()
             if (refEmailLogin.current.value!=='' && refPasswordLogin.current.value!=='') {
               let formData = new FormData(refFormLogin.current)
               let userLogin ={email:formData.get('email'),password:formData.get('password')}
               console.log('login',userLogin);
               mutate(userLogin)
               refEmailLogin.current.value=''
               refPasswordLogin.current.value=''
              
              }
              console.log('form must not be empty');
           }}
           >
              Sign In
           </button>
        </div>

       </form>
       <div className="">if you have not already account click here <Link to='/register' className='text-blue-600'>Register</Link></div>
      </div>
    </div>
   </>
  )
}

export default Login