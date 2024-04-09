import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const AddProduct = ({ onProductAdded }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [qty, setQty] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !price || !description || !qty) {
      toast('Please fill in all required fields.');
      return;
    }

    const productData = { name, price, description, qty };

    try {
      const response = await axios.post("http://localhost:8080/product", productData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        setName('');
        setPrice(0);
        setDescription('');
        setQty(0);
        if (onProductAdded) {
            toast("Product Added Successfully!!!");
            onProductAdded(); 
          }
      } else {
        toast(`Failed to add product: ${response.statusText}`);
      }
    } catch (error) {
      toast(error.message);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="qty">Quantity:</label>
          <input
            type="number"
            id="qty"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))} 
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
