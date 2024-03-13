import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getLocalStorage } from '../../utile/storage'
import ReactLoading from 'react-loading';


const SingleOrder = () => {
 const {id}=useParams()

let {data,refetch,isLoading} = useQuery({
  queryKey:['order',id],
  queryFn:async()=>{
    let singleOrder = await axios.get(`http://localhost:8000/products/order/${id}`,{
      headers:{
        "Authorization":getLocalStorage("token")
      }
     })
    return singleOrder.data
  }
})




 setTimeout(()=>{
    refetch()
 console.log('refetch in the single order');
   },100)

   



   if(isLoading){

    return <div className="mt-[10%] p-4 text-center mt-4 font-semibold text-xl flex items-center justify-center">
      <ReactLoading type={'spin'} color={'#0e1cdb'} height={40} width={40}  className='mr-2'/>
       Loading ...</div>
  }

  return (
    <>
   <div className="container mt-3 flex flex-col md:flex-row py-2">
    <div className="   md:w-2/3   flex flex-col items-center ">
    <h1 className="bg-white w-1/2 my-1 p-2 text-xl font-semibold shadow-gray-500 shadow mb-2 rounded">Order ID : {data?._id}</h1>
    <div className=" w-full md:w-1/2 bg-white p-2 mb-2 shadow-gray-500 shadow rounded">
<h1 className="text-xl font-bold ">Shipping</h1>
<div className="my-1">
  <span className="text-lg font-semibold">Name :</span>
  <span className="">{data?.name}</span>
</div>
<div className="my-1">
  <span className="text-lg font-semibold">Address :</span>
  <span className="">{data?.address}</span>
</div>
<div className="my-1">
  <span className="text-lg font-semibold ">Number :</span>
  <span className="">{data?.number}</span>
</div>
<div className= {data?.isDelivered?"bg-green-300 py-2 px-1 rounded text-md font-semibold":"bg-red-300 py-2 px-1 rounded text-md font-semibold"}>
  <span className="">{data?.isDelivered? 'Done ':'Not Delivered'}</span>
  
</div>
</div>
    <div className=" w-full md:w-1/2 bg-white p-2 mb-2 shadow-gray-500 shadow rounded">
<h1 className="text-xl font-bold ">Payment</h1>
<div className="my-1">
  <span className="text-lg font-semibold">Method :</span>
  <span className="">{data?.cache&&' Cache'}</span>
</div>


<div className= {data?.isPaid?"bg-green-300 py-2 px-1 rounded text-md font-semibold":"bg-red-300 py-2 px-1 rounded text-md font-semibold"}>
  <span className="">{data?.isDelivered? 'Paid ':'Not Paid'}</span>
  
</div>
</div>


<div className=" w-full md:w-1/2 bg-white p-2 mb-2 shadow-gray-500 shadow rounded">
<h1 className="text-xl font-bold mb-1">Cart Item</h1>
{
  data?.productOrdered.map(orderedCarte=>{
    return <div key={orderedCarte._id} className="p-2 mb-2 flex justify-between items-center">
         <div className="w-20 h-20 ">
          <img src={orderedCarte.image} alt="" className='w-full h-full object-cover'/>
         </div>
         <div className="font-semibold text-lg">
          {orderedCarte.title}
         </div>
         <div className="font-semibold text-lg">
          ${orderedCarte.price}*{orderedCarte.quantity}
         </div>
         <div className="font-semibold text-lg">
          ${orderedCarte.price*orderedCarte.quantity}
         </div>
    </div>
  })
}
  </div>
</div>
   



   

    <div className=" bg-white w-full md:w-1/3 md:h-32 ml-2 p-2 flex flex-col items-center mt-2 shadow-gray-500 shadow rounded">
    <h1 className="text-xl font-bold"> Order Summary </h1>
    <div className="text-lg font-semibold"> Item ( {data?.productOrdered.length} )</div>
    <div className="text-lg font-semibold"> Total Order <span className='font-bold'>${data?.total}</span></div>
    </div>
   </div>
    </>
  )
}

export default SingleOrder