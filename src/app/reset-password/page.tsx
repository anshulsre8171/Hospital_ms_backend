import React from 'react'
import FooterSection from '@/Components/landingPage/FooterSection';
import Navbar from '@/Components/landingPage/Navbar';
import ResetPassword from '@/Components/Common/ResetPassword';
const page = () => {
  return (
    <div>
     <Navbar/>
     <ResetPassword/>
     <FooterSection/>
    </div>
  )
}

export default page
