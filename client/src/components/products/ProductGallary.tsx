import React, { useState, useRef } from 'react'

const ProductGallary: React.FC<{images: string[]}> = ({images}) => {

    const [mainImage, setMainImage] = useState(0);
    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 })
    const [isZoomed, setIsZoomed] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    function handleImageChange(e:number) {
        setMainImage(e)
    }

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
    <div className='top-0 left-0 relative md:sticky flex md:flex-row flex-col-reverse gap-2 py-6 h-fit'>
        <div className='flex flex-row md:flex-col flex-nowrap gap-2 overflow-auto'>
            {images.map((image, i) => (
                <div className={`rounded-md shrink-0 w-20 h-20 md:flex-1 overflow-hidden ${mainImage === i && "border border-2 border-yellow-500"} `}>
                    <img onClick={() => handleImageChange(i)} src={image} className='w-full h-full object-center object-cover hover:scale-105 transition-all duration-300 cursor-pointer' />
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
                src={images[mainImage]}
                alt='Product main image'
            />
        </div>
    </div>
  )
}

export default ProductGallary