import React, { useState } from 'react';
import AddProduct from '../Products/AddProduct';
import ViewProducts from '../ViewProducts/ViewProducts';
import './Home.css'; 
const Home = () => {
  const [refreshView, setRefreshView] = useState(false);

  const handleProductAdded = () => {
    setRefreshView(!refreshView);
  };

  return (
    <div className="home-container">
      <div className="add-product">
        <AddProduct 
        // onProductAdded={handleProductAdded}
         /> 
      </div>
      <div className="view-products">
        <ViewProducts 
        // key={refreshView ? 'refreshed' : 'not-refreshed'}
         />
      </div>
    </div>
  );
}

export default Home;
