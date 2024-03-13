import React from 'react'
import { useForm } from "react-hook-form"
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getLocalStorage } from '../../utile/storage';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogClose,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

  const schema=yup.object().shape({
    address:yup.string().required('address required'),
    number:yup.number().typeError('Must be a number').required('Numeric field is required').positive().integer(),
  }).required()


const ShippingUpdate = ({Edit,id}) => {
const {register, reset,
        handleSubmit,
        formState: { errors } 
       } =useForm({ resolver:yupResolver(schema)})

const queryClient =useQueryClient()

const  {mutate} =useMutation({
        mutationFn:async(donne)=>{
         let updateShippingInfo = await axios.put(`http://localhost:8000/products/order/shipping/${id}`,donne,{
          headers:{
            "Authorization":getLocalStorage("token")
          }
         }) 
        //  console.log(updateShippingInfo.data);
         return updateShippingInfo.data
        },
        onSuccess:()=>{
          queryClient.invalidateQueries(['order'])
        }
       })


     const onSubmit=(data)=>{
        console.log(data);
        mutate(data)
        toast.success('Successfull updated your shipping Address')
        reset()
        }

  return (
    <>
  <ToastContainer/>

     <Dialog>
      <DialogTrigger asChild>
       { Edit}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Shipping Address</DialogTitle>
        </DialogHeader>
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
                 
        {/* <DialogClose asChild> */}
        <input type="submit" value='Save' className='mt-2 bg-yellow-400 w-full p-1 text-2xl font-semibold rounded-lg' />
            
          {/* </DialogClose>  */}
          

             </form>
      </DialogContent>
    </Dialog>

    
    </>
  )
}

export default ShippingUpdate