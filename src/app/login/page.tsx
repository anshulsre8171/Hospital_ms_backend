import React from 'react'
import UserLogin from '@/Components/Common/UserLogin';
import FooterSection from '@/Components/landingPage/FooterSection';
import Navbar from '@/Components/landingPage/Navbar';
const page = () => {
  return (
    <div>
      <Navbar/>
      <UserLogin/>
      <FooterSection/>
    </div>
  )
}

export default page
