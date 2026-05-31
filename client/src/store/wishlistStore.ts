import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistItemInterface {
    productId: string,
    productName: string,
    productPrice: number,
    productImage: string,
}

interface WishlistStoreInterface {
    wishlistItems: WishlistItemInterface[],
    addWishlistItem: (wishlistItem: WishlistItemInterface) => void,
    removeWishlistItem: (productId: string) => void,
    clearWishlist: () => void,
    getWishlistItemsLength: () => number,
    isInWishlist: (productId: string) => boolean,
}

export const useWishlistStore = create<WishlistStoreInterface>()(
    persist(
        (set, get) => ({
            wishlistItems: [],
            addWishlistItem: (wishlistItem) => {
                const normalized: any = {
                    ...wishlistItem,
                    productId: String(wishlistItem.productId),
                    productPrice: typeof wishlistItem.productPrice === 'string' ? parseFloat(String(wishlistItem.productPrice).replace(/[^0-9.-]/g, '')) || 0 : wishlistItem.productPrice,
                }
                const exists = get().wishlistItems.some(item => item.productId === normalized.productId);
                if (!exists) {
                    set((state) => ({ wishlistItems: [...state.wishlistItems, normalized] }));
                }
            },
            removeWishlistItem: (productId) => (
                set((state) => ({ wishlistItems: state.wishlistItems.filter((item) => item.productId !== productId) }))
            ),
            clearWishlist: () => set({ wishlistItems: [] }),
            getWishlistItemsLength: () => {
                const wishlistItems = get().wishlistItems;
                return wishlistItems.length;
            },
            isInWishlist: (productId) => {
                const wishlistItems = get().wishlistItems;
                return wishlistItems.some((item) => item.productId === productId);
            },
        }),
        {
            name: 'wishlist-storage',
        }
    )
)
