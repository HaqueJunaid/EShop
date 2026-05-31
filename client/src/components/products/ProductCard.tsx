import React from 'react'
import { Link } from 'react-router-dom'
import AddToCartButton from '../common/AddToCartButton'
import AddToWishListButton from '../common/AddToWishListButton'

export type LayoutMode = 'grid-2' | 'grid-3' | 'grid-4' | 'list'

type ProductCardProps = {
  title: string
  price: number
  imageUrl: string
  layout?: LayoutMode
  onAddToCart?: () => void
  onWishlist?: () => void
  onCompare?: () => void
  id: string,
  inStock: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  imageUrl,
  id,
  inStock
}) => {
  const formattedPrice = price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div className='relative'>
      <div className={'w-full h-50 md:h-80'}>
        <Link to={`/products/${id}/details`} className='bg-stone-100 w-full h-full aspect-square overflow-hidden'>
          <img src={imageUrl} alt={title} className='rounded-md w-full h-full object-cover' loading='lazy' />
        </Link>
      </div>

      {inStock ? null : <p className='top-0 right-0 z-10 absolute bg-yellow-500 px-2 py-1 rounded-bl-xl text-xs sm:text-sm'>Out of Stock</p>}
      <div className={'pt-4 relative'}>
        <p className='overflow-hidden text-md text-stone-900 line-clamp-2 whitespace-nowrap' style={{ textOverflow: 'ellipsis' }}>{title}</p>
        <p className='mt-1 text-stone-500 text-xs sm:text-sm'>₹{formattedPrice}</p>

        <div className={`flex sm:flex-row sm:items-center gap-2 sm:gap-3 ${'mt-3'}`}>
          <AddToCartButton product={{ id, title, price: price.toString(), imageUrl }} />

          <div className='flex items-center gap-3'>
            <AddToWishListButton id={id} title={title} price={price.toString()} imageUrl={imageUrl} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
