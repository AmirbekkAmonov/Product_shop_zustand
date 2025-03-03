import React from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import useStore from "@/store/useStore";

function Home() {
  const products = useStore((state) => state.products);

  return (
    <div className="home">
      <div className="container">
        <h2>Home Page</h2>
        <div className="home__list">
          {products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard key={index} {...product} isAddPage={false} />
            ))
          ) : (
            <p>Hali mahsulot qo'shilmagan</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
