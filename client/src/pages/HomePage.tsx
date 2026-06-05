import AllProducts from '../components/common/AllProducts';
import HeroSwipper from '../components/common/HeroSwipper';
import { useEffect } from 'react';

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = "VivahStore | Home";
  }, []);

  return (
    <div className='bg-stone-50 w-full'>
      <HeroSwipper />
      <AllProducts />
    </div>
  )
}

export default HomePage;