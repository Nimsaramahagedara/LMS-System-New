import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
const TopNav = () => {
    const [open, toggleOpen] = useState(false);
    const [noticesCount, setNotices] = useState([]);
    const getAllNotices = async () => {
        try {
            const allnotes = await authAxios.get(`${apiUrl}/notices/student`);
            setNotices(allnotes.data.length);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    useEffect(() => {
        getAllNotices();
    }, []);
    const handleMenuExpand = () => {
        toggleOpen((prev) => !prev);

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
                        <span className='w-6 p-1 h-6'>{noticesCount}</span>
                    </span>
                </Link>
                <Link to={'/portal/message'} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white'>
                    Request Advice
                    </Link>
                <Link to={'/portal/profile'} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white'>
                    Profile
                </Link>
                
            </div>
            <div className={`lg:hidden bg-gray-300 relative`}>
                <button className='p-5 ' onClick={handleMenuExpand}><MenuIcon /></button>
                <div className={`w-full absolute top-16 left-0 z-10 transition-all ease-in-out duration-300 flex-col ${open ? 'flex' : 'hidden'}`}>
                    <Link to={'/portal'} onClick={handleMenuExpand} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white'>
                        Home
                    </Link>
                    <Link to={'/portal/class'} onClick={handleMenuExpand} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white'>
                        Class
                    </Link>
                    <Link to={'/portal/subject'} onClick={handleMenuExpand} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white'>
                        Subjects
                    </Link>
                    <Link to={'/portal/marks'} onClick={handleMenuExpand} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white'>
                        Marks
                    </Link>
                    <Link to={'/portal/notices'} onClick={handleMenuExpand} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white'>
                        Notices
                    </Link>
                    <Link to={'/portal/message'} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white'>
                    Request Advice
                    </Link>
                    <Link to={'/portal/profile'} onClick={handleMenuExpand} className='text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white'>
                        Profile
                    </Link>
                    

                </div>
            </div>
        </>
    )
}

export default TopNav