import { Link } from 'react-router-dom'
import Heading from '../components/common/Heading'
import { MdDone } from "react-icons/md";
import { useEffect, useState } from 'react';
import AddAddressForm from '../components/profile/AddAddressForm';
import AddressPreview from '../components/profile/AddressPreview';
import OrderTable from '../components/profile/OrderTable';

const orders = [
    {
        orderId: 1,
        productId: 45,
        productName: "Leather Jacket",
        quantity: 1,
        price: 1200,
        paymentMethod: "pre",
        status: "pending"
    },
    {
        orderId: 2,
        productId: 95,
        productName: "Nike Jordan",
        quantity: 2,
        price: 2400,
        paymentMethod: "cod",
        status: "delivered"
    },
]

type Address = {
    firstName: string;
    lastName: string;
    company: string;
    country: string;
    address: string;
    apartment: string;
    city: string;
    postalCode: string;
    phone: string;
};

const Profile = () => {
    const [profileOption, setProfileOption] = useState("dashboard")
    const [showAddAddressForm, setShowAddAddressForm] = useState(false)
    const [addresses, setAddresses] = useState<Address[]>([]);

    const handleDeleteAddress = (index: number) => {
        setAddresses(prevAddresses => prevAddresses.filter((_, i) => i !== index));
        localStorage.setItem('addresses', JSON.stringify(addresses.filter((_, i) => i !== index)));
    };

    useEffect(() => {
        const storedAddresses = localStorage.getItem('addresses');
        if (storedAddresses) {
            setAddresses(JSON.parse(storedAddresses));
        }
    }, []);


    return (
        <div className='bg-stone-50 py-8 w-full'>
            <div className='mx-auto max-w-7xl'>
                <Heading title="My Account" />
                <div className='flex md:flex-row flex-col mt-4 md:mt-8 px-6 w-full min-h-150'>
                    <div className={`min-h-full md:flex-1 flex items-center justify-center md:justify-start md:items-start flex-row md:flex-col gap-7 md:gap-2 text-stone-700 `}>
                        <button className={`text-md tracking-wide text-start ${profileOption === "dashboard" && "font-semibold text-stone-950"}`} onClick={() => setProfileOption("dashboard")}>
                            Dashboard
                        </button>
                        <button className={`text-md tracking-wide text-start ${profileOption === "addresses" && "font-semibold text-stone-950"}`} onClick={() => setProfileOption("addresses")}>
                            Addresses
                        </button>
                        <button className={`text-md tracking-wide text-start ${profileOption === "wishlist" && "font-semibold text-stone-950"}`} onClick={() => setProfileOption("wishlist")}>
                            Wishlist
                        </button>
                        <button className={`text-md tracking-wide text-start ${profileOption === "logout" && "font-semibold text-stone-950"}`} onClick={() => setProfileOption("logout")}>
                            Logout
                        </button>
                    </div>
                    {profileOption === "dashboard" && (<div className='flex-3 mt-10 md:mt-0 h-full tracking-wide'>
                        <p>Hello <span className='font-semibold'>Junaid Haque</span> (not <span className='font-semibold'>Junaid Haque</span>? <button className='hover:underline cursor-pointer'>Log Out</button>)   </p>
                        <div className='mt-10'>
                            <h2 className='mb-6 text-2xl leading-none'>Order History</h2>
                            {!orders.length ? <p className='flex items-center gap-4 md:gap-2 bg-emerald-200 px-3 py-2 rounded-sm text-emerald-700'><MdDone className='size-4.5' /> <Link to={"/products"} className='font-semibold underline'>Make your first order.</Link> You haven't placed any orders yet.</p> : <OrderTable orders={orders} />}
                        </div>
                        <div className='mt-10'>
                            <h2 className='mb-6 text-2xl leading-none'>Account Details</h2>
                            <table className='flex flex-col text-stone-600 text-lg'>
                                <tbody>
                                    <tr className='block py-3'>
                                    <td className='w-20 md:w-60 text-stone-950'>Name</td>
                                    <td>Junaid Haque</td>
                                </tr>
                                <tr className='block py-3'>
                                    <td className='w-20 md:w-60 text-stone-950'>Email</td>
                                    <td>junaid.haque@example.com</td>
                                </tr>
                                </tbody>
                            </table>
                            <button onClick={() => setProfileOption("addresses")} className='bg-yellow-500 mt-10 px-6 py-3 rounded-lg text-sotne-950 hover:scale-103 transition-all duration-300 ease-in-out cursor-pointer'>View Addresses ({addresses.length})</button>
                        </div>
                    </div>)}
                    {profileOption === "addresses" && (
                        <div className='flex-3 py-5 text-left'>
                            <h1 className='mb-4 text-2xl'>Your Addresses ({addresses.length})</h1>
                            <button onClick={() => setShowAddAddressForm(true)} type='submit' className='bg-yellow-500 px-6 py-3 rounded-lg text-semibold text-stone-950 hover:scale-103 transition-all duration-300 ease-in-out cursor-pointer'>Add a New Address</button>
                            {showAddAddressForm && <AddAddressForm addresses={addresses} setAddress={setAddresses} cancel={setShowAddAddressForm} />}
                            <div className='mt-0 md:mt-6'>
                                {addresses.map((address, index) => (
                                    <AddressPreview
                                        key={index}
                                        firstName={address.firstName}
                                        lastName={address.lastName}
                                        company={address.company}
                                        country={address.country}
                                        address={address.address}
                                        apartment={address.apartment}
                                        city={address.city}
                                        postalCode={address.postalCode}
                                        phone={address.phone}
                                        onDelete={() => handleDeleteAddress(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {profileOption === "wishlist" && (<h1>Wishlist</h1>)}
                </div>
            </div>
        </div>
    )
}

export default Profile