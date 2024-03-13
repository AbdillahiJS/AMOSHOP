import React from 'react'
import { Link } from 'react-router-dom'
import useCart from '../hooks/useCart'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { getLocalStorage } from '../../utile/storage'
import { MdArrowDropDownCircle } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import Menu from './menu'



const Header = () => {
  const {data}=useCart()
  const dataLogin=useQuery({
    queryKey:['login'],
    queryFn:async()=>{
      try {
       let user = await axios.get('http://localhost:8000/products/login',{
        headers:{
          "Authorization":getLocalStorage("token")
        }
       })
    
            return user.data
      } catch (error) {
        console.log(error);
      }
    }
  })

  return (
    <>
    <div className="container mt-1 bg-white shadow p-2  flex justify-around items-center rounded">
       <div className="text-xl font-semibold">
       <Link to='/'>
        AMO-SHOP
          </Link>
          
       </div>
       <nav className=" w-1/2 flex justify-end ">
        <ul className='flex items-center'>
       
       <li className='p-2 mr-1 flex items-center text-xl'>
        <span className="">
        <Menu name={dataLogin?.data?.name}/>
        
        </span>
       {/* { dataLogin?.data?.name && <MdArrowDropDownCircle />} */}
        
        </li>
         
            <Link to='carte'>
            <li className='p-2 flex  relative'>
               {/* <div className=" text-xl">Carte</div> */}
               <FaShoppingCart className='text-3xl  '/>
               <span className={`${data?.length !==0 ?"bg-red-500 text-white absolute top-0 right-0 p-1 w-5 h-5 rounded-full  flex items-center justify-center ":'hidden'}`}
               >
                {data?.length}
                </span>
            </li>
            </Link>

        
        </ul>
       </nav>
     
 
    </div>
    </>
  )
}

export default Header