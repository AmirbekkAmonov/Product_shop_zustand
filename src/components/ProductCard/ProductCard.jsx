import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import useProduct from "@/store/useProduct";
import useFavorite from "@/store/useFavorite";
import useBasket from "@/store/useBasket";

function ProductCard({ id, name, price, category, image, openEditModal, isAddPage }) {
    const deleteProduct = useProduct((state) => state.deleteProduct);
    const products = useProduct((state) => state.products);
    const { favorites, toggleFavorite } = useFavorite();
    const { addToBasket } = useBasket();

    const product = products.find((p) => p.id === id);
    const isFavorite = favorites.some((p) => p.id === id);

    const handleDelete = () => {
        if (window.confirm("Haqiqatan ham ushbu mahsulotni o'chirmoqchimisiz?")) {
            deleteProduct(id);
        }
    };

    return (
        <div className="product-card">
            <FontAwesomeIcon
                icon={isFavorite ? faHeartSolid : faHeart}
                onClick={() => toggleFavorite(product)}
                className={`product-card__like ${product?.liked ? "liked" : ""}`}
            />
            <img src={image} alt={name} />
            <div className="product-card__content">
                <h3>Name: <span>{name}</span></h3>
                <p>Price: <span>{new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD"
                }).format(price)}</span></p>

                <p>Category: <span>{category}</span></p>
            </div>

            {isAddPage ? (
                <div className="product-card__buttons">
                    <button className="edit-btn" onClick={() => openEditModal({ id, name, price, category, image })}>
                        <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                    <button className="delete-btn" onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                </div>
            ) : (
                <button className="product-card__btn" onClick={() => addToBasket(product)}><FontAwesomeIcon icon={faCartShopping} /> Buy</button>
            )}
        </div>
    );
}

export default ProductCard;
