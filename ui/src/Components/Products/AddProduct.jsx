import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddProduct.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct } from "../../Redux/actions";

const AddProduct = () =>
  // { onProductAdded }
  {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [qty, setQty] = useState(0);
    const [editProduct, setEditProduct] = useState(false);

    const dispatch = useDispatch();
    const editProductData = useSelector((state) => state.products);

    useEffect(() => {
      setEditProduct(!editProduct);
      console.log(editProductData);
      if (editProductData.length != 0) {
        setName(editProductData[0].name);
        setPrice(editProductData[0].price);
        setDescription(editProductData[0].description);
        setQty(editProductData[0].qty);
      }
    }, [editProductData]);

    // const handleEdit = async () => {
    //     try {
    //       await axios.put(
    //         "http://localhost:8082/updateStock",
    //         { editProductData },
    //         {
    //           headers: { "Content-Type": "application/json" },
    //         }
    //       );
    //       toast.success("Product quantity updated successfully");
    //       setEditProductId(null);
    //       fetchData();
    //     } catch (error) {
    //       toast.error(error.message);
    //     }
    //   };

    const handleEdit = async () => {
      const productData = {
        id: editProductData[0].id,
        name: name,
        price,
        description,
        qty,
      };

        clearForm();
        setEditProduct(!editProduct);

        dispatch(updateProduct({
          "id": '',
          "name": '',
          "price": '',
          "description": '',
          "qty": ''
        }));

      try {
        const response = await axios.put(
          "http://localhost:8082/update",
          productData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.status === 200) {
          
          dispatch(addProduct(productData));

          toast.success(response.data);
        } else {
          toast.error(response.data);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    const clearForm = () => {
      setName("");
      setPrice(0);
      setDescription("");
      setQty(0);
    }

    const handleCancel = () => {
      clearForm();
      setEditProduct(!editProduct);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();

      if (!name || !price || !description || !qty || !editProduct) {
        // toast.error("Please fill in all required fields.");
        return;
      }

      const productData = { name, price, description, qty };

      try {
        const response = await axios.post(
          "http://localhost:8082/product",
          productData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.status === 200) {
          clearForm();
          dispatch(addProduct(productData));
          // if (onProductAdded) {
          toast.success("Product Added Successfully!!!");
          //   onProductAdded();
          // }
        } else {
          toast.error(`Failed to add product: ${response.statusText}`);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    return (
      <div className="add-product-container">
        {editProduct ? <h2>Add Product</h2> : <h2>Edit Product</h2>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            {editProduct ? (
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <input
                type="text"
                id="name"
                value={name}
                disabled="true"
                // onChange={(e) => setName(e.target.value)}
              />
            )}
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
          {editProduct ? (
            <button type="submit">Add Product</button>
          ) : (
            <>
              <button onClick={handleEdit}>Edit Product</button>
              <button
                onClick={handleCancel}
                style={{
                  marginLeft: "3px",
                }}
              >
                Cancel
              </button>
            </>
          )}
        </form>
      </div>
    );
  };

export default AddProduct;
