import { useForm, type SubmitHandler } from "react-hook-form"
import type { AddAddressFormProps } from "../../types/allTypes";

type Inputs = {
    firstName: string
    lastName: string
    company: string
    country: string
    address: string
    apartment: string
    city: string
    postalCode: string
    phone: string
}

const AddAddressForm = ({ cancel, setAddress, addresses }: AddAddressFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setAddress((prev) => [...prev, data])
        cancel(false)
        localStorage.setItem('addresses', JSON.stringify([...addresses, data]));
    }

    return (
        <div className='flex-3 mt-6 h-screen tracking-wide'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div>
                    <label htmlFor='firstName' className='block font-medium text-stone-700 text-sm'>First Name</label>
                    <input {...register("firstName", { required: "First is required" })} type='text' id='firstName' className='block bg-stone-200/50 mt-1 px-2 py-3 rounded-md w-full sm:text-sm' placeholder='First Name' />
                    {errors.firstName && <p className='mt-1 text-red-500 text-xs'>{errors.firstName.message}</p>}
                </div>
                <div>
                    <label htmlFor='lastName' className='block font-medium text-stone-700 text-sm'>Last Name</label>
                    <input type='text' {...register("lastName")} id='lastName' className='block bg-stone-200/50 mt-1 px-2 py-3 rounded-md w-full sm:text-sm' placeholder='Last Name' />
                </div>
                <div>
                    <label htmlFor='company' className='block font-medium text-stone-700 text-sm'>Company</label>
                    <input type='text' {...register("company")} id='company' className='block bg-stone-200/50 mt-1 px-2 py-3 rounded-md w-full sm:text-sm' placeholder='Company' />
                </div>
                <div>
                    <label htmlFor='country' className='block font-medium text-stone-700 text-sm'>Country</label>
                    <select id='country' {...register("country")} className='block bg-stone-200/50 mt-1 px-2 py-3 rounded-md w-full sm:text-sm'>
                        <option value=''>-- Select Country --</option>
                        <option value='Ghana'>Ghana</option>
                        <option value='India'>India</option>
                        <option value='North Pole'>North Pole</option>
                        <option value='Panama'>Panama</option>
                        <option value='Siberia'>Siberia</option>
                        <option value='US'>Uganda</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='address' className='block font-medium text-stone-700 text-sm'>Address</label>
                    <input type='text' {...register("address", { required: "Address is required" })} id='address' className='block bg-stone-200/50 mt-1 px-2 py-3 rounded-md w-full sm:text-sm' placeholder='Address' />
                    {errors.address && <p className='mt-1 text-red-500 text-xs'>{errors.address.message}</p>}
                </div>
                <div>
                    <label htmlFor='apartment' className='block font-medium text-stone-700 text-sm'>Apartment, suite, etc.</label>
                    <input {...register("apartment")} type='text' id='apartment' className='block bg-stone-200/50 mt-1 px-2 py-3 rounded-md w-full sm:text-sm' placeholder='Apartment, suite, etc.' />
                </div>
                <div>
                    <label htmlFor='city' className='block font-medium text-stone-700 text-sm'>City</label>
                    <input {...register("city", { required: "City is required" })} type='text' id='city' className='block bg-stone-200/50 mt-1 px-2 py-3 rounded-md w-full sm:text-sm' placeholder='City' />
                    {errors.city && <p className='mt-1 text-red-500 text-xs'>{errors.city.message}</p>}
                </div>
                <div>
                    <label htmlFor='postalCode' className='block font-medium text-stone-700 text-sm'>Postal/Zip Code</label>
                    <input {...register("postalCode", { required: "Postal/Zip Code is required" })} type='text' id='postalCode' className='block bg-stone-200/50 mt-1 px-2 py-3 rounded-md w-full sm:text-sm' placeholder='Postal/Zip Code' />
                    {errors.postalCode && <p className='mt-1 text-red-500 text-xs'>{errors.postalCode.message}</p>}
                </div>
                <div>
                    <label htmlFor='phone' className='block font-medium text-stone-700 text-sm'>Phone</label>
                    <input {...register("phone", { required: "Phone number is required" })} type='text' id='phone' className='block bg-stone-200/50 mt-1 px-2 py-3 rounded-md w-full sm:text-sm' placeholder='Phone' />
                    {errors.phone && <p className='mt-1 text-red-500 text-xs'>{errors.phone.message}</p>}
                </div>
                <div className='flex space-x-4'>
                    <button type='submit' className='bg-[#E41F66] px-6 py-3 rounded-lg text-stone-50 hover:bg-[#c60b4d] transition-all duration-300 ease-in-out cursor-pointer'>Confirm</button>
                    <button onClick={() => cancel((false))} type='button' className='bg-stone-300 px-6 py-3 rounded-lg text-black hover:bg-stone-400/50 transition-all duration-300 ease-in-out cursor-pointer'>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default AddAddressForm