import React, { useEffect } from 'react';
import ProductCard from '@/components/ProductCard/ProductCard';
import useStore from '@/store/useStore';

function Favorite() {
  const favorites = useStore((state) => state.favorites);

  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  return (
    <div className='favorite'>
      <div className='container'>
        <h2>Favorite Products</h2>
        <div className="favorites__list">
          {favorites.length > 0 ? (
            favorites.map((product, index) => (
              <ProductCard
                key={index}
                {...product}
                thumbnail={product.thumbnail || product.image || "product-default.png"} 
                isAddPage={false}
              />
            ))
          ) : (
            <p>Hali sevimli mahsulotlar yo'q!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Favorite;
