import React from 'react'
import Header from '../common/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../common/Footer'

const UserLayout: React.FC = () => {
  return (
    <div className='flex flex-col'>
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default UserLayout
