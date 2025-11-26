import React from 'react'
import Nav from '../Nav'
import Herosec from './Herosec'
import Services from './Services'
import Universitiessec from './Universitiessec'
import Stories from './Stories'
import Contactinfo from './Contactinfo'
import Footer from '../Footer'

const Home = () => {
  return (
    <div>
     <Nav/>
      <Herosec/>
      <Services/>
      <Universitiessec/>
      <Stories/>
      <Contactinfo/>
      <Footer/>

    </div>
  )
}

export default Home
