import { useEffect, useState } from "react";

import "./App.css";
import Pagination from "./pagination";

function App() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`
      );
      const data = await response.json();
      setProducts(data.products);
      setTotal(data.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div className="product-list-container">
      <h1>Product list</h1>
      <ul className="product-list">
        {products && products.length ? (
          products.map((item) => (
            <div key={item.id}>
              <li className="products">
                <img src={item.thumbnail} alt={item.title} />
                <span>{item.title}</span>
                <p>{item.price < 100 ? item.price * 10 : item.price}</p>
              </li>
            </div>
          ))
        ) : (
          <h2>Loading...</h2>
        )}
      </ul>

      <Pagination
        products={products}
        total={total}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}

export default App;
