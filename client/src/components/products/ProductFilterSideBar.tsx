import React, { useState } from 'react'
import PriceRangeSlider from '../common/PriceRangeSlider.tsx'
import { CiFilter } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";


const ProductFilterSideBar: React.FC = () => {
    const [price, setPrice] = useState(23200)
    const [open, setOpen] = useState(false)

    return (
        <div className='relative w-full lg:w-64'>
            <div className='md:hidden flex justify-center items-center mt-4 -mb-7 w-full'
                onClick={() => setOpen(!open)}
            >
                {open ? <FaFilter className={`size-4 text-stone-800 mr-1`} /> : <CiFilter className={`size-6 text-stone-800`} />}
                <span>Filter</span>
            </div>
            <div className={`md:block top-0 lg:top-5 left-0 lg:sticky bg-stone-50 bg-stone-50 h-0 md:h-fit overflow-hidden text-stone-800 ${open ? 'h-fit' : 'h-0'}`}>
                <div className='py-5 border-stone-200 border-b'>
                    <h2 className='font-semibold text-xl'>Availability</h2>
                    <div className="mt-2">
                        <label className="inline-flex relative items-center gap-3 text-gray-900 cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="peer peer-focus: bg-[#FCB435] bg-slate-300 peer-checked:bg-[#FCB435] rounded-full w-10 h-6 transition-colors duration-200"></div>
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
                            onChange={(nextValue) => setPrice(nextValue)}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductFilterSideBar