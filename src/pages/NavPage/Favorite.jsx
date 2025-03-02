import React from 'react'
import ProductCard from '@/components/ProductCard/ProductCard';
import useFavorite from '@/store/useFavorite';

function Favorite() {
  const favorites = useFavorite((state) => state.favorites);
  return (
    <div className='favorite'>
      <div className='container'>
        <h2>Favorite Products</h2>
        <div className="favorites__list">
          {favorites.length > 0 ? (
            favorites.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <p>Hali sevimli mahsulotlar yo'q!</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Favorite