import { useWishlistStore } from "../../store/wishlistStore"
import toast from "react-hot-toast"
import { FaHeart, FaRegHeart } from "react-icons/fa"

const AddToWishListButton = ({ id, title, price, imageUrl }: { id: string, title: string, price: string | number, imageUrl: string | undefined }) => {

    const addToWishlist = useWishlistStore((state: any) => state.addWishlistItem)
    const removeFromWishlist = useWishlistStore((state: any) => state.removeWishlistItem)
    const isAddedToWishList = useWishlistStore((state: any) => state.isInWishlist(id))

    const normalizePrice = (val: string | number) => {
        if (typeof val === 'number') return val
        const cleaned = String(val).replace(/[^0-9.-]/g, '')
        const parsed = parseFloat(cleaned)
        return Number.isFinite(parsed) ? parsed : 0
    }

    const toggleWishlist = () => {
        if (isAddedToWishList) {
            removeFromWishlist(id)
            toast.success(`Product removed from wishlist`, {
                style: {
                    border: '1px solid #0C0A09',
                    padding: '16px',
                    color: '#0C0A09',
                },
                iconTheme: {
                    primary: '#0C0A09',
                    secondary: '#FAFAF9',
                },
            })
        } else {
            addToWishlist({
                productId: String(id),
                productName: title,
                productPrice: normalizePrice(price),
                productImage: imageUrl,
            })
            toast.success(`Product added to wishlist`, {
                style: {
                    border: '1px solid #00B065',
                    padding: '16px',
                    color: '#00B065',
                },
                iconTheme: {
                    primary: '#00B065',
                    secondary: '#FAFAF9',
                },
            })
        }
    }
    return (
        <button type='button' className='text-stone-800 cursor-pointer group' onClick={toggleWishlist} aria-label='Wishlist'>
            {isAddedToWishList ? <FaHeart className='size-6 sm:size-8 text-[#E41F66] group-hover:scale-110 transition-all duration-300 ease-in-out' /> : <FaRegHeart className='size-6 sm:size-8 text-stone-900 group-hover:scale-110 transition-all duration-300 ease-in-out' />}
        </button>
    )
}

export default AddToWishListButton