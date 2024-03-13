import React from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { removeLocalStorage } from '../../utile/storage'
import { useNavigate } from 'react-router-dom'


const Menu = ({name}) => {
  const navigate = useNavigate()
  return (
   <>
    <DropdownMenu >
  <DropdownMenuTrigger>{name}</DropdownMenuTrigger>
  <DropdownMenuContent className="bg-white">
    <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
       <button className='w-full p-1 font-semibold rounded bg-slate-500 text-white'
       onClick={()=>{
        removeLocalStorage("token")
        navigate('/login')
       }}
       >Log out</button>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
   
   </>
  )
}

export default Menu