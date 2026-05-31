import React, { useState } from 'react'
import PriceRangeSlider from '../common/PriceRangeSlider.tsx'
import { CiFilter } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { useSearchParams } from 'react-router-dom';


const ProductFilterSideBar: React.FC = () => {
    const [open, setOpen] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams()
    const [inStock, setInStock] = useState(searchParams.get('inStock') === 'true')
    const [price, setPrice] = useState(23200)


    const handlePriceChange = (nextValue: number) => {
        setPrice(nextValue)
        searchParams.set('price_lte', nextValue.toString());
        setSearchParams(searchParams, { replace: true })
    }

    const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setInStock(isChecked);
        if (isChecked) {
            searchParams.set('inStock', 'true');
        } else {
            searchParams.delete('inStock');
        }
        setSearchParams(searchParams, { replace: true });
    }

    return (
        <div className='relative w-full lg:w-64'>
            <div className='md:hidden flex justify-center items-center mt-4 -mb-7 w-full'
                onClick={() => setOpen(!open)}
            >
                {open ? <FaFilter className={`size-4 text-stone-800 mr-1`} /> : <CiFilter className={`size-6 text-stone-800`} />}
                <span>Filter</span>
            </div>
            <div className={`md:block top-0 lg:top-45 left-0 lg:sticky bg-stone-50 h-0 md:h-fit overflow-hidden text-stone-800 ${open ? 'h-fit' : 'h-0'}`}>
                <div className='py-5 border-stone-200 border-b'>
                    <h2 className='font-semibold text-xl'>Availability</h2>
                    <div className="mt-2">
                        <label className="inline-flex relative items-center gap-3 text-gray-900 cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={inStock} onChange={handleStockChange} />
                            <div className={`peer ${inStock ? 'bg-[#FCB435]' : 'bg-stone-300'} rounded-full w-10 h-6 transition-colors duration-200`}></div>
                            <span className="top-1 left-1 absolute bg-white rounded-full w-4 h-4 transition-transform peer-checked:translate-x-4 duration-200 ease-in-out dot"></span>
                            In Stock
                        </label>
                    </div>
                </div>
                <div className='py-5 border-stone-200 border-b'>
                    <h2 className='font-semibold text-xl'>Price</h2>
                    <div className="mt-2">
                        <PriceRangeSlider
                            max={23200}
                            step={100}
                            value={price}
                            onChange={(nextValue) => handlePriceChange(nextValue)}

                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductFilterSideBar