"use client";

import { useEffect, useState } from "react";
import SimpleSlider from "./components/Slider/Slider";

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/sellers');
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="max-w-screen-lg mx-auto p-4">
        <SimpleSlider />
      </div>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow p-4">
          <div className="text-gray-600 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.slice(0, 12).map(product => (
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
    </>
  );
};

export default HomePage;


