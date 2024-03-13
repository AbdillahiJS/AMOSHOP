import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import App from './App.jsx'
import LayoutApp from './components/layoutApp.jsx'
import './index.css'
import About from './pages/about.jsx'
import Home from './pages/home.jsx'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import SingleProduct from './pages/singleProduct.jsx'
import Carte from './pages/carte.jsx'
import Register from './pages/register.jsx'
import Login from './pages/login.jsx'
import ProtectedRoute from './components/protectedRoute.jsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Shipping from './pages/shipping.jsx'
import Order from './pages/order.jsx'
import SingleOrder from './pages/singleOrder.jsx'






const queryClient =new QueryClient()

let router =createBrowserRouter([
  {
    path:'/',
    element:<LayoutApp/>,
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path:'about',
        element:<About/>
      },
      {
        path:':id',
        element:<SingleProduct/>
      },
      {
        path:'carte',
        element:<ProtectedRoute><Carte/></ProtectedRoute>
      },
      {
        path:'shipping',
        element:<ProtectedRoute><Shipping/></ProtectedRoute>
      },
      {
        path:'order',
        element:<ProtectedRoute><Order/></ProtectedRoute>
      },
      {
        path:'order/:id',
        element:<SingleOrder/>
      },
    ]
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<QueryClientProvider client={queryClient}>
    <RouterProvider router={router}/>
    <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
  </React.StrictMode>,
)
