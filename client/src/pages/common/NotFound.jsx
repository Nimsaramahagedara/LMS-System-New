import React from 'react'
import notFoundImage from '../../assets/notFound.svg'
import { useNavigate } from 'react-router-dom'
const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div className=' w-full md:p-40 p-20 text-center'>
        <div className='md:w-1/2 w-full mx-auto'>
        <img src={notFoundImage} alt='404 Not Found'  className='w-full h-full object-contain'/>
        </div>
        <button onClick={()=> navigate('/')} className='text-center mx-auto  mt-10 p-5 bg-blue-950 text-white font-bold'>Go Back</button>
        
    </div>
  )
}

export default NotFound