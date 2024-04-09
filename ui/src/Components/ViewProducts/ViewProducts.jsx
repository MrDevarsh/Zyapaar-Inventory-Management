import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewProducts.css';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('http://localhost:8080/getProducts'); 
        setProducts(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); 

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  if (!products.length) {
    return <p>No products found.</p>;
  }

  return (
    <div className="view-products-container">
      <h2>View Products</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}> 
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.description}</td>
              <td>{product.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProducts;
