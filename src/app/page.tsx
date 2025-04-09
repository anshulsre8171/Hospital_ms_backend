import AwardSection from "@/Components/landingPage/AwardSection"
import Booking from "@/Components/landingPage/Booking"
import Carousel from "@/Components/landingPage/Carousel"
import Cout from "@/Components/landingPage/Cout"
import FeedbackCarousel from "@/Components/landingPage/FeedbackCarousel"
import Partners from "@/Components/landingPage/Partners"
import PersonalCare from "@/Components/landingPage/PersonalCare"
import Services from "@/Components/landingPage/Services";

import Navbar from "@/Components/landingPage/Navbar";
import FooterSection from "@/Components/landingPage/FooterSection"
export default function Home() {
  return (
    <>
      <Navbar />
      <Carousel />
      <PersonalCare />
      <Cout />
      <AwardSection />
      <Services />
      <Booking />
      <FeedbackCarousel />
      <Partners /> 
      <FooterSection />
    </>
  )
}
