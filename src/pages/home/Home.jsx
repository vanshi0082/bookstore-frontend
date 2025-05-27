import React from 'react'
import ChatBot from './ChatBot'
import Banner from './Banner'
import TopSellers from './TopSellers'
import Recommened from './Recommened'
import News from './News'
import Banner2 from './Banner2'

const Home = () => {
  return (
    <>
        <ChatBot/>
        <Banner/>
        <TopSellers/>
        <Banner2/>
        <Recommened/>
        <News/>
    </>
  )
}

export default Home