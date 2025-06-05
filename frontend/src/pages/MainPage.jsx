import React from 'react'
import NavBar from '../components/NavBar'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import TestimonialsSection from '../components/TestimonialsSection'
import Footer from '../components/Footer'

const MainPage = () => {
  return (
    <div>
      <NavBar/>
      <HeroSection/>
      <FeaturesSection/>
      <TestimonialsSection/>
      <Footer/>
    </div>
  )
}

export default MainPage