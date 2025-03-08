import React, { useEffect } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import useStore from "@/store/useStore";
import Product from "../components/ProductList/Product/Product";
import ProductList from "../components/ProductList/ProductList";

function Home() {
  const products = useStore((state) => state.products);
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  return (
    <div className="home">
      <div className="container">
        <h2 className="home__title">Home Page</h2>
        <div className="home__list">
          {products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard key={index} {...product} isAddPage={false} />
            ))
          ) : (
            <p>Hali mahsulot qo'shilmagan</p>
          )}
        </div>
          <ProductList />
      </div>
    </div>
  );
}

export default Home;
