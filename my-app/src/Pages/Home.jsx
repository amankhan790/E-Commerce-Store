import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import Category from '../Components/Category'
import Trending from '../Components/Trending'

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Category />
      <Trending />
    </>
  )
}

export default Home