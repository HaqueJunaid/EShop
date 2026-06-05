import { useEffect, useState } from "react";
import { useCartStore } from "../../store/cartStore";
import toast from 'react-hot-toast';
import { ShoppingBag } from "lucide-react";

interface Product {
    id: string;
    title: string;
    price: string | undefined;
    imageUrl: string | undefined;
}

const AddToCartButton = ({ product }: { product: Product }) => {
    const addToCart = useCartStore((state: any) => state.addCartItem);
    const getCartIsInCart = useCartStore((state: any) => state.getCartIsInCart);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        const idNum = Number(String(product.id))
        setIsInCart(Number.isFinite(idNum) ? getCartIsInCart(idNum) : false);
    }, [addToCart, product.id]);

    return (
        <>
            <button
                type='button'
                className={`relative w-full flex flex-nowrap items-center justify-center gap-3 cursor-pointer text-xs text-nowrap lg:text-sm ${isInCart ? 'bg-transparent border-2 border-stone-950 text-stone-950' : 'bg-stone-950 text-stone-50 border-2 border-stone-950'} rounded-md py-3 overflow-hidden group hover:scale-95 transition-all druation-300 ease-in-out`}
                onClick={() => {
                    const idNum = Number(String(product.id))
                    if (!Number.isFinite(idNum)) {
                        toast.error('Cannot add product to cart: invalid product id')
                        return
                    }
                    const cleanedPrice = typeof product.price === 'number' ? product.price : parseFloat(String(product.price).replace(/[^0-9.-]/g, '')) || 0
                    addToCart({ productId: idNum, productName: product.title, productPrice: cleanedPrice, productImage: product.imageUrl, productQuantity: 1 });
                    setIsInCart(true);
                    toast.success(`Product added to cart`, {
                        style: {
                            border: '1px solid #00B065',
                            padding: '16px',
                            color: '#00B065',
                        },
                        iconTheme: {
                            primary: '#00B065',
                            secondary: '#FAFAF9',
                        },
                    });
                }}
                disabled={!product.id}
            >
                <ShoppingBag className={`${isInCart ? 'text-stone-950' : 'text-stone-50 opacity-0'} hidden size-4 group-hover:inline-block group-hover:opacity-100 transition-all druation-300 ease-in-out`} />
                {isInCart ? 'ADDED' : 'ADD TO CART'}
            </button>
        </>
    )
}

export default AddToCartButton