import React from 'react'
import Nav from '../../Nav'
import AboutHero from './AboutHero'
import Footer from '../../Footer'
import Contactinfo from '../../Home/Contactinfo'
import WhatWeDo from './WhatWeDo'
import AboutStudy from './AboutStudy'
import WhyChoose from './WhyChoose'

const About = () => {
  return (
    <>
    <Nav/>
    <AboutHero/>
    <WhatWeDo/>
    <AboutStudy/>
    <WhyChoose/>
    <Contactinfo/>

    <Footer/>
    </>
  )
}

export default About
