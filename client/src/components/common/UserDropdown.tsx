import { LuUserRound } from "react-icons/lu";
import { Link } from 'react-router-dom'
import { HiLogin } from "react-icons/hi";
import { FiUserPlus } from "react-icons/fi";

const UserDropdown = () => {
    return (
        <div className='group relative hidden lg:block'>
            <Link to={`/profile`} className='flex justify-center items-center hover:underline'><LuUserRound className="text-stone-800 size-5.5" /></Link>
            <div className='hidden rounded-md group-hover:block left-0 absolute bg-white shadow-md p-1.5 border border-stone-200 w-fit z-100'>
                <div className='block relative hover:bg-stone-100 mb-1 p-0.5 w-full text-sm text-nowrap z-100'>
                    <Link to={`/register`} className='flex items-center cursor-pointer gap-1 px-2 py-0.5 rounded-sm'>
                        <FiUserPlus className="size-4"/> Sign Up
                    </Link>
                </div>
                <div className='block relative hover:bg-stone-100 mb-1 p-0.5 w-full text-sm text-nowrap z-100'>
                    
                    <Link to={`/login`} className='flex items-center cursor-pointer gap-1 px-2 py-0.5 rounded-sm'>
                        <HiLogin className="size-4 rotate-180"/> Sign Ip
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserDropdown