import { useEffect, useState } from "react";
import { useCartStore } from "../../store/cartStore";
import toast from 'react-hot-toast';
import { ShoppingBag } from "lucide-react";
import type { AddToCartProduct as Product } from "../../types/allTypes";

const AddToCartButton = ({ product, variant = 'default' }: { product: Product; variant?: 'default' | 'luxury' }) => {
    const addToCart = useCartStore((state: any) => state.addCartItem);
    const getCartIsInCart = useCartStore((state: any) => state.getCartIsInCart);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        setIsInCart(product.id ? getCartIsInCart(product.id) : false);
    }, [getCartIsInCart, product.id]);

    const getButtonStyles = () => {
        if (variant === 'luxury') {
            return isInCart
                ? 'w-full flex flex-nowrap items-center justify-center gap-2 cursor-pointer text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase py-3 border border-[#E41F66] bg-transparent text-[#E41F66] hover:bg-pink-50/20 transition-all duration-300 ease-in-out'
                : 'w-full flex flex-nowrap items-center justify-center gap-2 cursor-pointer text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase py-3 border border-stone-900 bg-stone-900 text-stone-50 hover:bg-[#E41F66] hover:border-[#E41F66] transition-all duration-300 ease-in-out';
        }
        return `relative w-full flex flex-nowrap items-center justify-center gap-3 cursor-pointer text-xs text-nowrap lg:text-sm ${isInCart ? 'bg-transparent border-2 border-stone-950 text-stone-950' : 'bg-stone-950 text-stone-50 border-2 border-stone-950'} rounded-md py-3 overflow-hidden group hover:scale-95 transition-all duration-300 ease-in-out`;
    };

    return (
        <>
            <button
                type='button'
                className={getButtonStyles()}
                onClick={() => {
                    if (!product.id) {
                        toast.error('Cannot add product to cart: invalid product id')
                        return
                    }
                    const cleanedPrice = typeof product.price === 'number' ? product.price : parseFloat(String(product.price).replace(/[^0-9.-]/g, '')) || 0
                    const qty = product.quantity && product.quantity > 0 ? product.quantity : 1;
                    addToCart({ 
                        productId: product.id, 
                        productName: product.title, 
                        productPrice: cleanedPrice, 
                        productImage: product.imageUrl, 
                        productQuantity: qty,
                        selectedVariant: product.selectedVariant,
                        uploadedImage: product.uploadedImage,
                        customizations: product.customizations,
                    });
                    setIsInCart(true);
                    toast.success(`Product added to cart`);
                }}
                disabled={!product.id}
            >
                <ShoppingBag className={`${variant === 'luxury' ? (isInCart ? 'text-[#E41F66]' : 'text-stone-50') : (isInCart ? 'text-stone-950' : 'text-stone-50 opacity-0')} hidden size-4 group-hover:inline-block group-hover:opacity-100 transition-all duration-300 ease-in-out`} />
                {isInCart ? 'ADDED' : 'ADD TO CART'}
            </button>
        </>
    )
}

export default AddToCartButton