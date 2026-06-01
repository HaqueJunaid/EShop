import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Topbar from '../layout/Topbar'
import HeadBar from './HeadBar'
import MobileSearchPopup from './MobileSearchPopup'
import Navbar from './Navbar'
import { LuUserRound } from "react-icons/lu";
import { HiLogin } from "react-icons/hi";
import { FiUserPlus } from "react-icons/fi";
import { IoIosArrowUp } from "react-icons/io";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isMobileMenuOpen])

  return (
    <header className="z-10 relative w-full">
      <Topbar />
      <HeadBar onMenuClick={() => setIsMobileMenuOpen(true)} onSearchClick={() => setIsMobileSearchOpen(true)} />
      <Navbar />

      <MobileSearchPopup open={isMobileSearchOpen} onClose={() => setIsMobileSearchOpen(false)} />

      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className='absolute inset-0 bg-black/40' />
        <aside
          className={`absolute top-0 right-0 h-full w-4/5 max-w-xs bg-stone-50 shadow-xl transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
          role='dialog'
          aria-modal='true'
        >
          <div className='flex justify-between items-center px-4 py-4 border-stone-200 border-b'>
            <span className='font-semibold text-stone-900 text-sm'>Menu</span>
            <button
              className='text-stone-700'
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label='Close menu'
            >
              ✕
            </button>
          </div>

          <nav className='flex flex-col px-4 py-3 text-stone-800 text-sm z-110'>
            <Link className='py-3 border-stone-100 border-b' to='/' onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link className='py-3 border-stone-100 border-b' to='/shop-wedding' onClick={() => setIsMobileMenuOpen(false)}>
              Shop Wedding
            </Link>
            <Link className='py-3 border-stone-100 border-b' to='/faqs' onClick={() => setIsMobileMenuOpen(false)}>
              FAQs
            </Link>
            <Link className='py-3 border-stone-100 border-b' to='/about-us' onClick={() => setIsMobileMenuOpen(false)}>
              About Us
            </Link>
            <Link className='py-3' to='/contact-us' onClick={() => setIsMobileMenuOpen(false)}>
              Contact Us
            </Link>
          </nav>
          <div className='bottom-0 left-0 z-110 absolute flex justify-between items-center px-4.5 py-4 border-stone-300 border-t w-full text-stone-800'>
            <Link to={`/profile`} onClick={() => setIsMobileMenuOpen(false)} className='flex items-center gap-2'>
              <div className='flex justify-center items-center bg-stone-200/80 border-2 border-stone-300 rounded-full size-10'>
                <LuUserRound className='size-6' />
              </div>
              <h2 className='font-noraml text-lg'>Profile</h2>
            </Link>
            <IoIosArrowUp className={`size-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} onClick={() => { setIsOpen(!isOpen) }} />
          </div>
          {/* Profile dropdown, always overlays above menu and is fully visible */}
          <div className={`w-full max-w-xs bg-stone-50 absolute left-0 transition-all duration-300 z-50 ${isOpen ? 'bottom-16 opacity-100 pointer-events-auto' : 'bottom-0 opacity-0 pointer-events-none'}`} style={{ boxShadow: isOpen ? '0 8px 32px rgba(0,0,0,0.10)' : 'none' }}>
            <div className='block z-100 relative hover:bg-stone-50 mb-1 p-2 py-3 border border-stone-300 rounded-md w-full text-sm text-nowrap'>
              <Link to={`/register`} className='flex items-center gap-1 px-2 py-0.5 rounded-sm cursor-pointer'>
                <FiUserPlus className="size-5" /> Sign Up
              </Link>
            </div>
            <div className='block z-100 relative hover:bg-stone-50 mb-1 p-2 py-3 border border-stone-300 rounded-md w-full text-sm text-nowrap'>
              <Link to={`/login`} className='flex items-center gap-1 px-2 py-0.5 rounded-sm cursor-pointer'>
                <HiLogin className="size-5 rotate-180" /> Sign In
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </header>
  )
}

export default Header
