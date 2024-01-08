import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
const TopNav = () => {
    const [open , toggleOpen] = useState(false);
    const handleMenuExpand = ()=>{
        toggleOpen((prev) => !prev );
    
    }

    return (
        <>
            <div className='items-center lg:px-10 bg-gray-400 hidden lg:flex'>
                <Link to={'/'} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white'>
                    Home
                </Link>
                <Link to={'/'} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white'>
                    Classes
                </Link>
                <Link to={'/'} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white'>
                    Support
                </Link>
                <Link to={'/'} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white'>
                    Resources
                </Link>
                <Link to={'/'} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white'>
                    Notices
                </Link>
                
            </div>
            <div className={`lg:hidden bg-gray-300 relative`}>
                <button className='p-5 ' onClick={handleMenuExpand}><MenuIcon/></button>
                <div className = {`w-full absolute top-16 left-0 z-10 transition-all ease-in-out duration-300 flex flex-col ${open ? 'visible' : 'invisible'} transform ${open ? 'scale-x-100' : 'scale-x-0'}`}>
                    <Link to={'/'} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white'>
                        Home
                    </Link>
                    <Link to={'/'} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white'>
                        Classes
                    </Link>
                    <Link to={'/'} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white'>
                        Support
                    </Link>
                    <Link to={'/'} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white'>
                        Resources
                    </Link>
                    <Link to={'/'} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white'>
                        Notices
                    </Link>
                    

                </div>
            </div>
        </>
    )
}

export default TopNav