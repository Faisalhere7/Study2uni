import React from 'react'
import ContactDetails from './ContactDetails'
import Nav from '../../Nav'
import ContactHero from './ContactHero'
import Faq from './Faq'
import Contactinfo from '../../Home/Contactinfo'
import Footer from '../../Footer'

const Contact = () => {
  return (
    <>
    <Nav/>
    <ContactHero/>
    <ContactDetails/>
    <Faq/>
    <Contactinfo/>
    <Footer/>
    </>
  )
}

export default Contact
