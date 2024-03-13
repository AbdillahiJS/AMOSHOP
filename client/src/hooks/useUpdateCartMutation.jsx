import React from 'react'
import { useState } from 'react';
import { useQueryClient,useMutation } from '@tanstack/react-query';
import axios from 'axios';
import useCart from './useCart';



const useUpdateCartMutation = () => {

    const [selectedValue, setSelectedValue] = useState(1);
    const {data:cart} =useCart()

    const queryClient = useQueryClient()
    const { mutate,data } = useMutation({
      mutationFn:async()=>{
          try {
              let updatedProductQty = await axios.put(`http://localhost:8000/products/${cart._id}`,{data:parseInt(selectedValue)})
              return updatedProductQty.data
          } catch (error) {
              console.log('error',error);
          }
            },
            onSuccess:(data)=>{
              queryClient.invalidateQueries({ queryKey: ['cart',id] })
              setSelectedValue(data)
            }
    });
    
    
    
    const handleSelectChange = (event) => {
      setSelectedValue(event.target.value);
      console.log('checkedIt',selectedValue)
      mutate(selectedValue);
      
    };
    
    




  return {data,handleSelectChange,selectedValue}
}

export default useUpdateCartMutation