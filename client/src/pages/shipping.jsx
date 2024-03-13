import React from 'react'
import { useForm } from "react-hook-form"
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation,useQueryClient } from '@tanstack/react-query'
import axios from 'axios';
import useLogin from '../hooks/useLogin';
// import { useEffect } from 'react';
import { getLocalStorage } from '../../utile/storage';
import { useNavigate } from 'react-router-dom';


const schema=yup.object().shape({
  address:yup.string().required('address required'),
  number:yup.number().typeError('Must be a number').required('Numeric field is required').positive().integer(),
}).required()

const Shipping = () => {
 const navigate = useNavigate()
 const queryClient=useQueryClient()
const {register, reset,
   handleSubmit,
   formState: { errors } 
}
=useForm({ resolver:yupResolver(schema)})

const {mutate}=useMutation({
  mutationFn:async(donne)=>{
try {
 let shipped = await axios.post('http://localhost:8000/products/order',donne,{
    headers:{
      "Authorization":getLocalStorage("token")
    }
  })
  console.log('API Res Shipping :', shipped.data);
  return shipped.data
} catch (error) {
  console.log('shippingClientError ',error);
}
  },
  onSuccess:()=>{
    queryClient.invalidateQueries(['order'])
      }
})

const onSubmit=(data)=>{
console.log(data);
mutate(data)
navigate('/order')
}




  return (
    <>
    <div className="mt-6 p-4 flex justify-center ">
        <div className="bg-white w-full  md:w-1/3  flex flex-col items-center px-2 pb-4">
        <div className="font-bold text-lg my-2 tracking-5">Shipping Address</div>
             <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col  w-full p-2'>
             
                <label htmlFor="Address" className='  font-semibold text-lg '>  
                <div className="flex flex-col">
                <span>Address ( Quartier )</span>
                <span className='text-red-400'>{errors.address?.message}</span>
              
                </div>
                <input type="text" id='Address' {...register('address')}
                className={errors.address?'border-2 border-red-400 border-solid p-2 my-2 w-full rounded-lg'
              :'border-2 border-gray-400 border-solid p-2 my-2 w-full rounded-lg'
              }/>
                 </label>
                <label htmlFor="number" className='  font-semibold text-lg '>  
                <div className="flex flex-col">
                <span> Number</span>
                <span className='text-red-400'> {errors.number?.message}</span>
             
                </div>
                <input  id="number" {...register('number')}
                className={errors.number?'border-2 border-red-400 border-solid p-2 my-2 w-full rounded-lg'
              :'border-2 border-gray-400 border-solid p-2 my-2 w-full rounded-lg'
              }/>
                 </label>
                <label htmlFor="cache" className='p-1 flex items-center font-semibold text-lg mb-2 '>  
                Cache <input type="checkbox" id='cache' {...register('cache')}
                className='form-checkbox h-5 w-5 text-indigo-600 border-indigo-600 rounded ml-2' 
                
                />
                 </label>
             
                 <input type="submit" className='bg-yellow-400 w-full p-1 text-2xl font-semibold rounded-lg' />
             </form>
        

        </div>
    </div>
    
    </>
  )
}

export default Shipping