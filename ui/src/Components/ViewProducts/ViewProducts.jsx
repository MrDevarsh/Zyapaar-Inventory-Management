import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewProducts.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../Redux/actions";

const ViewProducts = () =>
  // { refreshView }
  {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const newProduct = useSelector((state) => state.products);
    const dispatch = useDispatch();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:8082/getProducts");
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    };

    useEffect(() => {
      fetchData();
    }, [newProduct]);
    // [refreshView]);

    const handleDelete = async (id) => {
      try {
        await axios.delete("http://localhost:8082/delete?id=" + id);
        toast.success("Product deleted successfully");
        fetchData();
      } catch (error) {
        toast.error(error.message);
      }
    };

    // const handleEdit = async (id) => {
    //   try {
    //     await axios.put(
    //       "http://localhost:8082/updateStock",
    //       { productId, qty },
    //       {
    //         headers: { "Content-Type": "application/json" },
    //       }
    //     );
    //     toast.success("Product quantity updated successfully");
    //     setEditProductId(null);
    //     fetchData();
    //   } catch (error) {
    //     toast.error(error.message);
    //   }
    // };

    const handleEditClick = (productData) => {

      // console.log(newProduct);

      dispatch(updateProduct(productData));
    };


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
                <td>
                  <EditIcon
                    className="icon"
                    onClick={() => handleEditClick(product)}
                  />
                  <DeleteIcon
                    className="icon"
                    onClick={() => handleDelete(product.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default ViewProducts;
