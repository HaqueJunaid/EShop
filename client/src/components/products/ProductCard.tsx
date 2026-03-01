import React from 'react'
import { FaRegHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export type LayoutMode = 'grid-2' | 'grid-3' | 'grid-4' | 'list'

type ProductCardProps = {
  title: string
  price: number
  imageUrl: string
  layout?: LayoutMode
  onAddToCart?: () => void
  onWishlist?: () => void
  onCompare?: () => void
  id: string
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  imageUrl,
  layout = 'grid-4',
  onAddToCart,
  onWishlist,
  id
}) => {
  const formattedPrice = price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const isList = layout === 'list'

  return (
    <Link to={`/products/${id}/details`} className={`${isList ? 'flex gap-4 p-2 md:p-4 rounded-lg border border-stone-200' : ''}`}>
      <div className={isList ? 'w-28 sm:w-32 shrink-0' : 'w-full'}>
        <div className='bg-stone-100 w-full aspect-square overflow-hidden'>
          <img src={imageUrl} alt={title} className='rounded-md w-full h-full object-cover' loading='lazy' />
        </div>
      </div>

      <div className={isList ? 'flex-1' : 'pt-4'}>
        <p className='text-md text-stone-900 line-clamp-2 leading-snug'>{title}</p>
        <p className='mt-1 text-stone-500 text-xs sm:text-sm'>₹{formattedPrice}</p>

        <div className={`flex sm:flex-row sm:items-center gap-2 sm:gap-3 ${isList ? 'mt-4' : 'mt-3'}`}>
          <button
            type='button'
            className={`bg-black px-4 sm:px-6 rounded-md py-2.5 sm:py-3 text-white text-[10px] sm:text-xs tracking-wide ${isList ? 'w-full sm:w-max' : 'w-full sm:flex-1'}`}
            onClick={onAddToCart}
          >
            ADD TO CART
          </button>

          <div className='flex items-center gap-3'>
            <button type='button' className='text-stone-800' onClick={onWishlist} aria-label='Wishlist'>
              <FaRegHeart className='size-5 sm:size-6' />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
