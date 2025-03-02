import React from 'react'
import ProductCard from '@/components/ProductCard/ProductCard'
import useProduct from '@/store/useProduct';

function Home() {
  const products = useProduct((state) => state.products);

  return (
    <div className='home'>
      <div className='container'>
        <h2>Home Page</h2>
      <div className="home__list">
          {products.length > 0 ? (
            products.map((product) => <ProductCard key={product.id} {...product} />)
          ) : (
            <p>Hali mahsulot qo'shilmagan</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home