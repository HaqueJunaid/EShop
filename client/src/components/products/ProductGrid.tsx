import React from 'react'

type LayoutMode = 'grid-2' | 'grid-3' | 'grid-4' | 'list'

type ProductGridProps = {
  children: React.ReactNode
  layout?: LayoutMode
}

const ProductGrid: React.FC<ProductGridProps> = ({ children, layout = 'grid-4' }) => {
  const layoutClassName =
    layout === 'list'
      ? 'flex flex-col'
      : layout === 'grid-2'
        ? 'grid grid-cols-2'
        : layout === 'grid-3'
          ? 'grid grid-cols-2 sm:grid-cols-3'
          : 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'

  return (
    <div className={`gap-8 mt-10 mb-3 ${layoutClassName}`}>
      {children}
    </div>
  )
}

export default ProductGrid