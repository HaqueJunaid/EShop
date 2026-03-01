import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductFilterSideBar from "../products/productFilterSideBar.tsx"
import SortBy from '../common/SortBy.tsx'
import LayoutChanger, { type LayoutMode } from '../common/LayoutChanger.tsx'
import ProductGrid from '../products/ProductGrid.tsx'
import ProductCard from '../products/ProductCard.tsx'

const ProductLayout: React.FC = () => {
  const { id } = useParams()
  const [sort, setSort] = useState('featured')
  const [layout, setLayout] = useState<LayoutMode>('grid-3')

  return (
    <div className='relative bg-stone-50 mx-auto px-4 lg:px-1.5 py-2 lg:py-1.5 border-stone-200 border-b w-full'>
      <div className='relative flex lg:flex-row flex-col gap-7 mx-auto w-full lg:w-2/3 h-fit'>
        <ProductFilterSideBar />
        <div className='bg-stone-50 px-2 py-5 w-full text-stone-800'>
          <div className='flex sm:flex-row flex-col justify-between sm:items-center gap-4'>
            <h2 className='font-semibold text-3xl capitalize'>

              {id?.replace("-", " ")}

            </h2>
          </div>
          <div className='hidden md:flex md:flex-row flex-col md:justify-between md:items-center gap-3 mt-4'>
            <SortBy sort={sort} setSort={setSort} />

            <div className='flex justify-between items-center gap-4'>
              <LayoutChanger layout={layout} setLayout={setLayout} />
            </div>
          </div>
          <ProductGrid layout={layout}>
            {Array.from({ length: 10 }).map((_, idx) => (
              <ProductCard
                id={idx?.toString() || ""}
                key={idx}
                layout={layout}
                title='Quirky Indian Custom Wedding Badge - Ladkiwale'
                price={1825}
                imageUrl='https://picsum.photos/600/500'
              />
            ))}
          </ProductGrid>
        </div>
      </div>
    </div>
  )
}

export default ProductLayout