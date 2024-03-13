import React from "react";
import { AppContext } from "../../context/appContext.js";
import { useContext, useState, useEffect } from "react";
// import prodlist from "../product/products.json"
import "./Cart.css"
export default function Cart() {
  const { cartItems, setCartItems, products } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);

  useEffect(() => {
    setOrderValue((prev) =>
    products.reduce((total, value) => {
          return total + value.price * (cartItems[value.id] ?? 0);
      }, 0)
    );
  }, [cartItems]);

  
  const updateCart = (id, qty) => {
    setCartItems((prev) => ({ ...prev, [id]: qty }));
  };

  return (
    <div>
      {products.map((elem) => {
        if (cartItems[elem.id]) {
          return (
            <div key={elem.id} ClassName="Cart-items">
              {elem.name}-{elem.price}-
              <button className="Cart-button"
                onClick={() => updateCart(elem.id, cartItems[elem.id] - 1)}
              >
                -
              </button>
              {cartItems[elem.id]}
              <button  className="Cart-button"
                onClick={() => updateCart(elem.id, cartItems[elem.id] + 1)}
              >
                +
              </button>
            </div>
          );
        }
      })}
      <div>Order Value:{orderValue}</div>
    </div>
  );
}
