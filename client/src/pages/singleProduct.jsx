import { useQuery,useMutation,useQueryClient, QueryClient } from '@tanstack/react-query'
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { getLocalStorage } from '../../utile/storage';
import ReactLoading from 'react-loading';

const SingleProduct = () => {
 const  queryClient = useQueryClient();
 const navigate =useNavigate()
   const { id } = useParams()
   const {data:singleProduct,isLoading} =useQuery({
    queryKey:['allProduct',id],
    queryFn:async()=>{
      let response =await fetch(`http://localhost:8000/products/${id}`)
    let res = await response.json()
    return res
    }
  })
  console.log('singleProduct ',singleProduct);

const {mutate,isSuccess,data}=useMutation({
  mutationFn:async(donne)=>{

  let addCarte = await axios.post('http://localhost:8000/cart',donne,{
    headers:{
      "Authorization":getLocalStorage("token")
    }
  })
  console.log('API Response:', addCarte);
  return addCarte.data
},
onSuccess:(data)=>{
  console.log('cool success',data);
  queryClient.invalidateQueries(['allProduct',id]);
 
}
}
)

if(isLoading){

  return <div className="mt-[10%] p-4 text-center mt-4 font-semibold text-xl flex items-center justify-center">
    <ReactLoading type={'spin'} color={'#0e1cdb'} height={40} width={40}  className='mr-2'/>
     Loading ...</div>
}




  return (
    <>
   <div className="mt-4 p-2 flex justify-center items-center h-1/2 ">
    <div className="p-2 rounded bg-white  md:w-2/3   flex flex-col md:flex-row ">
    <div className="w-full md:w-1/3 ">
         <img src={singleProduct?.image} alt=""
         className='w-full h-full'
         />
    </div>
    <div className="text-xl w-full p-1 ml-1  flex flex-col justify-between">
      <div className="font-semibold text-lg">
       Title: <span className="">{singleProduct?.title}</span>
        
      </div>
      <div className="font-semibold">
     Price: <span className=""> ${singleProduct?.price} </span> 
      </div>
      <div className="text-slate-500 text-md">
        <p className="break-all">
         Lorem ipsum dolor sit amet consectetur adipisicing elit. 
         Eos deserunt nemo laborum consectetur maxime, a, repellendus 
         debitis enim aliquid voluptatem similique alias unde iure mollitia 
         aliquam voluptate natus, asperiores accusamus.
        </p>
      </div>
      <div className="font-semibold mt-2">
      status: <span className="text-green-500">{singleProduct?.status}</span>
      </div>
      <div className="mt-2">
        <button className='bg-yellow-500 w-full md:w-1/2 p-2 rounded text-white font-bold'
        onClick={()=>{
          if (getLocalStorage("token") ) {
            mutate(singleProduct)
          }
          navigate('/carte')
        }}
        >Add to the cart</button>
      </div>

    </div> 
    </div>
   
   </div>
    </>
  )
}

export default SingleProduct


