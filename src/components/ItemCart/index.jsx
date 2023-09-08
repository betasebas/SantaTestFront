import React, { useContext, useState } from "react";
import CartContext from "../../context/CartContext";
import styles from "./styles.module.scss";

export const ItemCart = ({ item }) => {
  /* Traemos del context las funciones para agregar y sacar productos del carrito */
  const [quantity, setQuantity] = useState(0);
  const { removeItemToCart, addItemToCart } = useContext(CartContext);

  function onChangeDataAmount(e){
    if(e.target.value){
      setQuantity(parseInt(e.target.value));
    }
  }

  function addItemLocal(product){
    if(quantity !== null && quantity >= 0){
      addItemToCart(product, quantity);
    }
  }

  return (
    <div className={styles.cartItem}>
      <img src={item.image} alt={item.code} />
      <div className={styles.dataContainer}>
        <div className={styles.left}>
          <p>{item.name}</p>
          <div className={styles.buttons}>
            <input type="number" field="Amount" id="amount" value={item.quantity} onChange={onChangeDataAmount}/>
            <button onClick={() => addItemLocal(item)}>
              Update
            </button>
            <button onClick={() => removeItemToCart(item)}>
              Delete
            </button>
          </div>
        </div>
        <div className={styles.right}>
          <div>{item.quantity}</div>
          <p>Total: ${item.quantity * item.value}</p>
        </div>
      </div>
    </div>
  );
};
