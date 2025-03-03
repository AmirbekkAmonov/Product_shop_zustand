import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid, faTrash } from "@fortawesome/free-solid-svg-icons";
import useStore from "@/store/useStore";

function Basket() {
  const { basket, removeFromBasket, increaseQuantity, decreaseQuantity, favorites, toggleFavorite } = useStore();

  return (
    <div className="basket">
      <div className="container">
        <h2>Shopping Cart</h2>
        {basket.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="basket__list">
            <ul>
              {basket.map((item, index) => {
                const isFavorite = favorites.some((p) => p.id === item.id);
                return (
                  <li key={index}>
                    <div className="cart-item">
                      <img src={item.image} alt={item.name} className="cart-item-image" />
                      <div className="cart-item-info">
                        <h3>Name: <span>{item.name}</span></h3>
                        <p>Price: <span>{new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD"
                        }).format(item.price)}</span></p>
                        <p>Category: <span>{item.category}</span></p>
                      </div>
                    </div>
                    <div className="cart-item-actions">
                      <div className="cart-actions">
                        <button onClick={() => decreaseQuantity(item.id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.id)}>+</button>
                      </div>
                      <div className="cart-actions-buttons">
                        <FontAwesomeIcon
                          icon={isFavorite ? faHeartSolid : faHeart}
                          onClick={() => toggleFavorite(item)}
                          className={`basket-card__like ${isFavorite ? "liked" : ""}`}
                        />
                        <button onClick={() => removeFromBasket(item.id)} className="delete-button">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="total-price">
              <p>Total Price: <span>{new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
              }).format(basket.reduce((total, item) => total + item.price * item.quantity, 0))}</span></p>
              <button>Buy Now</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Basket;
