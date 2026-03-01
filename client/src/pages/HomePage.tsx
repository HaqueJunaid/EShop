import AllProducts from '../components/common/AllProducts';
import HeroSwipper from '../components/common/HeroSwipper';
import React from 'react'

const HomePage: React.FC = () => {
  return (
    <div className='bg-stone-50 w-full'>
        <HeroSwipper />
        <AllProducts />
    </div>
  )
}

export default HomePage;