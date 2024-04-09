import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewProducts.css';
import DeleteIcon from '@mui/icons-material/Delete'; 
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const ViewProducts = ({ refreshView }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productId, setProductId] = useState(null);
  const [qty, setQty] = useState(null);
  const [editProductId, setEditProductId] = useState(null);
  
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/getProducts'); 
      setProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
    } 
  };

  useEffect(() => {
    fetchData();
  }, [refreshView]);

  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:8080/delete?id=' + id); 
      toast.success('Product deleted successfully');
      fetchData();
    } catch (error) {
      toast.error(error.message);
    } 
  }

  const handleEdit = async (id) => {
    try {
      await axios.put('http://localhost:8080/updateStock', { productId, qty }, {
        headers: { 'Content-Type': 'application/json' },
      });
      toast.success('Product quantity updated successfully');
      setEditProductId(null);
      fetchData();
    } catch (error) {
      toast.error(error.message);
    } 
  }

  const handleEditClick = (id, currentQty) => {
    setEditProductId(id);
    setProductId(id);
    setQty(currentQty);
  }

  const handleCancelEdit = () => {
    setEditProductId(null);
    setProductId(null);
    setQty(null);
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
              <td>
                {editProductId === product.id ? (
                  <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} />
                ) : (
                  product.qty
                )}
              </td>
              <td>
                {editProductId === product.id ? (
                  <>
                    <DoneIcon className='icon' onClick={() => handleEdit(product.id)} />
                    <CloseIcon className='icon' onClick={handleCancelEdit} />
                  </>
                ) : (
                  <>
                    <EditIcon className='icon' onClick={() => handleEditClick(product.id, product.qty)} />
                    <DeleteIcon className='icon' onClick={() => handleDelete(product.id)} />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProducts;
