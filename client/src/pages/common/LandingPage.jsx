import React from 'react'
import Header from '../../components/LandingPage/Header'
import TopNav from '../../components/LandingPage/TopNav'
import { Carasoul } from '../../components/LandingPage/Carasoul'
import MiddleBarOnCarasoul from '../../components/LandingPage/MiddleBarOnCarasoul'

const LandingPage = () => {
  return (
    <>
      <Header />
      <TopNav />
      <div className='relative'>
        <Carasoul />
        <MiddleBarOnCarasoul />
      </div>

    </>
  )
}

export default LandingPage