import { create } from "zustand";

const useFavorite = create((set) => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    return {
        favorites: savedFavorites,
        addToFavorites: (product) =>
            set((state) => {
                const isAlreadyFavorite = state.favorites.some((p) => p.id === product.id);
                if (!isAlreadyFavorite) {
                    const updatedFavorites = [...state.favorites, product];
                    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
                    return { favorites: updatedFavorites };
                }
                return state;
            }),

        removeFromFavorites: (id) =>
            set((state) => {
                const updatedFavorites = state.favorites.filter((product) => product.id !== id);
                localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
                return { favorites: updatedFavorites };
            }),

        toggleFavorite: (product) =>
            set((state) => {
                const isFavorite = state.favorites.some((p) => p.id === product.id);
                const updatedFavorites = isFavorite
                    ? state.favorites.filter((p) => p.id !== product.id)
                    : [...state.favorites, product];
                localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
                return { favorites: updatedFavorites };
            }),
    };
});

export default useFavorite;
