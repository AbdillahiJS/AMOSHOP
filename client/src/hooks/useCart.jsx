import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { getLocalStorage } from '../../utile/storage'

const useCart = () => {
    const {data}=useQuery({
        queryKey:['cart'],
        queryFn:async()=>{
          try {
           let cart = await axios.get('http://localhost:8000/cart',{
            headers:{
              "Authorization":getLocalStorage("token")
            }
           })
          //  console.log(cart?.data);
           return cart.data
          } catch (error) {
            console.log(error);
          }
        }
      })
  return {data}
}

export default useCart