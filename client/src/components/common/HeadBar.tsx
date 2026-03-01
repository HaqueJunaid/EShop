import React from 'react'
import { Link } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { CgMenuRight } from "react-icons/cg";

type HeadBarProps = {
  onMenuClick?: () => void
  onSearchClick?: () => void
}

const HeadBar: React.FC<HeadBarProps> = ({ onMenuClick, onSearchClick }) => {
  return (
    <div className='relative bg-stone-50 mx-auto px-4 lg:px-1.5 py-2 lg:py-1.5 border-stone-200 border-b w-full'>
      <div className='top-0 left-0 relative flex justify-between items-center mx-auto w-full lg:w-2/3 h-fit'>
        <Link to="/">
          <img className='size-15 lg:size-25' src="https://srishbish.com/cdn/shop/files/SRISHBISH_2_244x.png?v=1648184973" alt="Logo" />
        </Link>
        <div className='hidden lg:flex justify-center items-center gap-2'>
          <div className='flex justify-center items-center gap-2 bg-white px-2 py-1 border border-stone-300 rounded-sm'>
            <IoSearch className='fill-stone-800 size-5' />
            <input type='text' placeholder='Search Product...' className='border-none outline-none w-90 font-normal text-md text-stone-800 placeholder:text-stone-400'/>
          </div>
          <button className='bg-stone-800 hover:bg-stone-900 px-4 py-1 rounded-sm text-normal text-stone-50 transition-all duration-300 cursor-pointer easeInOut'>Search</button>
        </div>
        <div className='flex justify-center items-center gap-2.5'>
          <button onClick={onSearchClick} aria-label='Open search'>
            <IoSearch className='lg:hidden block size-6' />
          </button>
          <button><FaRegHeart className='size-5 cursor-pointer' /></button>
          <button className='relative'>
            <span className='-top-1 -right-1 absolute bg-stone-800 px-1 rounded-full text-[9px] text-stone-50'>2</span>
            <FiShoppingCart className='size-5 cursor-pointer' />
          </button>
          <button onClick={onMenuClick} aria-label='Open menu'>
            <CgMenuRight className='lg:hidden block size-6' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeadBar