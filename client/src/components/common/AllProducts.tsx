import React from 'react'
import Heading from './Heading'
import ProductGrid from '../products/ProductGrid'
import CollectionCard from '../products/CollectionCard'

const AllProducts: React.FC = () => {
  const products = [
    {
      title: 'Mini Suitcase',
      imageUrl:
        'https://picsum.photos/600/500',
      to: '/products/all',
    },
    {
      title: 'Mini Suitcase',
      imageUrl:
        'https://picsum.photos/500/600',
      to: '/products/all',
    },
    {
      title: 'Mini Suitcase',
      imageUrl:
        'https://picsum.photos/700/500',
      to: '/products/all',
    },
    {
      title: 'Mini Suitcase',
      imageUrl:
        'https://picsum.photos/500/700',
      to: '/products/all',
    },
    {
      title: 'Mini Suitcase',
      imageUrl:
        'https://picsum.photos/800/500',
      to: '/products/all',
    },
    {
      title: 'Mini Suitcase',
      imageUrl:
        'https://picsum.photos/500/800',
      to: '/products/all',
    },
    {
      title: 'Mini Suitcase',
      imageUrl:
        'https://picsum.photos/900/500',
      to: '/products/all',
    },
    {
      title: 'Mini Suitcase',
      imageUrl:
        'https://picsum.photos/500/900',
      to: '/products/all',
    },
    {
      title: 'Mini Suitcase',
      imageUrl:
        'https://picsum.photos/550/500',
      to: '/products/all',
    },
    {
      title: 'Mini Suitcase',
      imageUrl:
        'https://picsum.photos/500/550',
      to: '/collections/all',
    },
    {
      title: 'Mini Suitcase',
      imageUrl:
        'https://picsum.photos/560/500',
      to: '/collections/all',
    },
    {
      title: 'Mini Suitcase',
      imageUrl:
        'https://picsum.photos/500/500',
      to: '/products/all',
    }
  ]

  return (
    <div className='bg-stone-50 p-6 lg:p-10 w-full'>
        <Heading title="Shop By Collection" />
        <ProductGrid>
            {products.map((c) => (
              <CollectionCard key={c.title} title={c.title} imageUrl={c.imageUrl} to={c.to} />
            ))}
        </ProductGrid>
    </div>
  )
}

export default AllProducts