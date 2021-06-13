import { useState } from "react";
import Cart from "./Cart";

function Main({
  cartItems,
  setCartItems,
  setProducts,
  totalPrice,
  setTotalPrice,
  products,
}) {
  console.log(cartItems);

  return (
    <main id="cart">
      <h2>Your Cart</h2>
      <div className="cart--item-list-container">
        <ul className="item-list cart--item-list">
          <li className="shopping-headline">
            {""}
            <span> Name </span>
            <span>Price</span>
            <span>Quantity</span>{" "}
          </li>
          {cartItems.map((item, index) => {
            return (
              <Cart
                key={index}
                cartItem={item}
                setCartItems={setCartItems}
                products={products}
                setProducts={setProducts}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
                cartItems={cartItems}
              />
            );
          })}
        </ul>
      </div>
      <div className="total-section">
        <div>
          <h3>Total</h3>
        </div>
        <div>
          <span className="total-number">£{totalPrice}</span>
        </div>
      </div>
    </main>
  );
}

export default Main;
