import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewProducts.css';
import DeleteIcon from '@mui/icons-material/Delete'; 
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ViewProducts = ({ refreshView }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchData = async () => {
    setIsLoading(true);
    

    try {
      const response = await axios.get('http://localhost:8080/getProducts'); 
      setProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      toast(error.message);
    } 
  };

  useEffect(() => {
    

    fetchData();
  }, [refreshView]);

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (!products.length) {
    return <p>No products found.</p>;
  }

  const handleDelete = async (i) => {
    
    try {
        const response = await axios.delete('http://localhost:8080/delete?id=' + i); 
        toast(response.data);
        fetchData();
      } catch (error) {
        toast(error.message);
      } 

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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}> 
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.description}</td>
              <td>{product.qty}</td>
              <td><DeleteIcon 
                    sx={{
                        'cursor': 'pointer'
                    }}
                    onClick={() => handleDelete(product.id)}
                    /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProducts;
