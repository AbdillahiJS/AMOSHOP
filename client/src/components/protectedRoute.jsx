import React from 'react'
import { Navigate } from 'react-router-dom';
import { getLocalStorage } from '../../utile/storage'


const ProtectedRoute = ({children}) => {
    console.log('store',!!getLocalStorage('token'));
  
 if (!!getLocalStorage('token')) {
    return children
 }   
 return <Navigate to='/login'/>
 
}

export default ProtectedRoute