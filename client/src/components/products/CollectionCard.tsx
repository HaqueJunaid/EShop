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
      className='group block relative relative bg-stone-100 rounded-xl w-full aspect-square overflow-hidden'
    >
      <img
        src={imageUrl}
        alt={title}
        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
        loading='lazy'
      />
      <div className='bottom-0 bottom-3 lg:bottom-5.5 left-1/2 absolute w-[90%] text-center -translate-x-1/2'>
        <div className='bg-stone-50 py-1 lg:py-2 rounded-lg'>
          {title}
        </div>
      </div>
    </Link>
  )
}

export default CollectionCard
