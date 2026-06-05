import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { CgMenuRight } from "react-icons/cg";
import UserDropdown from './UserDropdown';
import type { HeadBarProps } from "../../types/allTypes";
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';

const HeadBar: React.FC<HeadBarProps> = ({ onMenuClick, onSearchClick }) => {
  const [query, setQuery] = React.useState('');
  const navigate = useNavigate();
  const cartLength = useCartStore((state: any) => state.getCartItemsLength());
  const wishlistLength = useWishlistStore((state: any) => state.getWishlistItemsLength());

  return (
    <div className='relative bg-stone-50 mx-auto px-4 lg:px-1.5 py-4 lg:py-7 border-stone-200 border-b w-full'>
      <div className='top-0 left-0 relative flex justify-between items-center mx-auto w-full lg:w-2/3 h-fit'>
        <Link to="/">
          <img className='w-40 lg:w-50' src="/Assets/Logo.svg" alt="Logo" />
        </Link>
        <div className='hidden lg:flex justify-center items-center gap-2'>
          <div className='flex justify-center items-center gap-2 bg-white px-2 py-1 border border-stone-300 rounded-sm'>
            <IoSearch className='fill-stone-800 size-5' />
            <input value={query} onChange={(e) => setQuery(e.target.value)} type='text' placeholder='Search Product...' className='border-none outline-none w-90 font-normal text-md text-stone-800 placeholder:text-stone-400'/>
          </div>
          <button onClick={() => {
                if (query.trim().length) {
                  navigate(`/products/${query}`);
                  setQuery('');
                } else {
                  alert('Please enter a search query');
                }
              }} className='bg-[#E41F66] hover:bg-[#c60b4d] px-4 py-1 rounded-sm text-normal text-stone-50 active:scale-95 transition-all duration-300 cursor-pointer easeInOut'>Search</button>
        </div>
        <div className='flex justify-center items-center gap-2.5'>
          <button onClick={onSearchClick} aria-label='Open search'>
            <IoSearch className='lg:hidden block size-6' />
          </button>
          <Link to="/wishlist" className='relative' aria-label='Wishlist count'>
            <span className='-top-1 -right-1 absolute bg-[#E41F66] px-1 rounded-full text-[9px] text-stone-50'>{wishlistLength}</span>
            <FaRegHeart className='size-5 cursor-pointer' />
          </Link>
          <Link to="/cart" className='relative'>
            <span className='-top-1 -right-1 absolute bg-[#E41F66] px-1 rounded-full text-[9px] text-stone-50'>{cartLength}</span>
            <FiShoppingCart className='size-5 cursor-pointer' />
          </Link>
          <UserDropdown />
          <button onClick={onMenuClick} aria-label='Open menu'>
            <CgMenuRight className='lg:hidden block size-6' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeadBar