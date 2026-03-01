import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Topbar from '../layout/Topbar'
import HeadBar from './HeadBar'
import MobileSearchPopup from './MobileSearchPopup'
import Navbar from './Navbar'

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)

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
        className={`absolute top-0 right-0 h-full w-1/2 max-w-xs bg-white shadow-xl transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
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

        <nav className='flex flex-col px-4 py-3 text-stone-800 text-sm'>
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
      </aside>
    </div>
    </header>
  )
}

export default Header
