import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import useStore from "@/store/useStore";

function ProductCard({ id, name, price, category, image, thumbnail, openEditModal, isAddPage }) {
    const { deleteProduct, favorites, toggleFavorite, addToBasket } = useStore();
    
    const isFavorite = favorites.some((p) => p.id === id);
    const productImage = image || thumbnail || "/default-image.jpg"; 

    const handleDelete = () => {
        if (window.confirm("Haqiqatan ham ushbu mahsulotni o'chirmoqchimisiz?")) {
            deleteProduct(id);
        }
    };

    return (
        <div className="product-card">
            <FontAwesomeIcon
                icon={isFavorite ? faHeartSolid : faHeart}
                onClick={() => toggleFavorite({ id, name, price, category, image: productImage })}
                className={`product-card__like ${isFavorite ? "liked" : ""}`}
            />
            <img src={productImage} alt={name} onError={(e) => e.target.src = "product-default.png"} />
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
                    <button className="edit-btn" onClick={() => openEditModal({ id, name, price, category, image: productImage })}>
                        <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                    <button className="delete-btn" onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                </div>
            ) : (
                <button className="product-card__btn" onClick={() => addToBasket({ id, name, price, category, image: productImage })}>
                    <FontAwesomeIcon icon={faCartShopping} /> Buy
                </button>
            )}
        </div>
    );
}

export default ProductCard;
