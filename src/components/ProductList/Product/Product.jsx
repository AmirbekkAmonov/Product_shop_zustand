import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import useStore from "@/store/useStore";

function Product({ product }) {
  const { addToBasket, toggleFavorite, basket, favorites } = useStore();

  const isFavorite = favorites.some((p) => p.id === product.id);
  const isInBasket = basket.some((p) => p.id === product.id);

  return (
    <div className="product-card">

      <FontAwesomeIcon
        icon={isFavorite ? faHeartSolid : faHeart}
        onClick={() => toggleFavorite(product)}
        className={`product-card__like ${isFavorite ? "liked" : ""}`}
      />

      <img src={product.thumbnail || product.image || "product-default.png"} alt={product.name} />

      <div className="product-card__content">
        <h3>Name: <span>{product.name}</span></h3>
        <p>Price: <span>${product.price}</span></p>
        <p>Category: <span>{product.category}</span></p>
      </div>

      <button
        className="product-card__btn"
        onClick={() => addToBasket(product)}
        disabled={isInBasket}
      >
        <FontAwesomeIcon icon={faCartShopping} /> Buy
      </button>
    </div>
  );
}

export default Product;
