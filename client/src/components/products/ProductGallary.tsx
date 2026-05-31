import React, { useState, useRef } from 'react'

const ProductGallary: React.FC<{images: string[], mainImage: string, handleVariantChange?: (variantIndex: number) => void, handleThumbnailClick?: (imageIndex: number) => void}> = ({images, handleThumbnailClick, mainImage}) => {

    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 })
    const [isZoomed, setIsZoomed] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)


    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return
        const { left, top, width, height } = containerRef.current.getBoundingClientRect()
        const x = ((e.clientX - left) / width) * 100
        const y = ((e.clientY - top) / height) * 100
        setZoomPos({ x, y })
    }

    const handleMouseEnter = () => setIsZoomed(true)
    const handleMouseLeave = () => setIsZoomed(false)

    return (
        <div className='md:top-45 left-0 relative md:sticky flex md:flex-row flex-col-reverse gap-2 py-6 h-fit'>
        <div className='flex flex-row md:flex-col flex-nowrap gap-2 overflow-auto'>
            {images.map((image, i) => (
                <div key={image+i} className={images.length === 1 ? "h-20 rounded-md overflow-hidden" : `rounded-md shrink-0 w-20 h-23 overflow-hidden ${mainImage === image && "border-2 border-yellow-500"} `}>
                    <img onClick={() => handleThumbnailClick?.(i)} src={image} className='w-full h-full object-center object-cover hover:scale-105 transition-all duration-300 cursor-pointer' />
                </div>
            ))}
        </div>
        <div
            ref={containerRef}
            className='rounded-md w-full md:w-140 h-100 md:h-140 overflow-hidden cursor-zoom-in'
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img
                className='w-full h-full object-cover transition-transform duration-300 ease-in-out'
                style={{
                    transform: isZoomed ? 'scale(2)' : 'scale(1)',
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                }}
                src={mainImage}
                alt='Product main image'
            />
        </div>
    </div>
  )
}

export default ProductGallary