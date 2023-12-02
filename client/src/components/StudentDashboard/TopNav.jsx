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
                <Link to={'/portal'} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white'>
                    Home
                </Link>
                <Link to={'/portal/class'} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white'>
                    Class
                </Link>
                <Link to={'/portal/subject'} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white'>
                    Subjects
                </Link>
                <Link to={'/portal/marks'} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white'>
                    Marks
                </Link>
                <Link to={'/portal/notices'} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white relative'>
                    Notices
                    <span className='absolute top-1 right-0 rounded-md  bg-red-500 text-xs text-center flex justify-center items-center'>
<span className='w-6 p-1 h-6'>20</span>
                    </span>
                </Link>
            </div>
            <div className={`lg:hidden bg-gray-300 relative`}>
                <button className='p-5 ' onClick={handleMenuExpand}><MenuIcon/></button>
                <div className = {`w-full absolute top-16 left-0 z-10 transition-all ease-in-out duration-300 flex-col ${open ? 'flex' : 'hidden'}`}>
                    <Link to={'/portal'} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white'>
                        Home
                    </Link>
                    <Link to={'/portal/class'} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white'>
                        Class
                    </Link>
                    <Link to={'/portal/subject'} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white'>
                        Subjects
                    </Link>
                    <Link to={'/portal/marks'} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white'>
                        Marks
                    </Link>
                    <Link to={'/portal/notices'} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white'>
                        Notices
                    </Link>

                </div>
            </div>
        </>
    )
}

export default TopNav