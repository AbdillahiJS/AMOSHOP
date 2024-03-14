import { useQuery } from '@tanstack/react-query'
import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading';


const Home = () => {
 
  const {data,isLoading,isSuccess,isError} =useQuery({
    queryKey:['allProduct'],
    queryFn:async()=>{
     
        let response =await fetch('http://localhost:8000/products')
      let res = await response.json()
      return res
        
     
    }
  })



  
if(isLoading){

  return <div className="mt-[10%] p-4 text-center mt-4 font-semibold text-xl flex items-center justify-center">
    <ReactLoading type={'spin'} color={'#0e1cdb'} height={40} width={40}  className='mr-2'/>
     Loading ...</div>
}
  

  return (
    <>
    <div className="">

      <div className="container flex flex-col md:grid grid-cols-4 gap-3 p-2 mb-1 mt-4">
        {data?.allProducts?.map(product=>{
    return <div className=" bg-white shadow-sm shadow-black rounded  w-full p-2 md:w-full  flex flex-col items-center justify-center " key={product._id}>
      <Link to={`${product._id}`}>
     
            <div className=" h-28 w-full ">
              <img src={product.image} alt="" className='h-full w-full '/>
              </div>
              <div className="h-1/2">
                <div className="font-semibold text-lg">
                Title : <span className="">{product.title}</span>
                </div>
                <div className="font-semibold text-lg">
               Price : <span className="">${product.price}</span>
                
                  </div>
                <div className="font-semibold ">
                 <p className='break-all text-slate-500'>descriptdescripdescripdescripdescripdescripdescrip
                  descrip
                  
                  </p>
                </div>
                <div className="font-semibold text-lg">
                  status : <span className="text-green-600">{product.status}</span>
                </div>
              </div>
      </Link>
            </div>

        })}
    </div>
    </div>
    </>
  )
}

export default Home