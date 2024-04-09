// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Products.css'; // Import combined CSS for both views

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // State for AddProduct form fields
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState(0);
//   const [description, setDescription] = useState('');
//   const [qty, setQty] = useState(0);
//   const [errorMessage, setErrorMessage] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       setError(null);

//       try {
//         const response = await axios.get('http://localhost:8080/getProducts'); // Replace with your API endpoint
//         setProducts(response.data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array: fetch data only on component mount

//   const handleProductAdded = async (newProduct) => {
//     try {
//       const response = await axios.post('http://localhost:8080/product', newProduct, {
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (response.status === 200) {
//         // Successfully added product, update local state and clear form
//         setProducts([...products, newProduct]);
//         setName('');
//         setPrice(0);
//         setDescription('');
//         setQty(0);
//       } else {
//         throw new Error(`Failed to add product: ${response.statusText}`);
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Basic validation (can be extended)
//     if (!name || !price || !description || !qty) {
//       setErrorMessage('Please fill in all required fields.');
//       return;
//     }

//     const productData = { name, price, description, qty };

//     try {
//       await handleProductAdded(productData);
//       setErrorMessage(null); // Clear error message on success
//     } catch (error) {
//       setErrorMessage(error.message);
//     }
//   };

//   if (isLoading) {
//     return <p>Loading products...</p>;
//   }

//   if (error) {
//     return <p className="error-message">Error: {error}</p>;
//   }

//   if (!products.length) {
//     return <p>No products found.</p>;
//   }

//   return (
//     <div className="products-container">
//       <h2>Products</h2>
//       <div className="add-product">
//         <h3>Add Product</h3>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="price">Price:</label>
//             <input
//               type="number"
//               id="price"
//               value={price}
//               onChange={(e) => setPrice(Number(e.target.value))} // Ensure numeric input
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="description">Description:</label>
//             <textarea
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="qty">Quantity:</label>
//             <input
//               type="number"
//               id="qty"
//               value={qty}
//               onChange={(e) => setQty(Number(e.target.value))} // Ensure numeric input
//             />
//           </div>
//           <button type="submit">Add Product</button>
//           {errorMessage && <p className="error-message">{errorMessage}</p>}
//         </form>
//       </div>
//       <div className="view-products">
//         <h3>View Products</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Price</th>
//               <th>Description</th>
//               <th>Quantity</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product.id}> {/* Use a unique identifier like product ID for key */}
//                 <td>{product.name}</td>
//                 <td>${product.price.toFixed(2)}</td> {/* Format price with 2 decimal places */}
//                 <td>{product.description}</td>
//                 <td>{product.qty}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   export de
