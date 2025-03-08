import React, { useState, useEffect } from "react";
import CurrencyInput from "react-currency-input-field";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import useStore from "@/store/useStore";
import ProductCard from "@/components/ProductCard/ProductCard";

function Add() {
  const { addProduct, editProduct, products } = useStore();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  const convertToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
    reader.onerror = (error) => console.log("Error:", error);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      convertToBase64(file, (base64) => setImage(base64));
    }
  };

  const handlePriceChange = (value) => {
    setPrice(value);
    setIsValid(!value || parseFloat(value) >= 0);
  };

  const openEditModal = (product) => {
    setIsEdit(true);
    setEditId(product.id);
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    setImage(product.image);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !category || !image) {
      alert("Iltimos barcha maydonlarni to'ldiring!");
      return;
    }
    if (isEdit) {
      editProduct(editId, { name, price, category, image });
    } else {
      addProduct({ id: Date.now(), name, price, category, image });
    }

    setIsModalOpen(false);
    setIsEdit(false);
    setEditId(null);
    setName("");
    setPrice("");
    setCategory("");
    setImage(null);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  return (
    <div className="add">
      <div className="container">
        <div className="add__header">
          <h2>Add Product</h2>
          <button className="open__btn" onClick={() => setIsModalOpen(true)}>Add Product</button>
        </div>
        {isModalOpen && (
          <div className="overlay" onClick={() => setIsModalOpen(false)}>
            <div className="add__content" onClick={(e) => e.stopPropagation()}>
              <form onSubmit={handleSubmit}>
                <div className="image-upload">
                  <label className="upload-box">
                    {image ? <img src={image} alt="Uploaded" className="preview" /> : <span>📷 Upload Image</span>}
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                  </label>
                </div>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <CurrencyInput
                  id="price"
                  name="price"
                  placeholder="Enter price"
                  prefix="$"
                  decimalsLimit={2}
                  className={`border ${isValid ? "" : "border-error"}`}
                  value={price}
                  onValueChange={handlePriceChange}
                />
                {!isValid && <p className="error-text">Invalid price!</p>}
                <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                <button type="submit" className="add__btn">{isEdit ? "Save Changes" : "Add Product"}</button>
              </form>

              <div className="add__img-box">
                <button className="add__img-close" onClick={() => setIsModalOpen(false)}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
                <img src="add-product.png" alt="" className="add__img" />
              </div>
            </div>
          </div>
        )}
        <div className="add__list">
          {products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard key={index} {...product} openEditModal={openEditModal} isAddPage={true} />
            ))
          ) : (
            <p>Hali mahsulot qo'shilmagan</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Add;
