import React from 'react'
import schoolLogo from '../../assets/school.jpeg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../pages/common/AuthContext';

const Header = ({ isLoggedIn = false }) => {
    const navigate = useNavigate();
    const {logout} = useAuth();

    return (
        <div className='flex items-center lg:flex-row flex-col justify-between bg-white  border-t-8 border-blue-950 space-y-3 lg:space-y-0'>
            <div className='flex items-center lg:w-auto w-full'>
                <div className='w-72 aspect-video bg-blue-950'>
                    <img src={schoolLogo} alt="logo" className='w-full h-full object-contain' />
                </div>
                <div>
                    <h1 className='lg:text-4xl text-xl text-blue-950 font-bold px-3'>Darmapala Knowledge Board</h1>
                </div>
            </div>
            {
                isLoggedIn ?  <div className='space-y-3 px-4 mx-12'>
                <button className='px-12 py-3 bg-gray-300 hover:bg-gray-400' onClick={() => logout()}>LMS Log Out</button><br />
                <a href="#" className='text-yellow-500 block'>Change Your Password ?</a>
            </div> : <div className='space-y-3 px-4 mx-12'>
                    <h4>Login Using Your Account</h4>
                    <button className='px-12 py-3 bg-gray-300 hover:bg-gray-400' onClick={() => navigate('/login')}>LMS Login</button><br />
                    <a href="#" className='text-yellow-500 block'>Forgot Your Password ?</a>
                </div>
            }

        </div>
    )
}

export default Header