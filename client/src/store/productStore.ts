import { create } from "zustand";

interface ProductStore {
    products: any[];
    fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>()((set) => ({
    products: [],
    fetchProducts: async () => {
        let res = await fetch("https://dummyjson.com/products");
        let data = await res.json();
        set({ products: data.products });
    }
}))