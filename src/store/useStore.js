import { create } from "zustand";

const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const loadFromLocalStorage = (key, defaultValue = []) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
};

const useStore = create((set) => ({
    basket: loadFromLocalStorage("basket"),
    addToBasket: (product) =>
        set((state) => {
            const isAlreadyInBasket = state.basket.some((p) => p.id === product.id);
            let updatedBasket = [...state.basket];

            if (isAlreadyInBasket) {
                updatedBasket = updatedBasket.map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            } else {
                updatedBasket.push({ ...product, quantity: 1 });
            }
            saveToLocalStorage("basket", updatedBasket);
            return { basket: updatedBasket };
        }),
    removeFromBasket: (id) =>
        set((state) => {
            const updatedBasket = state.basket.filter((p) => p.id !== id);
            saveToLocalStorage("basket", updatedBasket);
            return { basket: updatedBasket };
        }),
    increaseQuantity: (id) =>
        set((state) => {
            const updatedBasket = state.basket.map((p) =>
                p.id === id ? { ...p, quantity: p.quantity + 1 } : p
            );
            saveToLocalStorage("basket", updatedBasket);
            return { basket: updatedBasket };
        }),
    decreaseQuantity: (id) =>
        set((state) => {
            const updatedBasket = state.basket.map((p) =>
                p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
            );
            saveToLocalStorage("basket", updatedBasket);
            return { basket: updatedBasket };
        }),
    clearBasket: () =>
        set(() => {
            saveToLocalStorage("basket", []);
            return { basket: [] };
        }),

    favorites: loadFromLocalStorage("favorites"),
    toggleFavorite: (product) =>
        set((state) => {
            const isFavorite = state.favorites.some((p) => p.id === product.id);
            let updatedFavorites = [...state.favorites];

            if (isFavorite) {
                updatedFavorites = updatedFavorites.filter((p) => p.id !== product.id);
            } else {
                updatedFavorites.push(product);
            }
            saveToLocalStorage("favorites", updatedFavorites);
            return { favorites: updatedFavorites };
        }),

    products: loadFromLocalStorage("products"),
    addProduct: (product) =>
        set((state) => {
            const updatedProducts = [...state.products, { ...product, liked: false }];
            saveToLocalStorage("products", updatedProducts);
            return { products: updatedProducts };
        }),

    deleteProduct: (id) =>
        set((state) => {
            const updatedProducts = state.products.filter((p) => p.id !== id);
            const updatedBasket = state.basket.filter((p) => p.id !== id);
            const updatedFavorites = state.favorites.filter((p) => p.id !== id);

            saveToLocalStorage("products", updatedProducts);
            saveToLocalStorage("basket", updatedBasket);
            saveToLocalStorage("favorites", updatedFavorites);
            return { products: updatedProducts, basket: updatedBasket, favorites: updatedFavorites };
        }),
    editProduct: (id, updatedProduct) =>
        set((state) => {
            const updatedProducts = state.products.map((p) =>
                p.id === id ? { ...updatedProduct, liked: p.liked } : p
            );
            const updatedBasket = state.basket.map((p) =>
                p.id === id ? { ...updatedProduct, quantity: p.quantity } : p
            );
            const updatedFavorites = state.favorites.map((p) =>
                p.id === id ? { ...updatedProduct } : p
            );
            saveToLocalStorage("products", updatedProducts);
            saveToLocalStorage("basket", updatedBasket);
            saveToLocalStorage("favorites", updatedFavorites);
            return { products: updatedProducts, basket: updatedBasket, favorites: updatedFavorites };
        }),

    language: localStorage.getItem("language") || "en",
    setLanguage: (lang) =>
        set(() => {
            localStorage.setItem("language", lang);
            return { language: lang };
        }),

    darkMode: JSON.parse(localStorage.getItem("darkMode")) ?? false,
    toggleDarkMode: () =>
        set((state) => {
            const newDarkMode = !state.darkMode;
            saveToLocalStorage("darkMode", newDarkMode);

            if (newDarkMode) {
                document.body.classList.add("dark-mode");
            } else {
                document.body.classList.remove("dark-mode");
            }
            return { darkMode: newDarkMode };
        }),
}));

export default useStore;
