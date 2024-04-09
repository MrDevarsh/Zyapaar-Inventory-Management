import React, { useState } from 'react';
import AddProduct from '../Products/AddProduct';
import ViewProducts from '../ViewProducts/ViewProducts';

const Home = () => {
  const [refreshView, setRefreshView] = useState(false);

  const handleProductAdded = () => {
    setRefreshView(!refreshView);
  };

  return (
    <>
      <AddProduct onProductAdded={handleProductAdded} /> 
      <ViewProducts key={refreshView ? 'refreshed' : 'not-refreshed'} />
    </>
  )
}

export default Home;
