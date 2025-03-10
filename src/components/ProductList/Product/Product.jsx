import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import useStore from "@/store/useStore";

function Product({ product, openEditModal }) {
    const { deleteProduct, favorites, toggleFavorite, addToBasket, user } = useStore();
    
    const isFavorite = favorites.some((p) => p.id === product.id);
    const productImage = product.image || product.thumbnail || "/default-image.jpg"; 
    const isLoggedIn = !!user; 

    const handleDelete = () => {
        if (window.confirm("Haqiqatan ham ushbu mahsulotni o'chirmoqchimisiz?")) {
            deleteProduct(product.id);
        }
    };

    return (
        <div className="product-card">
            {!isLoggedIn && (
                <FontAwesomeIcon
                    icon={isFavorite ? faHeartSolid : faHeart}
                    onClick={() => toggleFavorite(product)}
                    className={`product-card__like ${isFavorite ? "liked" : ""}`}
                />
            )}

            <img src={productImage} alt={product.name} onError={(e) => e.target.src = "product-default.png"} />

            <div className="product-card__content">
                <h3>Name: <span>{product.name}</span></h3>
                <p>Price: <span>${product.price}</span></p>
                <p>Category: <span>{product.category}</span></p>
            </div>

            {isLoggedIn ? (
                <div className="product-card__buttons">
                    <button className="edit-btn" onClick={() => openEditModal(product)}>
                        <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                    <button className="delete-btn" onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                </div>
            ) : (
                <button className="product-card__btn" onClick={() => addToBasket(product)}>
                    <FontAwesomeIcon icon={faCartShopping} /> Buy
                </button>
            )}
        </div>
    );
}

export default Product;
