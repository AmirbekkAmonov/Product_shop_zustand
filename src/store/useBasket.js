import { create } from "zustand";

const useBasket = create((set) => {
    const savedBasket = JSON.parse(localStorage.getItem("basket")) || [];

    return {
        basket: savedBasket,
        addToBasket: (product) =>
            set((state) => {
                const isAlreadyInBasket = state.basket.some((p) => p.id === product.id);
                if (!isAlreadyInBasket) {
                    const updatedBasket = [...state.basket, { ...product, quantity: 1 }];
                    localStorage.setItem("basket", JSON.stringify(updatedBasket));
                    return { basket: updatedBasket };
                }
                return state;
            }),

        removeFromBasket: (id) =>
            set((state) => {
                const updatedBasket = state.basket.filter((p) => p.id !== id);
                localStorage.setItem("basket", JSON.stringify(updatedBasket));
                return { basket: updatedBasket };
            }),

        increaseQuantity: (id) =>
            set((state) => {
                const updatedBasket = state.basket.map((p) =>
                    p.id === id ? { ...p, quantity: p.quantity + 1 } : p
                );
                localStorage.setItem("basket", JSON.stringify(updatedBasket));
                return { basket: updatedBasket };
            }),

        decreaseQuantity: (id) =>
            set((state) => {
                const updatedBasket = state.basket.map((p) =>
                    p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
                );
                localStorage.setItem("basket", JSON.stringify(updatedBasket));
                return { basket: updatedBasket };
            }),
    };
});

export default useBasket;
