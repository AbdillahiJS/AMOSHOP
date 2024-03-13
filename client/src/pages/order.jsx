
import React,{useEffect} from 'react'

import { useNavigate } from 'react-router-dom'
import { useQuery,useMutation, useQueryClient} from '@tanstack/react-query'
import axios from 'axios'
import { getLocalStorage } from '../../utile/storage'
import ShippingUpdate from '../components/shippingUpdate'
import ReactLoading from 'react-loading';


const Order = () => {
 const navigate = useNavigate()
 let queryClient =useQueryClient()

 let {data:order,isLoading,refetch} =useQuery({
  queryKey:['order'],
  queryFn:async()=>{
        let orderRes = await axios.get('http://localhost:8000/products/order',{
          headers:{
            "Authorization":getLocalStorage("token")
          }
         })
    
        return orderRes.data
  }

 })

 let {mutate}=useMutation({
  mutationFn:async(donne)=>{
   let postSingle = await axios.post(`http://localhost:8000/products/order/${order?.order?._id}`,donne,{
    headers:{
      "Authorization":getLocalStorage("token")
    }
   })
   return postSingle.data
  },
  onSuccess:(data)=>{
    queryClient.invalidateQueries(['order',id])
    console.log(data);
  }
 })
  


// console.log(order);
let totalOrder=order?.order?.productOrdered?.reduce((acc,curr)=>{
  return parseInt(acc)+parseInt(curr.price)*curr.quantity
},0)



if(isLoading){

  return <div className="mt-[10%] p-4 text-center mt-4 font-semibold text-xl flex items-center justify-center">
    <ReactLoading type={'spin'} color={'#0e1cdb'} height={40} width={40}  className='mr-2'/>
     Loading ...</div>
}



  return (
    <>

    <div className="container flex flex-col mb-3 sm:flex-col md:flex-row" >
<div className=" w-full md:w-2/3 p-2 flex flex-col items-center ">
  <div className="bg-white p-2 rounded w-1/2 mb-2">
<h1 className="font-semibold text-lg">Preview Your   Order</h1>
  </div>



  <div className="bg-white w-full md:w-1/2 mb-1 py-2 px-1 shadow ">
  <div className=" flex justify-around items-center p-1"> 
  <h1 className=' md:w-full  mb-2 font-semibold text-xl underline underline-offset-4 '> Personal Info</h1>
{/* <button className='bg-blue-600 px-2 py-1 rounded-sm text-white'>Edit</button> */}
  
  </div>

    <div className="">
<span className="font-semibold text-lg">Name :</span>
<span className=""> {order?.order?.name} </span>
    </div>

    <div className="">
<span className="font-semibold text-lg">Email :</span>
<span className=""> {order?.order?.email}</span>
    </div>

    </div>
 

    <div className="bg-white w-full md:w-1/2 mb-2 py-2 px-1 shadow">
    <div className=" flex justify-between items-center md:justify-around p-1"> 
<h1 className=' md:w-full mb-1 font-semibold text-xl underline underline-offset-4 '>Shipping Address</h1>
<ShippingUpdate Edit={<button className='bg-blue-600 px-2 py-1 rounded-sm text-white'>Edit</button>} id={order?.order?._id}/>


    </div>
    <div className="">
<span className="font-semibold text-lg"> Address :</span>
<span className=""> {order?.order?.address}</span>
    </div>

    <div className="">
<span className="font-semibold text-lg">Number :</span>
<span className=""> {order?.order?.number}</span>
    </div>

    <div className="">

    <span className="font-semibold text-lg">Method :</span>
<span className=""> {order?.order?.cache?"Cache":''}</span>
  </div>   

  </div>


  <div className="bg-white w-full md:w-1/2 shadow">
    <div className="flex justify-between items-center md:justify-around p-1">
<h1 className=' md:w-full  mb-1 font-semibold text-xl underline underline-offset-8'> Your Cart Items</h1>
<button className='bg-blue-600 px-2 py-1 rounded-sm text-white'
onClick={()=>{
  navigate('/carte')
}}
>Edit</button>
    </div>
{
  order?.order?.productOrdered.map(orderedCarte=>{
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
<div className=" bg-white md:w-1/4 md:h-1/3 flex flex-col  items-center p-1 mt-2 mx-2 shadow shadow-black  mb-6 ">
<h1 className='w-full md:w-full  mb-1 font-semibold text-lg flex justify-center'> Order Summary</h1>

 <div className="font-semibold text-lg mb-2">
  Items ( {order?.order?.productOrdered?.length} )
 </div>
 <div className="font-semibold text-lg mb-2">
Total Order : ${totalOrder}
 </div>

  <div className=" w-1/2 mb-1 rounded">
  <button className='bg-yellow-500 p-1 font-semibold text-lg w-full text-white rounded'
  onClick={()=>{
    mutate({total:totalOrder,isOrderFinished:true})
    // refetch()
    navigate(`${order?.order?._id}`)
  }}
  >Submit Your Order</button>
 </div>
 
</div>

    </div>
    
    </>
  )
}

export default Order