import React from 'react'
import FooterSection from '@/Components/landingPage/FooterSection';
import Navbar from '@/Components/landingPage/Navbar';
import ForgetPassword from '@/Components/Common/ForgetPassword';
const page = () => {
  return (
    <div>
      <Navbar />
      <ForgetPassword />
      <FooterSection />
    </div>
  )
}

export default page
