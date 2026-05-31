import React, { useEffect } from 'react'
import Heading from './Heading'
import ProductGrid from '../products/ProductGrid'
import CollectionCard from '../products/CollectionCard'
import { useProductStore } from '../../store/productStore';
import { Suspense } from 'react';

const AllProducts: React.FC = () => {
  // const products = [
  //   {
  //     title: 'Mini Suitcase',
  //     imageUrl:
  //       'https://picsum.photos/600/500',
  //     to: '/products/mini-suitcase',
  //   },
  //   {
  //     title: 'Wedding Badge',
  //     imageUrl:
  //       'https://picsum.photos/600/600',
  //     to: '/products/wedding-badge',
  //   },
  //   {
  //     title: 'Wedding Card',
  //     imageUrl:
  //       'https://picsum.photos/700/500',
  //     to: '/products/wedding-card',
  //   },
  //   {
  //     title: 'Decors',
  //     imageUrl:
  //       'https://picsum.photos/500/700',
  //     to: '/products/decors',
  //   },
  //   {
  //     title: 'Greeting Card',
  //     imageUrl:
  //       'https://picsum.photos/800/500',
  //     to: '/products/greeting-card',
  //   },
  //   {
  //     title: 'Name Patch',
  //     imageUrl:
  //       'https://picsum.photos/500/800',
  //     to: '/products/name-patch',
  //   },
  //   {
  //     title: 'Mini Suitcase',
  //     imageUrl:
  //       'https://picsum.photos/900/500',
  //     to: '/products/all',
  //   },
  //   {
  //     title: 'Mini Suitcase',
  //     imageUrl:
  //       'https://picsum.photos/500/900',
  //     to: '/products/all',
  //   }
  // ]

  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const products = useProductStore((state) => state.products);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className='bg-stone-50 p-6 lg:p-10 w-full'>
      <Heading title="Shop By Collection" />
      <ProductGrid>
        {products.map((c) => (
          <Suspense>
            <CollectionCard key={c.title} title={c.title} imageUrl={c.thumbnail} to={`/products/${c.category}`} />
          </Suspense>
        ))}
      </ProductGrid>
    </div>
  )
}

export default AllProducts