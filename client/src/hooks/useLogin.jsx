import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { getLocalStorage } from '../../utile/storage'

const useLogin = () => {
    const {data}=useQuery({
        queryKey:['allProduct','login'],
        queryFn:async()=>{
          try {
           let user = await axios.get('http://localhost:8000/products/login',{
            headers:{
              "Authorization":getLocalStorage("token")
            }
           })
           console.log(data);
           return user.data
          } catch (error) {
            console.log(error);
          }
        }
      })
  return {user:data?.user}
}

export default useLogin