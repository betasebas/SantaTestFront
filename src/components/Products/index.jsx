import React, { useContext, useState } from "react";
import CartContext from "../../context/CartContext";
import styles from "./styles.module.scss";

const Products = () => {

  const [amount, setAmount] = useState(0);
  const { addItemToCart, products } = useContext(CartContext);

  function onChangeDataAmount(e){
    if(e.target.value){
      setAmount(parseInt(e.target.value));
    }
  }

  function addItemLocal(product){
    if(amount !== null && amount >= 0){
      addItemToCart(product, amount);
    }
  }
  return (
    <div className={styles.productsContainer}>
      {products &&
        products.map((product, i) => (
          <div key={i} className={styles.product}>
            <img src={product.image} alt={product.description} />
            <div>
              <p>
                {product.code} - ${product.value}
              </p>
            </div>
            <div>
              <p>
                {product.stock} in stock
              </p>
            </div>
              <div>
                  <input type="number" field="Amount" id="amount" onChange={onChangeDataAmount}/>
                  <button onClick={() => addItemLocal(product)}>
                    Add to Cart
                  </button>
              </div>
          </div>
        ))}
    </div>
  );
};

export default Products;
