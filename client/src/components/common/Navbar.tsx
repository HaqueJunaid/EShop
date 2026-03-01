import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowDown } from "react-icons/io";

const Navbar: React.FC = () => {

    const [activeDropdownUrl, setActiveDropdownUrl] = useState<string | null>(null)

    const dropdown = [
        { title: "Assets", url: "assets" },
        {
            title: "Boards & Signage", url: "boards-signage", baseItems: [
                { title: "Guest pick up card", url: "guest-pickup-card" },
                { title: "Playful Sign", url: "playful-sign" },
                { title: "Wedding Contact Board", url: "wedding-contact-board" },
                { title: "Wedding Welcome Board", url: "wedding-welcome-board" },
                { title: "Wedding Vow Board", url: "wedding-vow-board" },
            ]
        },
        {
            title: "Room Stationery", url: "room-stationery", baseItems: [
                { title: "Door Dangler", url: "door-dangler" },
                { title: "Hangover Kit", url: "hangover-kit" },
                { title: "Itinerary", url: "itinerary" },
                { title: "Tent Card", url: "tent-card" },
                { title: "Gift & Hamper Tags", url: "gift-hamper-tags" },
                { title: "Welcome Note", url: "welcome-note" },
            ]
        },
        {
            title: "Utility Stationery", url: "utility-stationery", baseItems: [
                { title: "Menu Card", url: "menu-card" },
                { title: "Ritual Kit", url: "ritual-kit" },
            ]
        },
        {
            title: "Fun & Entertainment", url: "fun-entertainment", baseItems: [
                { title: "Ghunghroo Sticks", url: "ghunghroo-sticks" },
                { title: "Popcorn Tub", url: "popcorn-tub" },
                { title: "Newspaper", url: "newspaper" },
                { title: "Tambola Tickets", url: "tambola-tickets" },
                { title: "Playing Cards", url: "playing-cards" },
                { title: "Instagram / Snapchat Filter", url: "instagram-snapchat-filter" },
            ]
        },
        {
            title: "Thermatic Elements", url: "thermatic-elements", baseItems: [
                { title: "Coconut Stamp", url: "coconut-stamp" },
                { title: "Food Topper", url: "food-topper" },
                { title: "Drink Stirrers", url: "drink-stirrers" },
                { title: "Petal Cones", url: "petal-cones" },
                { title: "Paper Cups", url: "paper-cups" },
                { title: "Straws", url: "straws" },
                { title: "Tissue Paper", url: "tissue-paper" },
            ]
        },
        {
            title: "Favour & Gifts", url: "favour-gifts", baseItems: [
                { title: "Bells With Tags", url: "bells-with-tags" },
                { title: "Badges", url: "badges" },
                { title: "Chocolate Wrapper", url: "chocolate-wrapper" },
                { title: "Luggage Tags", url: "luggage-tags" },
                { title: "Favour Paper Bags", url: "favour-paper-bags" },
                { title: "Jute Bags", url: "jute-bags" },
                { title: "Money Envelope", url: "money-envelope" },
                { title: "Pin Brooches", url: "pin-brooches" },
                { title: "Wedding Stickers", url: "wedding-stickers" },
                { title: "Welcome Mala", url: "welcome-mala" },
            ]
        },
        {
            title: "Invites & Planner", url: "invites-planner", baseItems: [
                { title: "E-Invite", url: "e-invite" },
                { title: "Wardrobe Planner", url: "wardrobe-planner" },
                { title: "Logo", url: "logo" },
                { title: "Hashtag", url: "hashtag" },
                { title: "Wax Seals", url: "wax-seals" },
                { title: "Wedding Logo Template", url: "wedding-logo-template" },
            ]
        },
    ]

    return (
        <nav className='w-full'>
            <div className='hidden lg:block relative bg-stone-50 p-1.5 border-stone-200 border-b w-full'>
                <div className='top-0 left-0 relative flex justify-center items-center gap-5 mx-auto w-2/3 h-fit'>
                    <Link to={"/"} className='hover:underline'>Home</Link>
                    <div className='group relative'>
                        <Link to={"/products"} className='flex justify-center items-center hover:underline'>Products <IoIosArrowDown className='mt-1 ml-1 size-4' /></Link>
                        <div className='hidden group-hover:block left-0 absolute bg-white shadow-md p-1.5 border border-stone-200 w-fit'>
                            {dropdown.map((item) => (
                                <div
                                    key={item.url}
                                    className='block relative hover:bg-stone-100 mb-1 p-0.5 w-full text-sm text-nowrap'
                                    onMouseEnter={() => setActiveDropdownUrl(item.url)}
                                    onMouseLeave={() => setActiveDropdownUrl((prev) => (prev === item.url ? null : prev))}
                                >

                                    <Link to={`/products/${item.url}`} className='flex items-center gap-0.5 cursor-pointer'>
                                        {item.title}
                                        {item.baseItems && <IoIosArrowDown className='mt-0.5 size-3 -rotate-90' />}
                                    </Link>

                                    {item.baseItems && activeDropdownUrl === item.url && (
                                        <div className='top-0 left-30 z-10 absolute bg-white shadow-md ml-2 p-1.5 border border-stone-200'>
                                            {item.baseItems.map((baseItem) => (
                                                <Link
                                                    key={baseItem.url}
                                                    className='block hover:bg-stone-100 mb-1 p-0.5 w-full text-sm text-nowrap'
                                                    to={`/products/${baseItem.url}`}
                                                >
                                                    {baseItem.title}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <Link to={"/faqs"} className='hover:underline'>FAQS</Link>
                    <Link to={"/about-us"} className='hover:underline'>About Us</Link>
                    <Link to={"/contact-us"} className='hover:underline'>Contact Us</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar