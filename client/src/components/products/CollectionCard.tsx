import React from 'react'
import { Link } from 'react-router-dom'

type CollectionCardProps = {
  title: string
  imageUrl: string
  to: string
}

const CollectionCard: React.FC<CollectionCardProps> = ({ title, imageUrl, to }) => {
  return (
    <Link
      to={to}
      className='group block relative bg-stone-100 rounded-md w-full aspect-square overflow-hidden'
    >
      <img
        src={imageUrl}
        alt={title}
        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
        loading='lazy'
      />
      <div className='bottom-3 lg:bottom-5.5 left-1/2 absolute w-[90%] text-center -translate-x-1/2'>
        <div className='bg-stone-50/90 py-1 lg:py-2 rounded-md text-sm md:text-lg'>
          <span className='block md:hidden'>{title.length > 12 ? `${title.substring(0, 12)}...` : title}</span>
          <span className='hidden md:block'>{title}</span>
        </div>
      </div>
    </Link>
  )
}

export default CollectionCard
