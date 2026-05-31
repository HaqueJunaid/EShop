import { ShoppingCart } from 'lucide-react'
import OrderSummary from '../components/cart/OrderSummary'
import Cartitem from '../components/cart/Cartitem'
import { useCartStore } from '../store/cartStore'

const CartPage = () => {
    const cartItems = useCartStore((state) => state.cartItems)
    const updateCartItemQuantity = useCartStore((state) => state.updateCartItemQuantity)

    const updateQuantity = (id: number, change: number) => {
        const item = cartItems.find(item => item.productId === id)
        if (item) {
            const newQuantity = Math.max(1, item.productQuantity + change)
            updateCartItemQuantity(id, newQuantity)
        }
    }

    const subtotal = useCartStore((state) => state.getCartTotal())

    return (
        <div className="bg-stone-50 min-h-screen">
            <div className="mx-auto px-4 py-8 container">
                {/* Header */}
                <div className="flex items-start gap-3 mb-8">
                    <div className="rounded-full bg-red-100 p-3 text-red-600">
                        <ShoppingCart className="size-5" />
                    </div>
                    <div>
                        <h1 className="font-bold text-stone-900 text-3xl">My Cart</h1>
                        <p className="mt-2 text-sm text-stone-500">You have {cartItems.length} item{cartItems.length === 1 ? '' : 's'} in your cart.</p>
                        {cartItems.length > 0 && (
                            <p className="text-sm text-stone-500 mt-2">Estimated cart value: <span className="font-semibold text-stone-900">₹{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
                        )}
                    </div>
                </div>
                <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        {cartItems.length === 0 ? (
                            <div className="p-10 border border-stone-200 rounded-3xl bg-white text-center">
                                <p className="text-stone-500">Your cart is empty</p>
                            </div>
                        ) : (
                            <Cartitem cartItems={cartItems} updateQuantity={updateQuantity} />
                        )}
                        {/* <div className="bg-red-500 w-full h-screen"></div> */}
                    </div>

                    {/* Order Summary */}
                    <OrderSummary subtotal={subtotal} />
                </div>
            </div>
        </div>
    )
}

export default CartPage