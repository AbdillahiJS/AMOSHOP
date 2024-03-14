import { useQueryClient,useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';

import { FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { getLocalStorage } from '../../utile/storage';



const SingleCart = ({image,title,price,quantity,_id,handleRefetch}) => {
  const [selectedValue, setSelectedValue] = useState(quantity);
let navigate =useNavigate()

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn:async()=>{
        try {
            let updatedProductQty = await axios.put(`http://localhost:8000/products/${_id}`,{data:parseInt(selectedValue)},{
              headers:{
                "Authorization":getLocalStorage("token")
              }
             })
            return updatedProductQty.data
        } catch (error) {
            console.log('error',error);
        }
          },
          onSuccess:(data)=>{
            queryClient.invalidateQueries({ queryKey: ['cart',id] })
            setSelectedValue(data)
            // console.log('updateData',data);
          }
  });
  const mutation = useMutation({
    mutationFn:async()=>{
        try {
            let deleteItem = await axios.delete(`http://localhost:8000/products/${_id}`, 
            {
              headers:{
              "Authorization":getLocalStorage("token")
            }
           })
            return deleteItem.data
        } catch (error) {
            console.log('error',error);
        }
          },
          onSuccess:(data)=>{
         queryClient.invalidateQueries({ queryKey: ['cart',id] })
            console.log('deletData ',data);
          }     
            
          
          
         
  });

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  mutate(selectedValue);
    
  };
  
  useEffect(()=>{
    // navigate('/carte')
    console.log('fromthebase');
    console.log('checkedIt',selectedValue)
    handleRefetch()

    })



  return (
  <>
    <div className="bg-white shadow-sm shadow-gray-400 justify-between items-center mb-2 flex p-1">
      <div className="w-[15%]">
        <img src={image} alt="" 
        className="w-full h-full"
        />
      </div>
      <div className="">
       {title}
      </div>
      <div className="">
        ${price}
      </div>
<div className="text-xl ring-1 ring-black w-1/3 rounded-md">
<select id="mySelect"  value={selectedValue}  onChange={handleSelectChange} className='w-full p-1'>
{/* value={selectedValue} */}
    <option value={1}>1</option>
    <option value={2}>2</option>
    <option value={3}>3</option>
    <option value={4}>4</option>
    <option value={5}>5</option>
    <option value={6}>6</option>
    <option value={7}>7</option>
    <option value={8}>8</option>
    <option value={9}>9</option>
    <option value={10}>10</option>
  </select>
</div>
<div className=" p-1 cursor-pointer">
<FaTrash 
 onClick={()=>{
  mutation.mutate(_id)
  console.log('mutation Delete');
 }} 
/>
</div>

    </div>
    
  
   </>
  )
}

export default SingleCart