import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'

const LayoutApp = () => {
  return (
    <>
    <div className=''>
    <Header/>

        <div>
            <Outlet/>
        </div>
  
  </div>
    </>
  )
}

export default LayoutApp