import React,{useState,useEffect} from 'react'
import { useQuery,useMutation,useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import SingleCart from './singleCart'
import useCart from '../hooks/useCart'
import { Link, useNavigate } from 'react-router-dom'
import { getLocalStorage } from '../../utile/storage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';

const Carte = () => { 
const navigate =  useNavigate()
const queryClient=useQueryClient()
let {data,isLoading,refetch} =useQuery({
  queryKey:['cart'],
  queryFn:async()=>{
    try {
        let cart = await axios.get('http://localhost:8000/cart',{
          headers:{
            "Authorization":getLocalStorage("token")
          }
         })
    
        return cart.data
    } catch (error) {
      console.log('orderClientError',error);
    }
  }
 })


let {data:order} =useQuery({
  queryKey:['order'],
  queryFn:async()=>{
    try {
        let orderRes = await axios.get('http://localhost:8000/products/order',{
          headers:{
            "Authorization":getLocalStorage("token")
          }
         })
        // console.log(orderRes);
        return orderRes.data
    } catch (error) {
      console.log('orderClientError',error);
    }
  }
 })


 

  const { mutate } = useMutation({
    mutationFn:async(donne)=>{
        try {
            let updatedOrderProductCart = await axios.put(`http://localhost:8000/products/order/${order?.order?._id}`,donne,{
              headers:{
                "Authorization":getLocalStorage("token")
              }
             })
            return updatedOrderProductCart.data
        } catch (error) {
            console.log('error',error);
        }
          },
          onSuccess:()=>{
            queryClient.invalidateQueries({ queryKey: ['order'] })
         
          }
  });

 console.log('carteDataBelong ',data);


// console.log('address and number  ',!!order?.order?.address && !!order?.order?.number);
  let handleRefetch=()=>{
    refetch()
  }



let total=data?.reduce((acc,curr)=>{
return parseInt(acc)+parseInt(curr.price)*curr.quantity
  },0)

  if(isLoading){

    return <div className="mt-[10%] p-4 text-center mt-4 font-semibold text-xl flex items-center justify-center">
      <ReactLoading type={'spin'} color={'#0e1cdb'} height={40} width={40}  className='mr-2'/>
       Loading ...</div>
  }
  

  return (
    <> 
  
<div className="container flex flex-col md:flex-row md:justify-between mt-4 ">
  <ToastContainer/>
  {
    isLoading || data?.length === 0 ?(<div className="bg-white mb-2 px-2 md:w-1/2 mt-1 w-full shadow flex items-center font-semibold text-xl">
    Your cart is empty please return the home page <Link to='/' className='underline text-blue-500 ml-1'> back Home</Link>
     </div>):

    (  <div className="flex flex-col md:w-1/2 ">
      { 
      data?.map(cart=>{
          return <SingleCart {...cart}  key={cart._id} handleRefetch={handleRefetch} />
          
 })
   
}
 </div>)

}


    <div className="bg-white shadow-sm shadow-black md:shadow mx-2 md:w-1/3 flex flex-col justify-around items-center space-y-4 py-1">
<div className="font-bold text-xl">
  Items ({data?.length})
</div>

  {
    data?.map(item=>{
      return <div className="flex w-1/2 justify-around p-1 text-md text-slate-500 font-medium" key={item._id}>
             <div className="">{item.title}</div>
             <div className="">{item.price}*{item.quantity}</div>
      </div>
    })
  }


<div className="font-medium text-xl">
 total: ${total}
</div>
<div className="">
  <button className='bg-yellow-500 p-2 rounded text-xl text-white font-bold'
 onClick={()=>{
 
  if(data?.length===0 ){
toast.warning(`Your cart is Empty please go Shopping First `)
  }
  else if(!!order?.order?.address && !!order?.order?.number){
    mutate(data)
    navigate('/order')
  }
  else{

    navigate('/shipping')
  }
 }}
  >Proceed the checkOut</button>
</div>
    </div>
   

</div>

</>

)}

export default Carte