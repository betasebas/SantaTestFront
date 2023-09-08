import { createContext, useEffect, useState } from "react";
import axios from "axios";

const customerId = 'a755878a-4d27-11ee-9cca-b268bdcc0c33';
/* Creamos el context, se le puede pasar un valor inicial */
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  /* Creamos un estado para el carrito */
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    await axios
      .get("https://localhost:5001/api/v1/Products/GetProducts")
      .then(({ data }) => setProducts(data.data));
  };

  const getProductsCart = async () => {
    let headers = {
      "CustomerId" : customerId
    }
    return await axios
      .get("https://localhost:5001/api/v1/ShoppingCart/GetProductsShoppingCart", {headers})
      .then(({ data }) => setCartItems(data.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getProducts();
    getProductsCart();
  }, []);

  const addItemToCart = async (product, quantity) => {
    const data = {
      Id : product.id,
      Code : product.code,
      Quantity : quantity,
      CustomerId : customerId
    }

    await axios.post("https://localhost:5001/api/v1/shoppingCart/AddProduct", data);

    getProducts();
    getProductsCart();
  };

  const removeItemToCart = async (product) => {

    const data = {
      Id : product.id,
      Code : product.code,
      CustomerId : customerId
    }

    await axios.post("https://localhost:5001/api/v1/shoppingCart/DeleteProduct", data);

    getProducts();
    getProductsCart();
  };

  const generateOrder = async () => {
    let data = {
      IdCustomer: "a755878a-4d27-11ee-9cca-b268bdcc0c33"
  }
    await axios.post("https://localhost:5001/api/v1/order/AddOrder", data)
        .then(({ data }) => alert("Order created"))
        .catch((error) => alert("Error in order"));
    getProducts();
    getProductsCart();
  };

  return (
    <CartContext.Provider
      value={{ cartItems, products, addItemToCart, generateOrder, removeItemToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
