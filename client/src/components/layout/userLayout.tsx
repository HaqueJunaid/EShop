import React from 'react'
import Header from '../common/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../common/Footer'

const UserLayout: React.FC = () => {
  return (
    <div className='flex flex-col'>
      <div className='fixed w-full z-50 bg-white/90 backdrop-blur-sm shadow-sm'>
      <Header />
      </div>
      <main className='flex-1 mt-23 md:mt-45'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default UserLayout
