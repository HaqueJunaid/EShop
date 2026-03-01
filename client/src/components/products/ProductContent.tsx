import React, { useState, useRef, type ChangeEvent } from 'react'

const ProductContent: React.FC<{ title: string, price: string, inStock: boolean, canUploadImage: boolean }> = ({ title, price, inStock, canUploadImage }) => {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setUploadedImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const clearUploadedImage = () => {
        setUploadedImage(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    return (
        <div className='flex flex-col md:flex-col gap-2 py-6'>
            <div className='flex flex-col flex-nowrap gap-2 mb-4 pb-4 border-stone-300 border-b border-dashed h-fit overflow-auto text-stone-800'>
                {inStock ? (
                    <span className='bg-green-500 px-2 py-1 rounded-full w-fit font-medium text-white text-xs'>In Stock</span>
                ) : (
                    <span className='bg-red-500 px-2 py-1 rounded-full w-fit font-medium text-white text-xs'>Out of Stock</span>
                )}
                <h2 className='font-semibold text-3xl capitalize'>{title}</h2>
                <p className='text-stone-500 text-lg md:text-2xl'>₹{price}</p>
            </div>
            <div className='flex flex-col pb-8 border-stone-300 border-b border-dashed'>
                <label className='text-stone-800'>Enter the no of Quantities (Pcs)</label>
                <input value={10} type="number" className='mt-2 p-2 border border-stone-200 focus:border-stone-500 rounded-md outline-none w-fit' />
            </div>
            {canUploadImage && <div className='flex flex-col pt-3 pb-8 border-stone-300 border-b border-dashed'>
                <h3 className='mb-2 text-stone-800'>Upload Your Image</h3>
                {uploadedImage ? (
                    <div className='flex flex-col items-center gap-3 w-80'>
                        <img src={uploadedImage} alt='Uploaded preview' className='border border-stone-300 rounded-md w-fit h-48 object-cover' />
                        <button
                            type='button'
                            onClick={clearUploadedImage}
                            className='text-stone-600 hover:text-stone-800 text-sm underline'
                        >
                            Remove image
                        </button>
                    </div>
                ) : (
                    <label htmlFor="fileInput" className="flex flex-col items-center gap-4 bg-white p-8 border border-stone-300 hover:border-stone-500 border-dashed rounded-md w-80 text-sm transition cursor-pointer">
                        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25.665 3.667H11a3.667 3.667 0 0 0-3.667 3.666v29.334A3.667 3.667 0 0 0 11 40.333h22a3.667 3.667 0 0 0 3.666-3.666v-22m-11-11 11 11m-11-11v11h11m-7.333 9.166H14.665m14.667 7.334H14.665M18.332 16.5h-3.667" stroke="#292524" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-gray-500">Drag & drop your files here</p>
                        <p className="text-gray-400">Or <span className="text-stone-800 underline">click</span> to upload</p>
                        <input
                            id="fileInput"
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </label>
                )}
            </div>}
        </div>
    )
}

export default ProductContent