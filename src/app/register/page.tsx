import React from 'react'
import FooterSection from '@/Components/landingPage/FooterSection';
import Navbar from '@/Components/landingPage/Navbar';
import UserRegister from '@/Components/Common/UserRegister';
const page = () => {
  return (
    <>
      <Navbar/>
     <UserRegister/>
      <FooterSection/>
    </>
  )
}

export default page
