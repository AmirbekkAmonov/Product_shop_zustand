import { create } from "zustand";

const useProduct = create((set) => ({
    products: JSON.parse(localStorage.getItem("products")) || [],

    addProduct: (product) =>
        set((state) => {
            const updatedProducts = [...state.products, { ...product, liked: false }];
            localStorage.setItem("products", JSON.stringify(updatedProducts));
            return { products: updatedProducts };
        }),

    toggleLike: (id) =>
        set((state) => {
            const updatedProducts = state.products.map((product) =>
                product.id === id ? { ...product, liked: !product.liked } : product
            );
            localStorage.setItem("products", JSON.stringify(updatedProducts));
            return { products: updatedProducts };
        }),

    deleteProduct: (id) =>
        set((state) => {
            const updatedProducts = state.products.filter((product) => product.id !== id);
            localStorage.setItem("products", JSON.stringify(updatedProducts));
            return { products: updatedProducts };
        }),

    editProduct: (id, updatedProduct) =>
        set((state) => {
            const updatedProducts = state.products.map((product) =>
                product.id === id ? updatedProduct : product
            );
            localStorage.setItem("products", JSON.stringify(updatedProducts));
            return { products: updatedProducts };
        }),
}));

export default useProduct;
