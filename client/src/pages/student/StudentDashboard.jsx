import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/LandingPage/Header'
import Footer from '../../components/LandingPage/Footer'
import Cookies from 'js-cookie'
import TopNav from '../../components/StudentDashboard/TopNav'
const StudentDashboard = () => {
    const [isLoggedIn, setLogging] = useState();
    useEffect(() => {
        const userRole = Cookies.get('userRole');
        if(userRole){
            setLogging(true);
        }
    }, [])
    return (
        <>
            <Header isLoggedIn={isLoggedIn}/>
            <TopNav/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default StudentDashboard