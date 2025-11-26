import React from 'react'
import Footer from '../../Footer'
import ServicesHero from './ServicesHero'
import ServicesDetails from './ServicesDetails'
import OurProcess from './OurProcess'
import Contactinfo from '../../Home/Contactinfo'
import Nav from '../../Nav'

const Services = () => {
  return (
   <>
  <Nav/>
   <ServicesHero/>
   <ServicesDetails/>
   <OurProcess/>
   <Contactinfo/>
   <Footer/>

   </>
  )
}

export default Services
