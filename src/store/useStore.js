import { create } from "zustand";
import { toast } from "sonner";

const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const loadFromLocalStorage = (key, defaultValue = []) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
};

const useStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("user")) || null,

    login: (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        set({ user: userData });
        toast.success("Successfully logged in!");
    },

    logout: () => {
        localStorage.removeItem("user");
        set({ user: null });
        toast.success("Successfully logged out!");
    },

    basket: loadFromLocalStorage("basket"),
    addToBasket: (product) =>
        set((state) => {
            const isAlreadyInBasket = state.basket.some((p) => p.id === product.id);
            let updatedBasket = [...state.basket];

            if (isAlreadyInBasket) {
                updatedBasket = updatedBasket.map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                );
                toast.info("Increased product quantity!");
            } else {
                updatedBasket.push({ ...product, quantity: 1 });
                toast.success("Product added to basket!");
            }

            saveToLocalStorage("basket", updatedBasket);
            return { basket: updatedBasket };
        }),

    removeFromBasket: (id) =>
        set((state) => {
            const updatedBasket = state.basket.filter((p) => p.id !== id);
            saveToLocalStorage("basket", updatedBasket);
            toast.error("Product removed from basket!");
            return { basket: updatedBasket };
        }),

    increaseQuantity: (id) =>
        set((state) => {
            const updatedBasket = state.basket.map((p) =>
                p.id === id ? { ...p, quantity: p.quantity + 1 } : p
            );
            saveToLocalStorage("basket", updatedBasket);
            toast.info("Increased product quantity!");
            return { basket: updatedBasket };
        }),

    decreaseQuantity: (id) =>
        set((state) => {
            const updatedBasket = state.basket.map((p) =>
                p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
            );
            saveToLocalStorage("basket", updatedBasket);
            toast.info("Decreased product quantity!");
            return { basket: updatedBasket };
        }),

    clearBasket: () =>
        set(() => {
            saveToLocalStorage("basket", []);
            toast.warning("Basket cleared!");
            return { basket: [] };
        }),

    favorites: loadFromLocalStorage("favorites"),
    toggleFavorite: (product) =>
        set((state) => {
            if (!product || !product.id) {
                console.error("Product is undefined or missing id:", product);
                return state;
            }

            const isFavorite = state.favorites.some((fav) => fav.id === product.id);
            const updatedFavorites = isFavorite
                ? state.favorites.filter((fav) => fav.id !== product.id)
                : [...state.favorites, { ...product, thumbnail: product.thumbnail || product.image }];

            saveToLocalStorage("favorites", updatedFavorites);
            toast.success(isFavorite ? "Removed from favorites!" : "Added to favorites!");
            return { favorites: updatedFavorites };
        }),

    products: loadFromLocalStorage("products"),
    addProduct: (product) =>
        set((state) => {
            const newProduct = { ...product, id: product.id || Date.now(), liked: false };
            const updatedProducts = [...state.products, newProduct];

            saveToLocalStorage("products", updatedProducts);
            toast.success("Product added successfully!");
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
            toast.error("Product deleted!");
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
            toast.success("Product updated successfully!");
            return { products: updatedProducts, basket: updatedBasket, favorites: updatedFavorites };
        }),

    language: localStorage.getItem("language") || "en",
    setLanguage: (lang) =>
        set(() => {
            localStorage.setItem("language", lang);
            toast.success(`Language changed to ${lang.toUpperCase()}!`);
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
            toast.info(`Dark mode ${newDarkMode ? "enabled" : "disabled"}!`);
            return { darkMode: newDarkMode };
        }),
}));

export default useStore;
