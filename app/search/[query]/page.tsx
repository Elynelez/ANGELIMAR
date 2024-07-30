"use client";

import { useEffect, useState } from 'react';

const SearchPage = ({ params }: { params: { query: string } }) => {
  const query = params.query;
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/sellers');
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => product.name && product.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-500 dark:text-white">Resultados para &quot;{query}&quot;</h1>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow p-4">
          <div className="text-gray-600 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <div key={product.id} className="group-image p-4 rounded-lg ">
                <a href={`/product/${product.id}`}>
                  <figure className="mb-4">
                    <img src={product.photo[0]} alt={product.name} className="w-full h-auto rounded-lg w-[300px] sm:w-[450px] h-[200px] sm:h-[250px]" />
                  </figure>
                </a>
                <div>
                  <h2 className="text-xl font-bold mb-2 ">{product.name}</h2>
                  <p className="text-lg mb-2">{product.price}</p>
                  <p className="text-sm">{product.services.join(", ")}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SearchPage;