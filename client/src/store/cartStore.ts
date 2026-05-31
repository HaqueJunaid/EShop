import { create } from "zustand";
import { persist } from "zustand/middleware";

interface cartItemInterface {
    productId: number,
    productName: string,
    productPrice: number | string,
    productImage: string | undefined,
    productQuantity: number,
}

interface cartStoreInterface {
    cartItems: cartItemInterface[],
    addCartItem: (cartItem: cartItemInterface) => void,
    removeCartItem: (productId: number) => void,
    updateCartItemQuantity: (productId: number, quantity: number) => void,
    clearCart: () => void,
    getCartTotal: () => number,
    getCartItemsLength: () => number,
    getCartIsInCart: (productId: number) => boolean,
}

export const useCartStore = create<cartStoreInterface>()(
    persist(
        (set, get) => ({
    cartItems: [],
    addCartItem: (cartItem) => {
        const normalizedItem = {
            ...cartItem,
            productPrice: typeof cartItem.productPrice === 'string' ? parseFloat(String(cartItem.productPrice)) : cartItem.productPrice,
            productQuantity: cartItem.productQuantity,
        }
        const existingItem = get().cartItems.find(item => item.productId === normalizedItem.productId);
        if (existingItem) {
            set((state) => ({
                cartItems: state.cartItems.map(item =>
                    item.productId === normalizedItem.productId
                        ? { ...item, productQuantity: item.productQuantity + 1 }
                        : item
                )
            }));
        } else {
            set((state) => ({ cartItems: [...state.cartItems, normalizedItem] }));
        }
    },
    removeCartItem: (productId) => (
        set((state) => ({ cartItems: state.cartItems.filter((item) => item.productId !== productId) }))
    ),
    updateCartItemQuantity: (productId, quantity) => (
        set((state) => 
            ({ cartItems: state.cartItems.map((item) => item.productId === productId ? { ...item, productQuantity: quantity } : item) }))
    ),
    clearCart: () => set({ cartItems: [] }),
    getCartTotal: () => {
        const cartItems = get().cartItems;
        return cartItems.reduce((total, item) => {
            const price = typeof item.productPrice === 'string' ? parseFloat(item.productPrice) : item.productPrice;
            return total + (price * item.productQuantity);
        }, 0);
    },
    getCartItemsLength: () => {
        const cartItems = get().cartItems;
        return cartItems.length;
    },
    getCartIsInCart: (productId: number) => {
        const cartItems = get().cartItems;
        return cartItems.some((item) => item.productId === productId);
    }
}),
        {
            name: 'cart-storage',
        }
    )
)