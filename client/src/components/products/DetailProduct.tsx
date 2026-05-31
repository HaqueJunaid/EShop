import React, { useState } from 'react'
import ProductGallary from './ProductGallary.tsx'
import ProductContent from './ProductContent.tsx'
import SimilarProducts from './SimilarProducts.tsx'

const DetailProduct: React.FC = () => {
    const [selectedVariant, setSelectedVariant] = useState(0)
    const [selectedImage, setSelectedImage] = useState(0)

    const product = {
        id: "1",
        title: "Quirky Indian Custom Wedding Badge - Ladkiwale",
        price: "1,825",
        inStock: true,
        canUploadImage: true,
        variants: [
            {
                name: "First",
                images: ["https://picsum.photos/700/500", "https://picsum.photos/500/500", "https://picsum.photos/600/500"],  
                inStock: true
            },
            {
                name: "Second",
                images: ["https://picsum.photos/400/500", "https://picsum.photos/800/500", "https://picsum.photos/400/400"],  
                inStock: true
            },
            {
                name: "Third",
                images: ["https://picsum.photos/200/200", "https://picsum.photos/300/300", "https://picsum.photos/600/600"],  
                inStock: true
            }
        ],
        customizable: {
            logo: {
                enabled: true,
                placeholder: "Upload your logo",
                type: "file"
            },
            coupleName: {
                enabled: true,
                placeholder: "Enter couple name",
                type: "text"
            },
            whatsapp: {
                enabled: true,
                placeholder: "Enter whatsapp number",
                type: "text"
            },
            customizationDetails: {
                enabled: true,
                placeholder: "Enter customization details",
                type: "text"
            },
            goldfoil: {
                enabled: true,
                placeholder: "Enter goldfoil details",
                type: "text"
            },
            additionalMessage: {
                enabled: true,
                placeholder: "Enter additional message",
                type: "text"
            }
        }
    }

    const currentVariant = product.variants[selectedVariant];

    const handleVariantChange = (variantIndex: number) => {
    setSelectedVariant(variantIndex)
    setSelectedImage(0)
  }

  const handleThumbnailClick = (imageIndex: number) => {
    setSelectedImage(imageIndex)
  }

    const normalizedPrice = String(Number(String(product.price).replace(/[^0-9.-]/g, '')) || 0)

    return (
        <div className='relative bg-stone-50 mx-auto px-4 lg:px-1.5 py-2 lg:py-1.5 border-stone-200 border-b w-full'>
            <div className='relative flex lg:flex-row flex-col gap-7 mx-auto w-full lg:w-2/3 h-fit'> 
                <ProductGallary images={currentVariant.images} handleThumbnailClick={handleThumbnailClick} mainImage={currentVariant.images[selectedImage]} />
                {/* @ts-ignore */}
                <ProductContent id={product.id} handleVariantChange={handleVariantChange} title={product.title} price={normalizedPrice} inStock={product.inStock} canUploadImage={product.canUploadImage} variants={product.variants} customizable={product.customizable} />
            </div>
            <div className='w-full lg:w-2/3 text-stone-950 mx-auto py-10'>
                <h2 className='text-center text-4xl leading-30'>You Might Also Like</h2>
                <SimilarProducts />
            </div>
        </div>
    )
}

export default DetailProduct