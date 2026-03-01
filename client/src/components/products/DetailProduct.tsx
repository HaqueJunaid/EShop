import React from 'react'
import ProductGallary from './ProductGallary'
import ProductContent from './ProductContent'

const DetailProduct: React.FC = () => {

    const product = {
        title: "Quirky Indian Custom Wedding Badge - Ladkiwale",
        price: "1,825",
        inStock: true,
        images: [
            "https://picsum.photos/600/500",
            "https://picsum.photos/700/500",
            "https://picsum.photos/600/800",
            "https://picsum.photos/600/850",
            "https://picsum.photos/600/750",
            "https://picsum.photos/600/550",
        ],
        canUploadImage: true
    }

    return (
        <div className='relative bg-stone-50 mx-auto px-4 lg:px-1.5 py-2 lg:py-1.5 border-stone-200 border-b w-full'>
            <div className='relative flex lg:flex-row flex-col gap-7 mx-auto w-full lg:w-2/3 h-fit'> 
                <ProductGallary images={product.images} />
                <ProductContent title={product.title} price={product.price} inStock={product.inStock} canUploadImage={product.canUploadImage} />
            </div>
        </div>
    )
}

export default DetailProduct